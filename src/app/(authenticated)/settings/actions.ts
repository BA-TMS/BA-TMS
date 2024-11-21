'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { createSupbaseAdmin } from '@util/supabase/server';

// actions for interacting with supabase and prisma

interface SignUpData {
  'First Name': string;
  'Last Name': string;
  Telephone?: string;
  Email: string;
  Role: string;
}

// this function handles creating entries in our public prisma tables
// need to add a user and related permissions
// organization must be whichever organization is linked to the account

// this function handles supabase auth signup and creates entry in auth.users
export async function signUpUser(data: SignUpData) {
  const origin = headers().get('origin');
  // connect to supabase auth client
  const supabase = await createSupbaseAdmin();

  // create user in supabase auth table with metadata + send email invite
  // connect to supabase auth client
  const { error } = await supabase.auth.admin.inviteUserByEmail(data['Email'], {
    redirectTo: `${origin}/signup/welcome`,
    data: {
      // sends this info to auth users table raw_user_metadata
      first_name: data['First Name'],
      last_name: data['Last Name'],
      phone_number: data['Telephone'],
      role: data['Role'],
    },
  });

  // if there is an error, return message
  if (error) {
    throw `${error.message}`;
  }

  // where to redirect after this is successful
  return redirect('/settings/team');
}
