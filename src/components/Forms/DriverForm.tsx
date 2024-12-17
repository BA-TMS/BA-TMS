'use client';

import { useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInput from '../UI_Elements/Form/TextInput';
import DynamicSelect from '../UI_Elements/Form/DynamicSelect';
import { ModalContext } from '@/context/modalContext';
import { addDriver, getCarriers } from '@/lib/dbActions';

const driverSchema = yup.object({
  'Driver Name': yup.string().required('Driver Name is required'),
  'Country Code': yup
    .string()
    .matches(/^\d+$/, 'Must be a valid Country Code')
    .required('Country Code is required'),
  'Phone Number': yup
    .string()
    .matches(/^\d{10}$/, 'Must use valid phone number')
    .required('Contact phone number required'),
  'License Number': yup.string(),
  Employer: yup.string().required('Employer is required'), // relation to carriers
  Notes: yup.string().max(250, 'Must be under 250 characters'),
});

type Driver = yup.InferType<typeof driverSchema>;

export const DriverForm = () => {
  const {
    handleSubmit,
    setError,
    reset,
    control,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<Driver>({
    defaultValues: {
      'Driver Name': '',
      'Country Code': '',
      'Phone Number': '',
      'License Number': '',
      Employer: '',
      Notes: '',
    },
    resolver: yupResolver(driverSchema),
  });

  const { toggleOpen } = useContext(ModalContext);

  const onSubmit = async (data: Driver) => {
    console.log(data); // see the data
    try {
      await addDriver({ driver: data });
      console.log('driver added successfully');
      toggleOpen();
    } catch (error) {
      console.log('Error submitting form:', error);
      setError('root', { message: 'Error Submitting Form - Please try Again' });
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        'Driver Name': '',
        'Country Code': '',
        'Phone Number': '',
        'License Number': '',
        Employer: '',
        Notes: '',
      });
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div className="flex flex-col gap-9">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-full max-w-xl mx-auto overflow-y-auto max-h-screen">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">New Driver</h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6.5">
            <TextInput control={control} name="Driver Name" required={true} />

            <div className=" flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <TextInput
                  control={control}
                  name="Country Code"
                  required={true}
                />
              </div>
              <div className="w-full xl:w-1/2">
                <TextInput
                  control={control}
                  name="Phone Number"
                  required={true}
                />
              </div>
            </div>

            <TextInput control={control} name="License Number" />
            <DynamicSelect
              control={control}
              name="Employer"
              required={true}
              dbaction={getCarriers}
            />
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

export default DriverForm;
