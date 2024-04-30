import Link from 'next/link';
import { createClient } from '@util/supabase/server';
import { redirect } from 'next/navigation';
import { SubmitButton } from '@/components/Authentication/submit-button';
import Image from 'next/image';
import Temp_Logo from '../../../assets/Temp_Logo.png';

export default async function ResetPassword({
  searchParams,
}: {
  searchParams: { message: string; code: string };
}) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    return redirect('/');
  }

  const resetPassword = async (formData: FormData) => {
    'use server';

    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (password !== confirmPassword) {
      return redirect(
        '/login/reset-password?message=Passwords do not match. Try again!'
      );
    }

    const supabase = createClient();

    if (searchParams.code) {
      const supabase = createClient();
      const { error } = await supabase.auth.exchangeCodeForSession(
        searchParams.code
      );

      if (error) {
        return redirect(
          '/login?message=Unable to reset Password. Link expired!'
        );
      }
    }

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      return redirect(
        '/login/reset-password?message=Unable to reset Password. Try again!'
      );
    }
    redirect('/');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border rounded-lg border-grey-300 p-10 w-full max-w-sm">
        <header className="flex flex-col justify-between items-center mb-3">
          <Image src={Temp_Logo} alt="A2ZTMS Logo" priority />
          <h1 className="text-title-md dark:text-black mt-6">
            Reset Your Password
          </h1>
        </header>
        <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
          <div className="relative my-3">
            <input
              type="password"
              name="password"
              id="password"
              className="block px-2.5 pb-2.5 pt-4 w-full body2 dark:text-black bg-transparent rounded-lg border border-grey-400 appearance-none  focus:outline-none focus:ring-0 focus:border-primary peer"
              placeholder=""
              autoComplete="false"
              required
            />
            <label
              htmlFor="password"
              className="absolute body2 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:text-black px-2 peer-focus:px-2 peer-focus:text-primary  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              New Password*
            </label>
          </div>

          <div className="relative mb-3">
            <input
              type="password"
              name="confirmPassword"
              id="password"
              className="block px-2.5 pb-2.5 pt-4 w-full body2 dark:text-black bg-transparent rounded-lg border border-grey-400 appearance-none  focus:outline-none focus:ring-0 focus:border-primary peer"
              placeholder=""
              autoComplete="false"
              required
            />
            <label
              htmlFor="password"
              className="absolute body2 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:text-black px-2 peer-focus:px-2 peer-focus:text-primary  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Confirm New Password*
            </label>
          </div>

          <SubmitButton formAction={resetPassword} pendingText="...">
            Reset Password
          </SubmitButton>

          <Link
            className="text-primary hover:text-primary-dark justify-center font-public font-bold w-auto h-auto disabled:text-grey-500 disabled:pointer-events-none text-button-lg my-2 text-center"
            href={'/'}
          >
            Back to A2ZTMS
          </Link>

          {searchParams?.message && (
            <p className="body2 dark:text-black text-center mt-2">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
