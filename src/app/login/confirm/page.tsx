'use client';
import Link from 'next/link';
import { useState } from 'react';
import { resendConfirmEmail } from '../actions';
import { SubmitButton } from '@/components/Authentication/submit-button';
import Button from '@/components/UI_Elements/buttons/Button';

export default function Confirm({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const [showForm, setShowForm] = useState<boolean>(false);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border rounded-lg border-grey-300 p-10 w-full max-w-sm text-center">
        <header className="flex flex-col justify-between items-center mb-3">
          <h1 className="text-title-md dark:text-black mt-6 mb-3 text-center">
            {' '}
            Check your email to continue signup.{' '}
          </h1>

          {!showForm && (
            <Button variant="text" onClick={() => setShowForm(true)}>
              Didn&apos;t recieve email?
            </Button>
          )}
        </header>
        {showForm && (
          <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground mb-3">
            <div className="relative mt-3">
              <input
                type="text"
                name="email"
                id="email"
                className="block px-2.5 pb-2.5 pt-4 w-full body2 dark:text-black bg-transparent rounded-lg border border-grey-400 appearance-none  focus:outline-none focus:ring-0 focus:border-primary peer"
                placeholder=""
                autoComplete="email"
                required
              />
              <label
                htmlFor="email"
                className="absolute body2 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:text-black px-2 peer-focus:px-2 peer-focus:text-primary  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
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
          className="text-primary hover:text-primary-dark justify-center font-public font-bold w-auto h-auto disabled:text-grey-500 disabled:pointer-events-none text-button-lg mb-3 text-center"
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
    </div>
  );
}
