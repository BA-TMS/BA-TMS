import { Logo } from '@/assets/logo';
import Link from 'next/link';

// TODO: change width and height to fit on screen

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border rounded-lg border-grey-300 p-10 w-full max-w-md">
        <header className="flex flex-col justify-between items-center mb-3">
          {Logo}
          <h1 className="text-title-md dark:text-black mt-6">
            Sign up to continue
          </h1>
        </header>
        {children}
        <div>
          <p className="inline-block body2 dark:text-black mt-3 mr-3">
            Already have an account?
          </p>
          <Link
            className="text-primary hover:text-primary-dark justify-center font-public font-bold w-auto h-auto disabled:text-grey-500 disabled:pointer-events-none text-button-lg my-2"
            href={'/login'}
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
