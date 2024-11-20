'use client';

import * as yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(yup);
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import TextInput from '@/components/UI_Elements/Form/TextInput';
import { SubmitButton } from '@/components/Authentication/submit-button';
import Button from '@/components/UI_Elements/buttons/Button';
import { setPassword, resendConfirmEmail } from '../actions';

// this is a welcome page for invited users to set their auth password

// error messages for yup-password validation- passwords need to match
yup.setLocale({
  string: {
    minLowercase: 'Password must contain at least 1 lower case character.',
    minUppercase: 'Password must contain at least 1 upper case character.',
    minNumbers: 'Password must contain at least 1 number.',
    minSymbols: 'Password must contain at least 1 special character.',
    min: 'Password must be at least 8 characters.',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any,
  // per docs- when using typescript, append `as any` to the end of this object to avoid type errors.
});

const passwordSchema = yup.object().shape({
  Password: yup.string().password().required('Password is required.'),
  'Confirm Password': yup
    .string()
    .password()
    .required('Password is required.')
    .oneOf([yup.ref('Password')], 'Passwords must match.'),
});

type Password = yup.InferType<typeof passwordSchema>;

export const WelcomeUser = () => {
  // do we need to log out any existing users?
  // how to handle the case in which someone else might be signed in

  const urlParams = new URLSearchParams(window.location.hash.substring(1));
  const refreshToken = urlParams.get('refresh_token');

  const {
    control,
    handleSubmit,
    // reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Password>({
    defaultValues: {
      Password: '',
      'Confirm Password': '',
    },
    resolver: yupResolver(passwordSchema),
  });

  const onSubmit = (data: Password) => {
    // set error if there is no refresh token
    if (refreshToken === null) {
      const errorMessage = urlParams.get('error_description');
      console.log(errorMessage);
      setError('root', { message: `${errorMessage}` });
      return;
    }

    try {
      setPassword(data['Password'], refreshToken);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col h-full justify-between"
    >
      <p className="mt-3.5 mb-5 body2 text-grey-800 text-center">
        Set your password to continue sign up
      </p>

      <div className="flex flex-col items-center w-full">
        <div className="w-2/3">
          <TextInput
            control={control}
            name="Password"
            required={true}
            type="password"
          />

          <TextInput
            control={control}
            name="Confirm Password"
            required={true}
            type="password"
          />
        </div>
      </div>

      <div className="h-10 text-center">
        {errors.root && (
          <p className="font-public font-normal text-text-sm text-error mb-2">
            {errors.root.message}
          </p>
        )}
        {errors.root?.message === 'Email link is invalid or has expired' && (
          <Button variant={'outline'} onClick={() => console.log('resend')}>
            Resend Email
          </Button>
        )}
      </div>

      <div className="py-4 gap-2 border-t border-grey-300 bg-white flex justify-end sticky bottom-0 z-10">
        <div className="flex justify-end gap-2">
          <Button type="submit" disabled={isSubmitting}>
            Next
          </Button>
        </div>
      </div>
    </form>
  );
};

export default WelcomeUser;
