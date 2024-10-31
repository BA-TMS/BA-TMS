/* eslint-disable quotes */
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@util/supabase/server';
import { headers } from 'next/headers';
import { SupabaseClient } from '@supabase/supabase-js';

// users should be added to supabase auth table
// should also add a new organization to organization table
// new user entry in user table
// new entry in permissions table

interface NewUser {
  firstName: string;
  lastName: string;
  email: string;
  tel: string;
  password: string;
}

export const signUp = async (data: NewUser) => {
  'use server';

  console.log('form data', data);

  const newData = {
    email: data.email,
    password: data.password,
  };

  const origin = headers().get('origin');
  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    email: newData.email,
    password: newData.password,
    options: {
      emailRedirectTo: `${origin}/login`,
      data: {
        // sends this info to auth users table raw_user_metadata
        first_name: data.firstName,
        last_name: data.lastName,
        phone_number: data.tel,
      },
    },
  });

  if (error) {
    console.log(error);
    return redirect('/login/confirm?message=Could not authenticate user');
  }

  revalidatePath('/', 'layout');

  // Attach callback to access custom info.
  addListener(supabase);
  return redirect('/login/confirm');
};

const addListener = (client: SupabaseClient) => {
  client.auth.onAuthStateChange((event) => {
    if (event === 'INITIAL_SESSION') {
      console.log("Ayy, I'm initial-sessionin' heah!");
    }
    // We do not, at present, appear to emit ANY of these events. Should we?
    else if (event === 'SIGNED_IN') {
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
