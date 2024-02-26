'use client';

import { useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInput from './UI_Elements/TextInput';
import SelectInput from './UI_Elements/SelectInput';
import { usStates } from '@/components/Forms/data/states';
import { ModalContext } from '@/Context/modalContext';
import { addUser } from '@/lib/dbActions';

const userSchema = yup.object({
  'User Name': yup.string().required('User Name is required'),
  email: yup
    .string()
    .email('Must be a valid email')
    .required('Contact email required'),
  password: yup.string().required('Must include password'),
  orgId: yup.number().integer().required('Organization is required'),
  Address: yup.string().required('Address is required'),
  role: yup.number().integer().required('Must include a role'),
});

type User = yup.InferType<typeof userSchema>;

export const OtherNumbersForm = () => {
  const {
    handleSubmit,
    setError,
    reset,
    control,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<User>({
    defaultValues: {
      'User Name': '',
      email: '',
      password: '',
      orgId: 0,
      Address: '',
      role: 0,
    },
    resolver: yupResolver(userSchema),
  });

  const { toggleOpen } = useContext(ModalContext);

  const onSubmit = async (data: User) => {
    try {
      await addUser({ user: data });
      toggleOpen();
    } catch (error) {
      alert("didn't save");
      setError('root', { message: 'Error Submitting Form - Please try Again' });
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        'User Name': '',
        email: '',
        password: '',
        orgId: 0,
        Address: '',
        role: 0,
      });
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div className="flex flex-col gap-9">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-full max-w-xl mx-auto overflow-y-auto max-h-screen">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">New Number</h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6.5">
            <TextInput control={control} name="User Name" required={true} />
            <TextInput control={control} name="email" required={true} />
            <TextInput control={control} name="password" required={true} />
            <TextInput control={control} name="orgId" required={true} />
            <TextInput control={control} name="Address" required={true} />
            <TextInput control={control} name="role" required={true} />

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-1/4 rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-80"
              >
                {isSubmitting ? 'Submitting' : 'Add'}
              </button>
              <button
                type="button"
                onClick={() => reset()}
                disabled={isSubmitting}
                className="rounded bg-red p-3 font-medium text-gray ml-2 hover:bg-opacity-80"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OtherNumbersForm;
