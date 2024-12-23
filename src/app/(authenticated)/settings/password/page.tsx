'use client';

import { useState, useEffect } from 'react';
import * as yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(yup);
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import TextInput from '@/components/UI_Elements/Form/TextInput';
import Button from '@/components/UI_Elements/Buttons/Button';
import { updatePassword } from '../actions';

// page where user can reset their password

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

const PasswordReset = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Password>({
    defaultValues: {
      Password: '',
      'Confirm Password': '',
    },
    resolver: yupResolver(passwordSchema),
  });

  const onSubmit = async (data: Password) => {
    setIsSubmitting(true);

    const result = await updatePassword(data['Password']); // add token?

    // if result is a string, it's an error
    if (typeof result === 'string') {
      setError('root', { message: result });
    } else {
      // handle successful update
      clearErrors('root'); // clear error
      // form is cleared via useEffect when isSubmitSuccessful is true
      // let the user know that it worked (may want to change)
      alert('Password updated successfully');
    }

    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };

  // clear form on success
  useEffect(() => {
    reset({
      Password: '',
      'Confirm Password': '',
    });
  }, [reset, isSubmitSuccessful]);

  return (
    <div className="bg-grey-100 dark:bg-grey-800 flex flex-col items-center justify-center">
      <div className="flex flex-col bg-white border rounded-lg border-grey-300 px-4.5 w-4/6 h-5/6 pt-2">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col h-full justify-between"
        >
          <p className="my-5 body1 text-grey-800 text-center">
            Change Password
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
          </div>

          <div className="py-4 gap-2 border-t border-grey-300 bg-white flex justify-end sticky bottom-0 z-10">
            <div className="flex justify-end gap-2">
              <Button type="submit" disabled={isSubmitting}>
                Save Changes
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;
