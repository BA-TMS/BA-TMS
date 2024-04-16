'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/util/supabase/server';
import { headers } from 'next/headers';

export async function login(formData: FormData) {
  const supabase = createClient();

  // should validate inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect('/error');
  }

  // redirect to '/' upon successful login
  revalidatePath('/', 'layout');
  redirect('/');
}

export const signUp = async (formData: FormData) => {
  'use server';

  // will want to validate inputs

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
