// import { headers } from 'next/headers';
// import { createClient } from '@/util/supabase/server';
// import { redirect } from 'next/navigation';
// import { revalidatePath } from 'next/cache';
import { login, signUp } from './actions';
import { SubmitButton } from '@/components/Authentication/submit-button';
import Image from 'next/image';
import Temp_Logo from '../../assets/Temp_Logo.png';

// To Do:
// check to see if user is logged in
// provide option to log out

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <div className="flex flex-col justify-center items-center mx-auto">
      <div className="border rounded-2xl border-stroke p-10 dark:border-strokedark mt-16 w-100">
        <header className="flex flex-col justify-between items-center h-36 mb-6">
          <Image src={Temp_Logo} alt="A2ZTMS Logo" priority />
          <h1 className="text-2xl"> Welcome </h1>
          <p className="text-xs">Log in to A2ZTMS to continue</p>
        </header>
        <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
          <div className="relative">
            <label
              className="absolute left-0 ml-2 -top-3.5 bg-white px-1 text-md text-gray-500"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-6 w-full"
              name="email"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="relative">
            <label
              className="absolute left-0 ml-2 -top-3.5 bg-white px-1 text-md text-gray-500"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-6 w-full"
              type="password"
              name="password"
              placeholder="••••••••"
              required
            />
          </div>

          <SubmitButton formAction={login} pendingText="Signing In...">
            Sign In
          </SubmitButton>
          <SubmitButton formAction={signUp} pendingText="Signing Up...">
            Sign Up
          </SubmitButton>
          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
