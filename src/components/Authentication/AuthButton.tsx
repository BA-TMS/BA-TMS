import { createClient } from '../../../util/supabase/server';
import Link from 'next/link';
import { signOut } from '@/app/login/actions';

// button for login/ logout

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <form action={signOut} className="w-full">
      <button className="justify-center rounded-lg font-public font-bold w-full text-center h-auto disabled:text-grey-500 disabled:pointer-events-none bg-primary text-white hover:shadow-hover-primary hover:bg-primary-dark px-5.5 py-2.75 text-button-lg">
        Logout
      </button>
    </form>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
  );
}
