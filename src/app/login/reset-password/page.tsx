'use client';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Button from '@/components/UI_Elements/buttons/Button';
import { resetPassword } from '../actions';
import Link from 'next/link';
import Image from 'next/image';
import Temp_Logo from '../../../assets/Temp_Logo.png';

const passwordSchema = yup.object().shape({
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match- Try again!')
    .required(),
});

type Passwords = yup.InferType<typeof passwordSchema>;

export default function ResetPassword({
  searchParams,
}: {
  searchParams: {
    message: string;
    code: string;
    error: string;
    error_code: string;
  };
}) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Passwords>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(passwordSchema),
  });

  const onSubmit = async (data: Passwords) => {
    console.log('submit data', data);
    try {
      await resetPassword(searchParams.code, data.password);
    } catch (error) {
      console.log('Error submitting form:', error);
      setError('root', { message: 'Error Submitting Form - Please try Again' });
    }
  };

  if (
    searchParams.error === 'access_denied' &&
    searchParams.error_code === '403'
  ) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="border rounded-lg border-grey-300 p-10 w-full max-w-sm text-center">
          <header className="flex flex-col justify-between items-center mb-3">
            <Image src={Temp_Logo} alt="A2ZTMS Logo" priority />
            <h1 className="text-title-md dark:text-black mt-6">
              Email Link Has Expired
            </h1>
            <p className="body2 dark:text-black mt-4">Please Try Again</p>
          </header>

          <Link
            className="text-primary hover:text-primary-dark justify-center font-public font-bold w-auto h-auto disabled:text-grey-500 disabled:pointer-events-none text-button-lg my-2 "
            href={'/'}
          >
            Back to A2ZTMS
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border rounded-lg border-grey-300 p-10 w-full max-w-sm">
        <header className="flex flex-col justify-between items-center mb-3">
          <Image src={Temp_Logo} alt="A2ZTMS Logo" priority />
          <h1 className="text-title-md dark:text-black mt-6">
            Reset Your Password
          </h1>
        </header>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        >
          <div className="relative my-3">
            <input
              {...register('password')}
              type="password"
              name="password"
              id="password"
              className="block px-2.5 pb-2.5 pt-4 w-full body2 dark:text-black bg-transparent rounded-lg border border-grey-400 appearance-none  focus:outline-none focus:ring-0 focus:border-primary peer"
              placeholder=""
              autoComplete="false"
              required
            />
            <label
              htmlFor="password"
              className="absolute body2 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:text-black px-2 peer-focus:px-2 peer-focus:text-primary  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              New Password*
            </label>
          </div>

          <div className="relative mb-3">
            <input
              {...register('confirmPassword')}
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="block px-2.5 pb-2.5 pt-4 w-full body2 dark:text-black bg-transparent rounded-lg border border-grey-400 appearance-none  focus:outline-none focus:ring-0 focus:border-primary peer"
              placeholder=""
              autoComplete="false"
              required
            />
            <label
              htmlFor="password"
              className="absolute body2 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:text-black px-2 peer-focus:px-2 peer-focus:text-primary  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Confirm New Password*
            </label>
            {errors.confirmPassword && (
              <p className="font-public font-normal text-text-sm text-danger text-center mt-4">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button type="submit">
            {isSubmitting ? 'Submitting' : 'Submit'}
          </Button>

          <Link
            className="text-primary hover:text-primary-dark justify-center font-public font-bold w-auto h-auto disabled:text-grey-500 disabled:pointer-events-none text-button-lg my-2 text-center"
            href={'/'}
          >
            Back to A2ZTMS
          </Link>
          {errors.root && (
            <p className="font-public font-normal text-text-sm text-danger text-center mt-2">
              {errors.root.message}
            </p>
          )}
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
