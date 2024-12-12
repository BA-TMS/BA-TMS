'use client';

import { useContext, useEffect } from 'react';
import * as yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(yup);
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { ModalContext } from '@/context/modalContext';
import TextInput from '@/components/UI_Elements/Form/TextInput';
import Button from '@/components/UI_Elements/buttons/Button';
import { useRouter } from 'next/navigation';

// error messages for yup-password validation
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

const newUserSchema = yup.object().shape({
  'First Name': yup.string().required('First Name is required.'),
  'Last Name': yup.string().required('Last Name is required.'),
  Email: yup
    .string()
    .email('Must use a valid email.')
    .required('Email is required.'),
  Password: yup.string().password().required('Password is required.'),
  'Personal Telephone': yup.string().required('Phone Number is required.'),
});

type NewUser = yup.InferType<typeof newUserSchema>;

export default function Signup() {
  const router = useRouter();

  const { formData, saveFormValues } = useContext(ModalContext);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    // setError,
    formState: { errors, isSubmitting },
  } = useForm<NewUser>({
    defaultValues: {
      'First Name': '',
      'Last Name': '',
      Email: '',
      Password: '',
      'Personal Telephone': '',
    },
    resolver: yupResolver(newUserSchema),
  });

  const onSubmit = (data: NewUser) => {
    saveFormValues(data);
    reset(); // update form to default values
    router.push('/signup/review'); // next step
  };

  useEffect(() => {
    if (formData) {
      Object.keys(formData).forEach((formField) => {
        setValue(formField as keyof NewUser, formData[formField]);
      });
    }
  }, [formData, setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col h-full justify-between"
    >
      <p className="mt-3.5 mb-5 body2 text-grey-800 text-center">
        This administrator will have the ability to add additional users and set
        their permission levels once sign up is complete
      </p>

      <div className="flex flex-col items-center w-full">
        <div className="w-2/3">
          <TextInput control={control} name="First Name" required={true} />

          <TextInput control={control} name="Last Name" required={true} />

          <TextInput
            control={control}
            name="Email"
            type="email"
            required={true}
          />

          <TextInput
            control={control}
            name="Personal Telephone"
            type="tel"
            required={true}
          />

          <TextInput
            control={control}
            name="Password"
            type="password"
            required={true}
          />
        </div>
      </div>

      {errors.root && (
        <p className="font-public font-normal text-text-sm text-danger text-center mt-2">
          {errors.root.message}
        </p>
      )}

      <div className="py-4 gap-2 border-t border-grey-300 bg-white flex justify-end sticky bottom-0 z-10">
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            intent="success"
            disabled={isSubmitting}
            onClick={() => {
              router.back();
            }}
          >
            Back
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            Next
          </Button>
        </div>
      </div>
    </form>
  );
}
