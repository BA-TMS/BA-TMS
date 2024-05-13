'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@util/supabase/server';
import { headers } from 'next/headers';

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
      '/login/confirm?message=Could not authenticate user, please confirm your email'
    );
  } else if (error === null) {
    redirect('/');
  } else {
    redirect('/login?message=Invalid Login Credentials');
  }
}

// this function currently does not handle Name and Phone Number fields
// those need to be stored in a different table
// export const signUp = async (formData: FormData) => {
export const signUp = async (email: string, password: string) => {
  'use server';

  const origin = headers().get('origin');
  // const email = formData.get('email') as string;
  // const password = formData.get('password') as string;
  const supabase = createClient();

  // this function will need to be changed when refining sign up new user process
  const { error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      emailRedirectTo: `${origin}/login/confirm`, // redirect to confirm page
    },
  });

  if (error) {
    console.log(error);
    return redirect('/login/confirm?message=Could not authenticate user');
  }

  revalidatePath('/', 'layout');

  return redirect('/login');
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
