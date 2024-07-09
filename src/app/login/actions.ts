'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/util/supabase/server';
import { headers } from 'next/headers';
import { SupabaseAuthClient } from '@supabase/supabase-js/dist/module/lib/SupabaseAuthClient';
import { SupabaseClient } from '@supabase/supabase-js';

export const signIn = async (formData: FormData) => {
  'use server';

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect('/login?message=Could not authenticate user');
    // could make a separate error page if we wanted
  }
  // purge cached data for specific path - what does this do?
  revalidatePath('/', 'layout');
  // Attach callback to access custom info.
  addListener(supabase);
  return redirect('/protected'); // update this to homepage we want user to see
};

export const signUp = async (formData: FormData) => {
  'use server';

  const origin = headers().get('origin');
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return redirect('/login?message=Could not authenticate user');
  }

  revalidatePath('/', 'layout');
  // could make notification page if we wanted
  // will eventually need a way to send email again
  return redirect('/login?message=Check email to continue sign in process');
};

const addListener = (client: SupabaseClient)  => {
  client.auth.onAuthStateChange((event, session) => {
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