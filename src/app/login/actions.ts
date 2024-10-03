/* eslint-disable quotes */
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@util/supabase/server';
import { headers } from 'next/headers';
// import { SupabaseAuthClient } from '@supabase/supabase-js/dist/module/lib/SupabaseAuthClient';
import { SupabaseClient } from '@supabase/supabase-js';

export async function login(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  console.log('login error', error?.message);

  if (error?.message === 'Email not confirmed') {
    return redirect(
      '/login/confirm?message=Could not authenticate user, please confirm your email.'
    );
  } else if (error === null) {
    redirect('/dispatch');
  } else {
    redirect('/login?message=Invalid Login Credentials');
  }
}

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

export const resendConfirmEmail = async (formData: FormData) => {
  'use server';

  const origin = headers().get('origin');
  const email = formData.get('email') as string;
  const supabase = createClient();

  const { error } = await supabase.auth.resend({
    type: 'signup',
    email: email,
    options: {
      emailRedirectTo: `${origin}/`,
    },
  });
  if (error) {
    return redirect('/login/confirm?message=Could not resend email');
  }

  revalidatePath('/', 'layout');

  return redirect('/login/confirm?message=Email sent'); // stay on confirm page and display message
};

export const signOut = async () => {
  'use server';

  const supabase = createClient();
  await supabase.auth.signOut();
  revalidatePath('/login', 'layout');
  return redirect('/login');
};

export async function forgotPassword(formData: FormData) {
  const origin = headers().get('origin');
  const email = formData.get('email') as string;
  const supabase = createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/login/reset-password`,
  });

  if (error) {
    redirect('/login?message=Could Not Reset Password');
  }

  return redirect(
    '/login?message=Check email to reset password. Do not change browsers.'
  );
}

export const resetPassword = async (code: string, password: string) => {
  'use server';

  const supabase = createClient();

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      // should handle errors better for user experience

      console.log('link expired error', error);
      return;
    }
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    // once again should handle errors better for user experience
    console.log('unable to reset password error', error);
    return;
  }
  redirect('/');
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
