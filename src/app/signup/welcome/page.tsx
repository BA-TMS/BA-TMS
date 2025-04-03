'use client';

import { useState, useEffect } from 'react';
import * as yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(yup);
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import TextInput from '@/components/UI_Elements/Form/TextInput';
import Button from '@/components/UI_Elements/buttons/Button';
import { setPassword } from '../actions';

// Initialize password validation rules
yup.setLocale({
  string: {
    minLowercase: 'Password must contain at least 1 lowercase character.',
    minUppercase: 'Password must contain at least 1 uppercase character.',
    minNumbers: 'Password must contain at least 1 number.',
    minSymbols: 'Password must contain at least 1 special character.',
    min: 'Password must be at least 8 characters.',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any, // Using `as any` to avoid TypeScript errors per yup documentation
});

// Define password schema
const passwordSchema = yup.object().shape({
  Password: yup.string().password().required('Password is required.'),
  'Confirm Password': yup
    .string()
    .password()
    .required('Password confirmation is required.')
    .oneOf([yup.ref('Password')], 'Passwords must match.'),
});

type Password = yup.InferType<typeof passwordSchema>;

const WelcomeUser = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [urlParams, setUrlParams] = useState<URLSearchParams | null>(null);

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    setUrlParams(new URLSearchParams(hash));
  }, []);

  const refreshToken = urlParams?.get('refresh_token');

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Password>({
    defaultValues: {
      Password: '',
      'Confirm Password': '',
    },
    resolver: yupResolver(passwordSchema),
  });

  const onSubmit = async (data: Password) => {
    setIsSubmitting(true);

    // Handle missing refresh token
    if (!refreshToken) {
      const errorMessage =
        urlParams?.get('error_description') || 'Invalid request';
      setError('root', { message: errorMessage });
      setIsSubmitting(false);
      return;
    }

    try {
      await setPassword(data.Password, refreshToken);
    } catch (error) {
      setError('root', { message: `${error}` });
    }

    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col h-full justify-between"
    >
      <p className="mt-3.5 mb-5 text-center text-grey-800">
        Set your password to continue sign-up
      </p>

      <div className="flex flex-col items-center w-full">
        <div className="w-2/3">
          <TextInput
            control={control}
            name="Password"
            required
            type="password"
          />
          <TextInput
            control={control}
            name="Confirm Password"
            required
            type="password"
          />
        </div>
      </div>

      <div className="h-10 text-center">
        {errors.root && (
          <p className="text-sm text-error mb-2">{errors.root.message}</p>
        )}
      </div>

      <div className="py-4 gap-2 border-t border-grey-300 bg-white flex justify-end sticky bottom-0 z-10">
        <Button type="submit" disabled={isSubmitting}>
          Next
        </Button>
      </div>
    </form>
  );
};

// ✅ Default Export for Next.js Page Component
export default function Page() {
  return <WelcomeUser />;
}
