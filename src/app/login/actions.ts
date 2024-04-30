'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '../../../util/supabase/server';
import { headers } from 'next/headers';

export async function login(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect('/login?message=Invalid Login Credentials');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

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
      emailRedirectTo: `${origin}/`,
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

  // could make a whole /confirm page for this if we want
  return redirect('/login?message=Check email to reset password');
}
