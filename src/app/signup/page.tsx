'use client';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Button from '@/components/UI_Elements/buttons/Button';
import Image from 'next/image';
import Temp_Logo from '../../assets/Temp_Logo.png';
// import { signUp } from '@/app/login/actions';

const newUserSchema = yup.object().shape({
  name: yup.string().required('Name is required.'),
  email: yup.string().required('Email is required.'),
  tel: yup.string().required('Phone Number is required.'),
  password: yup.string().required('Password is required.'),
});

type NewUser = yup.InferType<typeof newUserSchema>;

export default function Signup({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<NewUser>({
    defaultValues: {
      name: '',
      email: '',
      tel: '',
      password: '',
    },
    resolver: yupResolver(newUserSchema),
  });

  const onSubmit = async (data: NewUser) => {
    try {
      console.log(data);
      //   await resetPassword(searchParams.code, data.password);
    } catch (error) {
      console.log('Error submitting form:', error);
      setError('root', { message: 'Error Submitting Form - Please try Again' });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border rounded-lg border-grey-300 p-10 w-full max-w-sm">
        <header className="flex flex-col justify-between items-center mb-3">
          <Image src={Temp_Logo} alt="A2ZTMS Logo" priority />
          <h1 className="text-title-md dark:text-black mt-6"> Welcome </h1>
          <p className="body2 dark:text-black mt-4">
            Sign up to continue to A2ZTMS.
          </p>
        </header>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        >
          <div className="relative mt-3">
            <input
              {...register('name')}
              type="text"
              name="name"
              id="name"
              className="block px-2.5 pb-2.5 pt-4 w-full body2 dark:text-black bg-transparent rounded-lg border border-grey-400 appearance-none  focus:outline-none focus:ring-0 focus:border-primary peer"
              placeholder=""
              autoComplete="name"
              required
            />

            <label
              htmlFor="name"
              className="absolute body2 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:text-black px-2 peer-focus:px-2 peer-focus:text-primary  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Name*
            </label>
          </div>
          {errors.name && (
            <p className="font-public font-normal text-text-sm text-danger text-center">
              {errors.name.message}
            </p>
          )}

          <div className="relative mt-3">
            <input
              {...register('email')}
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
          {errors.email && (
            <p className="font-public font-normal text-text-sm text-danger text-center">
              {errors.email.message}
            </p>
          )}

          <div className="relative mt-3">
            <input
              {...register('tel')}
              type="text"
              name="tel"
              id="tel"
              className="block px-2.5 pb-2.5 pt-4 w-full body2 dark:text-black bg-transparent rounded-lg border border-grey-400 appearance-none  focus:outline-none focus:ring-0 focus:border-primary peer"
              placeholder=""
              autoComplete="tel"
              required
            />
            <label
              htmlFor="tel"
              className="absolute body2 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:text-black px-2 peer-focus:px-2 peer-focus:text-primary  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Phone Number*
            </label>
          </div>
          {errors.tel && (
            <p className="font-public font-normal text-text-sm text-danger text-center">
              {errors.tel.message}
            </p>
          )}

          <div className="relative mt-3">
            <input
              {...register('password')}
              type="password"
              name="password"
              id="password"
              className="block px-2.5 pb-2.5 pt-4 w-full body2 dark:text-black bg-transparent rounded-lg border border-grey-400 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
              placeholder=""
              autoComplete="new-password"
              required
            />
            <label
              htmlFor="password"
              className="absolute body2 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:text-black px-2 peer-focus:px-2 peer-focus:text-primary  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Password*
            </label>
          </div>
          {errors.password && (
            <p className="font-public font-normal text-text-sm text-danger text-center">
              {errors.password.message}
            </p>
          )}

          <Button type="submit">
            {isSubmitting ? 'Submitting' : 'Sign Up'}
          </Button>

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

          {errors.root && (
            <p className="font-public font-normal text-text-sm text-danger text-center mt-2">
              {errors.root.message}
            </p>
          )}

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
