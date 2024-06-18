'use client';

import * as yup from 'yup';
import { useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ModalContext } from '@/Context/modalContext';
import { addUser } from '@/lib/dbActions';

//import DynamicSelect from '../UI_Elements/Form/DynamicSelect';
import TextInput from '../UI_Elements/Form/TextInput';

const memberSchema = yup.object({
  Name: yup.string().required('Enter full name of the new member'),
  Email: yup.string().required('Enter email address for new member'),
  Role: yup.string(),
  Country: yup.string(),
  'Phone Number': yup.string(),
});

type Member = yup.InferType<typeof memberSchema>;

export const MemberForm = () => {
  const {
    handleSubmit,
    setError,
    reset,
    control,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<Member>({
    defaultValues: {
      Name: '',
      Email: '',
      'Phone Number': '',
    },
    resolver: yupResolver(memberSchema),
  });

  const { toggleOpen } = useContext(ModalContext);

  const onSubmit = async (data: Member) => {
    try {
      await addUser({ user: data });
      toggleOpen();
    } catch (error) {
      setError('root', { message: 'Error Submitting Form - Please try Again' });
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({});
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div className="flex flex-col gap-9">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-full max-w-xl mx-auto overflow-y-auto max-h-screen">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">New Member</h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6.5">
            <TextInput control={control} name="Full Name" required={true} />

            <TextInput control={control} name="Email Address" required={true} />

            <TextInput control={control} name="Role" required={true} />

            <TextInput control={control} name="Country" required={true} />

            <TextInput control={control} name="Phone Number" required={true} />

            <TextInput control={control} name="Notes" isTextArea={true} />
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
                onClick={() => {
                  reset();
                  toggleOpen();
                }}
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

export default MemberForm;
