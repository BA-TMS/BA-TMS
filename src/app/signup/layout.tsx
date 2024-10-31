'use client';

import { Logo } from '@/assets/logo';
import Link from 'next/link';
import { ContextProvider } from '@/Context/modalContext';

// TODO: change width and height to fit on screen

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ContextProvider>
      <div className="min-h-screen bg-grey-100 flex items-center justify-center h-screen">
        <div className=" bg-white border rounded-lg border-grey-300 p-10 mx-auto w-full max-w-280 h-5/6">
          <header className="flex flex-col justify-between items-center mb-3">
            {Logo}
            <h2 className="text-title-md mt-6">Sign Up</h2>
          </header>
          {children}
          <div className="relative block -mt-12 w-56 mx-auto">
            <p className="inline-block body2 mr-3">Already have an account?</p>
            <Link
              className="text-primary hover:text-primary-dark justify-center font-public font-bold w-auto h-auto disabled:text-grey-500 disabled:pointer-events-none text-button-lg my-2"
              href={'/login'}
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </ContextProvider>
  );
}
