import { createSupabaseServerClient } from '@util/supabase/server';
import Link from 'next/link';
import { login } from './actions';

import { Logo } from '@/assets/logo';
import AuthButton from '@/components/UI_Elements/buttons/Authentication/AuthButton';
import { SubmitButton } from '@/components/UI_Elements/buttons/Authentication/SubmitButton';

export default async function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="border rounded-lg border-grey-300 p-10 w-full max-w-sm">
          <header className="flex flex-col justify-around items-center mb-3">
            {Logo}
            <p className="body2 dark:text-black my-6">Not {user.email}?</p>
            <AuthButton></AuthButton>
          </header>
        </div>
        {searchParams?.message && (
          <p className="font-public font-normal text-text-sm text-danger text-center mt-2">
            {searchParams.message}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border rounded-lg border-grey-300 p-10 w-full max-w-sm">
        <header className="flex flex-col justify-between items-center mb-3">
          {Logo}

          <h1 className="text-title-md dark:text-black mt-6"> Welcome </h1>
          <p className="body2 dark:text-black mt-4">Log in to continue.</p>
        </header>
        <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
          <div className="relative">
            <input
              type="text"
              name="email"
              id="email"
              className="block px-2.5 pb-2.5 pt-4 w-full body2 dark:text-black bg-transparent rounded-lg border border-grey-400 appearance-none  focus:outline-hidden focus:ring-0 focus:border-primary peer"
              placeholder=""
              autoComplete="email"
              required
            />
            <label
              htmlFor="email"
              className="absolute body2 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:text-black px-2 peer-focus:px-2 peer-focus:text-primary  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:rtl:translate-x-1/4 peer-focus:rtl:left-auto start-1"
            >
              Email*
            </label>
          </div>

          <div className="relative">
            <input
              type="password"
              name="password"
              id="password"
              className="block px-2.5 pb-2.5 pt-4 w-full body2 dark:text-black bg-transparent rounded-lg border border-grey-400 appearance-none focus:outline-hidden focus:ring-0 focus:border-primary peer"
              placeholder=""
              autoComplete="current-password"
              required
            />
            <label
              htmlFor="password"
              className="absolute body2 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:text-black px-2 peer-focus:px-2 peer-focus:text-primary  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:rtl:translate-x-1/4 peer-focus:rtl:left-auto start-1"
            >
              Password*
            </label>
          </div>

          <Link
            className="text-primary hover:text-primary-dark justify-center font-public font-bold w-auto h-auto disabled:text-grey-500 disabled:pointer-events-none text-button-lg my-2"
            href={'/login/forgot-password'}
          >
            Forgot Password?
          </Link>

          <SubmitButton formAction={login} pendingText="Logging In...">
            Log In
          </SubmitButton>
          <div>
            <p className="inline-block body2 dark:text-black mt-3 mr-3">
              Don&apos;t have an account?
            </p>
            <Link
              className="text-primary hover:text-primary-dark justify-center font-public font-bold w-auto h-auto disabled:text-grey-500 disabled:pointer-events-none text-button-lg my-2"
              href={'/signup/company'}
            >
              Sign Up
            </Link>
          </div>
          {searchParams?.message && (
            <p className="font-public font-normal text-text-sm text-danger text-center mt-2">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
