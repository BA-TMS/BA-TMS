'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  createSupbaseAdmin,
  createSupabaseServerClient,
} from '@util/supabase/server';
import { PrismaClient, Status, UserRole } from '@prisma/client';

// actions for interacting with supabase and prisma

interface UserData {
  'First Name': string;
  'Last Name': string;
  Telephone?: string | null;
  Email: string;
  Role: string;
  Status?: string;
}

const prisma = new PrismaClient();

// gets users belonging to specific organization
// ordered by status and last name
export async function getTeam(org: string) {
  const users = prisma.user.findMany({
    where: {
      organization: {
        orgName: org,
      },
    },
    include: {
      organization: {
        select: {
          orgName: true,
          id: true,
        },
      },
      Permissions: {
        select: {
          role: true,
          status: true,
        },
      },
    },
    orderBy: [
      {
        Permissions: {
          status: 'asc',
        },
      },
      {
        lastName: 'asc',
      },
    ],
  });
  return users;
}

async function getOrgId(name: string) {
  const org = await prisma.organization.findUnique({
    where: {
      orgName: name,
    },
  });

  if (org === null) {
    throw 'Can not find organization ID';
  }

  return org.id;
}

// this function handles creating entries in our public prisma tables
// organization must be whichever organization is linked to the account
async function addUser(data: UserData, id: string, orgName: string) {
  // get org id to assign to user
  // if this errors, function does not continue
  const orgId = await getOrgId(orgName);

  // insert data into our public.users
  try {
    const response = await prisma.user.create({
      data: {
        id: id, // same id in auth and public
        email: data['Email'],
        firstName: data['First Name'],
        lastName: data['Last Name'],
        telephone: data['Telephone'] as string,
        orgId: orgId, // handles relation for user to organization

        Permissions: {
          // create entry in Permissions table
          create: {
            role: data['Role'] as UserRole,
            status: 'ACTIVE',
          },
        },
      },
    });
    return response;
  } catch (error) {
    throw `${error}`;
  }
}

// this function handles supabase auth signup and creates entry in auth.users
export async function signUpUser(formData: UserData, company: string) {
  const origin = headers().get('origin');

  // connect to supabase auth client
  const supabase = await createSupbaseAdmin();

  // create user in supabase auth table with metadata + send email invite
  // connect to supabase auth client
  const { data, error } = await supabase.auth.admin.inviteUserByEmail(
    formData['Email'],
    {
      redirectTo: `${origin}/signup/welcome`,
      data: {
        // sends this info to auth users table raw_user_metadata
        first_name: formData['First Name'],
        last_name: formData['Last Name'],
        phone_number: formData['Telephone'],
        role: formData['Role'],
        org_name: company,
      },
    }
  );

  // if there is an error, return message
  if (error) {
    throw `${error.message}`;
  }

  const userId = data.user.id; // so we can use same id in public and auth user tables

  // create the entries in public table
  await addUser(formData, userId, company);

  // where to redirect after this is successful
  return redirect('/settings/team');
}

// update user in auth.users
async function updateAuthData(data: UserData, id: string) {
  const supabase = await createSupbaseAdmin();

  const { error } = await supabase.auth.admin.updateUserById(id, {
    user_metadata: {
      first_name: data['First Name'],
      last_name: data['Last Name'],
      phone_number: data['Telephone'],
      role: data['Role'],
    },
    email: data['Email'],
  });

  if (error) {
    throw `${error.message}`;
  }
}

// updating a user in public tables
export async function updateUser(data: UserData, id: string) {
  try {
    const response = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        email: data['Email'],
        firstName: data['First Name'],
        lastName: data['Last Name'],
        telephone: data['Telephone'] as string,

        Permissions: {
          // update Permissions table
          update: {
            where: {
              userId: id, // handle the relation
            },
            data: {
              role: data['Role'] as UserRole,
              status: data['Status'] as Status,
            },
          },
        },
      },
    });

    // call function to update auth.users
    await updateAuthData(data, id);

    return response;
  } catch (error) {
    throw `${error}`;
  }
}

export const resendInvite = async (email: string) => {
  const origin = headers().get('origin');

  const supabase = await createSupbaseAdmin();

  const { error } = await supabase.auth.resend({
    type: 'signup',
    email: email,
    options: {
      emailRedirectTo: `${origin}/signup/welcome`,
    },
  });

  if (error) {
    throw `${error}`;
  }

  return;
};

// user updates their own password
export const updatePassword = async (password: string) => {
  const supabase = createSupabaseServerClient();

  // refresh the session using token- do we need token?
  await supabase.auth.refreshSession();

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  // handle error- return string
  if (error) {
    return error.message;
  }

  // return
  return;
};
