'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  createSupabaseServerClient,
  createSupbaseAdmin,
} from '@util/supabase/server';

// actions for interacting with supabase and prisma

interface SignUpData {
  'First Name': string;
  'Last Name': string;
  Email: string;
  Role: string;
}

// get a user's info
export async function getAuthUser() {
  'use server';

  const supabase = createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

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
      //   phone_number: data['Personal Telephone'],
      role: data['Role'], // sign up as an owner
    },
  });

  // if there is an error, return message
  if (error) {
    throw `${error.message}`;
  }

  // where to redirect after this is successful
  return redirect('/settings/team');
}
