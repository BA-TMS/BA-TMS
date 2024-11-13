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
      <div className="min-h-screen bg-grey-100 flex flex-col items-center justify-center h-screen">
        <div className="flex flex-col bg-white border rounded-lg border-grey-300 px-4.5 pt-10 w-4/6 h-5/6">
          <header className="flex flex-col justify-between items-center mb-3">
            {Logo}
            <h2 className="text-title-md mt-6">Sign Up</h2>
          </header>
          <div className="overflow-y-auto flex-grow">{children}</div>
        </div>
        <div className="mt-5 relative block mx-auto">
          <p className="inline-block body2 mr-3">Already have an account?</p>
          <Link
            className="text-primary hover:text-primary-dark justify-center font-public font-bold w-auto h-auto disabled:text-grey-500 disabled:pointer-events-none text-button-lg my-2"
            href={'/login'}
          >
            Log In
          </Link>
        </div>
      </div>
    </ContextProvider>
  );
}
