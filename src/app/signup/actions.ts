/* eslint-disable quotes */
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prisma from '@util/prisma/client';
import { DocketNumber, Prisma } from '@prisma/client';
import { createSupabaseServerClient } from '@util/supabase/server';
import { headers } from 'next/headers';
import { SupabaseClient } from '@supabase/supabase-js';

interface SignUpData {
  'First Name': string;
  'Last Name': string;
  Email: string;
  Password: string;
  'Personal Telephone': string;

  'Company Name': string;
  Address: string;
  'Address Field 2'?: string;
  City: string;
  State: string;
  Zip: string;
  Country: string;
  Telephone: string;
  'Toll Free'?: string;
  Fax?: string;
  'Docket Number Type': string;
  'Docket Number': string;
  'DOT ID#'?: string;
}

// this function handles creating table entries in prisma
async function addOrganization(data: SignUpData, id: string) {
  try {
    // insert data into our own org table (prisma)
    const resp = await prisma.organization.create({
      data: {
        orgName: data['Company Name'],
        address: data['Address'],
        addressAddOn: data['Address Field 2'],
        city: data['City'],
        state: data['State'],
        postCountry: data['Country'],
        postCode: data['Zip'],
        telephone: data['Telephone'],
        tollFree: data['Toll Free'],
        fax: data['Fax'],
        docketNumType: data['Docket Number Type'] as DocketNumber,
        docketNumber: data['Docket Number'],

        users: {
          // create entry in User table
          create: [
            {
              id: id, // same id in auth and public
              email: data['Email'],
              firstName: data['First Name'],
              lastName: data['Last Name'],
              telephone: data['Personal Telephone'],

              Permissions: {
                // create entry in Permissions table
                create: {
                  role: 'OWNER',
                  status: 'ACTIVE',
                },
              },
            },
          ],
        },
      },
    });
    return resp;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const uniqueFields: Record<string, unknown> = {
        orgName: 'Company Name',
        docketNumber: 'Docket Number',
        dotId: 'DOT ID#',
      };
      // unique constraint violation
      if (error.code === 'P2002') {
        const target = error.meta?.target as string;
        throw `An account with this ${uniqueFields[target]} already exists - please try again`;
      }
    }
    // add other error codes as needed
    throw error; // misc errors
  }
}

// this function handles supabase auth signup and creates entry in auth.users
// it calls the above addOrganization function to also update our tables
export async function signUpAdmin(data: SignUpData) {
  const origin = headers().get('origin');

  // may want to not make auth.user if org already exists
  // we may need to modify this in the future
  const company = await prisma.organization.findUnique({
    where: {
      orgName: data['Company Name'],
    },
  });

  if (company !== null) {
    throw 'This company account already exists';
  }

  // connect to supabase auth client
  const supabase = createSupabaseServerClient();

  // create new user in supabase auth table
  // returns a fake object if the same email already exists
  // https://supabase.com/docs/reference/javascript/auth-signup
  const result = await supabase.auth.signUp({
    email: data['Email'],
    password: data['Password'],
    options: {
      emailRedirectTo: `${origin}/login`,
      data: {
        // sends this info to auth users table raw_user_metadata
        first_name: data['First Name'],
        last_name: data['Last Name'],
        phone_number: data['Personal Telephone'],
        role: 'OWNER', // sign up as an owner
        org_name: data['Company Name'], // organization so we can reference later
      },
    },
  });

  // if there is an error when creating new user, return message
  if (result.error?.name) {
    throw `${result.error.message}`;
  }

  // do not continue signup if user exists in our public table
  const user = await prisma.user.findUnique({
    where: {
      email: data['Email'],
    },
    select: {
      email: true,
    },
  });

  // if user is not null, throw an error
  // we may need to modify this in the future
  if (user !== null) {
    throw 'This user account already exists';
  }

  const authId = result.data.user?.id; // the id that auth table is using

  // create the organization/ user/ permissions
  // should throw error if issue
  await addOrganization(data, authId as string); // should be a string

  // // revlidate path (optionally if needed) - i forget what this does
  revalidatePath('/', 'layout');

  // This may come in handy later
  addListener(supabase);

  // // where to redirect after this is successful
  return redirect('/signup/confirm');
}

// events emitted by supabase
const addListener = (client: SupabaseClient) => {
  client.auth.onAuthStateChange((event) => {
    if (event === 'INITIAL_SESSION') {
      console.log("Ayy, I'm initial-sessionin' heah!");
    } else if (event === 'SIGNED_IN') {
      console.log("Ayy, I'm signin' in heah!");
    } else if (event === 'SIGNED_OUT') {
      console.log("Ayy, I'm signin' out heah!");
    } else if (event === 'PASSWORD_RECOVERY') {
      console.log("Ayy, I'm recoverin' my passwuhd heah!");
    } else if (event === 'TOKEN_REFRESHED') {
      console.log("More like tokin' my refreshment, amirite?");
    } else if (event === 'USER_UPDATED') {
      console.log("Ayy, I'm updatin' my usah heah!");
    }
  });
};

export const resendConfirmEmail = async (formData: FormData) => {
  'use server';

  const origin = headers().get('origin');
  const email = formData.get('email') as string;
  const supabase = createSupabaseServerClient();

  const { error } = await supabase.auth.resend({
    type: 'signup',
    email: email,
    options: {
      emailRedirectTo: `${origin}/`,
    },
  });
  if (error) {
    return redirect('/signup/confirm?message=Could not resend email');
  }

  revalidatePath('/', 'layout');

  return redirect('/signup/confirm?message=Email sent'); // stay on confirm page and display message
};

// new invited user sets password
export const setPassword = async (password: string, token: string) => {
  const supabase = createSupabaseServerClient();

  // refresh the session
  await supabase.auth.refreshSession({ refresh_token: token });

  if (password === '') {
    throw 'empty password';
  }

  const { error: userError } = await supabase.auth.updateUser({
    password: password,
  });

  if (userError) {
    console.log('Failed to get Supabase auth user', userError);
    throw `${userError}`;
  }

  // clear cached data
  revalidatePath('/', 'layout');
  revalidatePath('/(authenticated)/dispatch', 'page');

  // tells us we have an initial session
  addListener(supabase);

  return redirect('/dispatch');
};
