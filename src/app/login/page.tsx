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
      <div className="border rounded-lg border-grey-300 p-10 mt-16 w-100 ">
        <header className="flex flex-col justify-between items-center mb-3">
          <Image src={Temp_Logo} alt="A2ZTMS Logo" priority />
          <h1 className="text-title-md dark:text-black mt-6"> Welcome </h1>
          <p className="body2 dark:text-black mt-4">
            Log in to A2ZTMS to continue
          </p>
        </header>
        <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
          <div className="relative mt-3">
            <input
              type="text"
              name="email"
              className="block px-2.5 pb-2.5 pt-4 w-full body2 bg-transparent rounded-lg border border-grey-400 appearance-none  focus:outline-none focus:ring-0 focus:border-primary peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="absolute body2 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:text-black px-2 peer-focus:px-2 peer-focus:text-primary  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Email*
            </label>
          </div>

          <div className="relative my-3">
            <input
              type="password"
              name="password"
              className="block px-2.5 pb-2.5 pt-4 w-full body2 bg-transparent rounded-lg border border-grey-400 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="password"
              className="absolute body2 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:text-black px-2 peer-focus:px-2 peer-focus:text-primary  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Password*
            </label>
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
