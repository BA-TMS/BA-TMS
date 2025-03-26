'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@util/supabase/server';
import { headers } from 'next/headers';

export async function login(formData: FormData) {
  const supabase = createSupabaseServerClient();

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

export const signOut = async () => {
  'use server';

  const supabase = createSupabaseServerClient();
  await supabase.auth.signOut();
  revalidatePath('/login', 'layout');
  return redirect('/login');
};

export async function forgotPassword(formData: FormData) {
  const origin = headers().get('origin');
  const email = formData.get('email') as string;
  const supabase = createSupabaseServerClient();

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

  const supabase = createSupabaseServerClient();

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
