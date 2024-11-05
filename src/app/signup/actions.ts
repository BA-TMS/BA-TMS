/* eslint-disable quotes */
'use server';

// import { revalidatePath } from 'next/cache';
// import { redirect } from 'next/navigation';
import { DocketNumber, PrismaClient } from '@prisma/client';
import { createSupabaseServerClient } from '@util/supabase/server';
import { headers } from 'next/headers';

const prisma = new PrismaClient();

// handle prisma relations
const ORG_RELATIONS = 


const USER_RELATIONS = {
  organization: { select: { orgName: true } },
  Permissions: true,
};

// what is the actual data shape coming in?
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

export async function addOrganization(data: SignUpData) {
  console.log('add org data,', data);
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
    },
  });
  return resp;
}

export async function signUpAdmin(data: SignUpData) {
  console.log('Create Admin data', data);

  const origin = headers().get('origin');

  // connect to supabase auth client
  const supabase = createSupabaseServerClient();

  // create new user in supabase auth table
  // this is working
  const result = await supabase.auth.signUp({
    email: data['Email'],
    password: data['Password'],
    options: {
      emailRedirectTo: `${origin}/login`, // where we redirect after?
      data: {
        // sends this info to auth users table raw_user_metadata
        first_name: data['First Name'],
        last_name: data['Last Name'],
        phone_number: data['Personal Telephone'],
        role: 'Admin', // sign up as an admin
      },
    },
  });

  // if there is an error when creating new user, return message
  if (result.error?.message) {
    return JSON.stringify(result);
  }

  // create the organization
  const org = await addOrganization(data);
  // TODO - Error handling

  // insert data into our own user table (prisma)
  // const user = await prisma.user.create({
  //   data: {
  //     email: data['Email'],
  //     password: data['Password'],
  //     firstName: data['First Name'],
  //     lastName: data['Last Name'],
  //     telephone: data['Personal Telephone'],
  //     organization: {
  //       connect: { id: '' }, // we are going to need the id of the organization that was just created
  //     },
  //     Permissions: {
  //       // create entry in Permissions tabe
  //       create: {
  //         role: 'ADMIN',
  //         status: 'ACTIVE',
  //       },
  //     },
  //   },
  //   include: USER_RELATIONS,
  // });

  // error handling
  // revlidate path (optionally if needed)
  // where do we do the email confirm?
}

// interface NewUser {
//   firstName: string;
//   lastName: string;
//   email: string;
//   tel: string;
//   password: string;
// }

// export const signUp = async (data: NewUser) => {
//   'use server';

//   console.log('form data', data);

//   const newData = {
//     email: data.email,
//     password: data.password,
//   };

//   const origin = headers().get('origin');
//   const supabase = createClient();

//   const { error } = await supabase.auth.signUp({
//     email: newData.email,
//     password: newData.password,
//     options: {
//       emailRedirectTo: `${origin}/login`,
//       data: {
//         // sends this info to auth users table raw_user_metadata
//         first_name: data.firstName,
//         last_name: data.lastName,
//         phone_number: data.tel,
//       },
//     },
//   });

//   if (error) {
//     console.log(error);
//     return redirect('/login/confirm?message=Could not authenticate user');
//   }

//   revalidatePath('/', 'layout');

//   // Attach callback to access custom info.
//   addListener(supabase);
//   return redirect('/login/confirm');
// };

// const addListener = (client: SupabaseClient) => {
//   client.auth.onAuthStateChange((event) => {
//     if (event === 'INITIAL_SESSION') {
//       console.log("Ayy, I'm initial-sessionin' heah!");
//     }
//     // We do not, at present, appear to emit ANY of these events. Should we?
//     else if (event === 'SIGNED_IN') {
//       console.log("Ayy, I'm signin' in heah!");
//     } else if (event === 'SIGNED_OUT') {
//       console.log("Ayy, I'm signin' out heah!");
//     } else if (event === 'PASSWORD_RECOVERY') {
//       console.log("Ayy, I'm recoverin' my passwuhd heah!");
//     } else if (event === 'TOKEN_REFRESHED') {
//       console.log("More like tokin' my refreshment, amirite?");
//     } else if (event === 'USER_UPDATED') {
//       console.log("Ayy, I'm updatin' my usah heah!");
//     }
//   });
// };
