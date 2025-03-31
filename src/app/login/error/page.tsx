import { createSupabaseServerClient } from '@util/supabase/server';
import AuthButton from '@ui/Buttons/Authentication/AuthButton';
import { Logo } from '@/assets/Logo';

// TODO- customize this, use for other login errors

export default async function LoginError({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(user);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border rounded-lg border-grey-300 p-10 w-full max-w-sm">
        <header className="flex flex-col justify-between items-center">
          {Logo}
          <p className="body2 dark:text-black mt-6">Hello, {user?.email}</p>
        </header>

        {searchParams?.message && (
          <p className="font-public font-normal text-text-sm text-error-dark text-center my-3">
            {searchParams.message + '- Cannot Log In'}
          </p>
        )}

        <AuthButton></AuthButton>
      </div>
    </div>
  );
}
