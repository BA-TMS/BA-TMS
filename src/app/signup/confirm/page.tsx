'use client';
import Link from 'next/link';
import { useState } from 'react';
import { resendConfirmEmail } from '../actions';
import { SubmitButton } from '@/components/UI_Elements/Buttons/Authentication/SubmitButton';
import Button from '@/components/UI_Elements/Buttons/Button';

export default function Confirm({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const [showForm, setShowForm] = useState<boolean>(false);

  return (
    <div className="flex flex-col justify-center items-center ">
      <header className="flex flex-col justify-between items-center mb-3">
        <p className="mt-3.5 mb-5 body2 text-grey-800 text-center">
          Check your email to continue sign up.
        </p>

        {!showForm && (
          <Button variant="text" onClick={() => setShowForm(true)}>
            Didn&apos;t recieve email?
          </Button>
        )}
      </header>

      {showForm && (
        <form className="animate-in flex-1 flex flex-col w-1/3 justify-center gap-2 text-foreground mb-3">
          <div className="relative mt-3">
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
          <SubmitButton formAction={resendConfirmEmail} pendingText="...">
            Resend
          </SubmitButton>
        </form>
      )}

      <Link
        className="text-primary hover:text-primary-dark font-public font-bold w-auto h-auto disabled:text-grey-500 disabled:pointer-events-none text-button-lg mb-3 text-center"
        href={'/'}
      >
        Back to TMS
      </Link>

      {searchParams?.message && (
        <p className="font-public font-normal text-text-sm text-danger text-center mt-2">
          {searchParams.message}
        </p>
      )}
    </div>
  );
}
