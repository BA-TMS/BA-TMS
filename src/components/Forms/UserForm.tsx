'use client';

import { useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInput from './UI_Elements/TextInput';
import SelectInput from './UI_Elements/SelectInput';
import DynamicSelect from './UI_Elements/DynamicSelect';
import { ModalContext } from '@/Context/modalContext';
import { addUser, getOrganizations } from '@/lib/dbActions';

const userSchema = yup.object({
  Email: yup
    .string()
    .email('Must be a valid email')
    .required('Contact email required'),
  Password: yup.string().required('Password is required'),
  Organization: yup.string().required('Organization is required'),
  Role: yup.string().required('Role is required'),
});

type User = yup.InferType<typeof userSchema>;

export const UserForm = () => {
  const {
    handleSubmit,
    setError,
    reset,
    control,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<User>({
    defaultValues: {
      Email: '',
      Password: '',
      Organization: '',
      Role: 'USER',
    },
    resolver: yupResolver(userSchema),
  });

  const { toggleOpen } = useContext(ModalContext);

  const onSubmit = async (data: User) => {
    try {
      await addUser({ user: data });
      toggleOpen();
    } catch (error) {
      console.log('Error submitting form:', error);
      setError('root', { message: 'Error Submitting Form - Please try Again' });
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        Email: '',
        Password: '',
        Organization: '',
        Role: 'USER',
      });
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div className="flex flex-col gap-9">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-full max-w-xl mx-auto overflow-y-auto max-h-screen">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">New User</h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6.5">
            <TextInput control={control} name="Email" required={true} />
            <TextInput control={control} name="Password" required={true} />
            <DynamicSelect
              control={control}
              dbaction={getOrganizations}
              name="Organization"
              required={true}
            />
            <SelectInput
              control={control}
              name="Role"
              options={['USER', 'ADMIN', 'DEVELOPER', 'OWNER']}
              required={true}
            />
            {errors.root && (
              <p className="mb-5 text-danger">{errors.root.message}</p>
            )}
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

export default UserForm;
