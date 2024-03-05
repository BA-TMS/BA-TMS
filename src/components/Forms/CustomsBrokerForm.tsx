'use client';

import { useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInput from './UI_Elements/TextInput';
// import { ModalContext } from '@/Context/modalContext'; // for modal

// needs database integration

const customsBrokerSchema = yup.object({
  'Broker Name': yup.string().required('Broker Name is required'),
  Crossing: yup.string().required('Customs crossing is required'),
  'Country Code': yup
    .number()
    .nullable()
    .integer('Must be an integer')
    .required('Country Code is required'),
  'Phone Number': yup
    .string()
    .matches(/^\d{3}-\d{3}-\d{4}$/, 'Must use valid phone number xxx-xxx-xxxx')
    .required('Contact phone number required'),
  Email: yup.string().email('Must use a valid email'),
  Notes: yup.string().max(250, 'Must be under 250 characters'),
});

type CustomsBroker = yup.InferType<typeof customsBrokerSchema>;

export const CustomsBrokerForm = () => {
  const {
    handleSubmit,
    setError, // async error handling
    reset, // for resetting form
    control, // based on schema
    formState: { errors, isSubmitting, isSubmitSuccessful }, // boolean values representing form state
  } = useForm<CustomsBroker>({
    defaultValues: {
      'Broker Name': '',
      Crossing: '',
      'Country Code': 1,
      'Phone Number': '',
      Email: '',
      Notes: '',
    },
    resolver: yupResolver(customsBrokerSchema),
  });

  //   const { toggleOpen } = useContext(ModalContext); // for modal functionality

  const onSubmit = async (data: CustomsBroker) => {
    console.log(data); // see the data
    try {
      //   await addDriver({ driver: data }); // add
      console.log('customs broker added successfully');
      //   toggleOpen(); // for modal
    } catch (error) {
      console.log('Error submitting form:', error);
      setError('root', { message: 'Error Submitting Form - Please try Again' });
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        'Broker Name': '',
        Crossing: '',
        'Country Code': 1,
        'Phone Number': '',
        Email: '',
        Notes: '',
      });
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div className="flex flex-col gap-9">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-full max-w-xl mx-auto overflow-y-auto max-h-screen">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            New Customs Broker
          </h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6.5">
            <TextInput control={control} name="Broker Name" required={true} />
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

            <TextInput control={control} name="Crossing" required={true} />
            <TextInput control={control} name="Email" />
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
                  //   toggleOpen(); // for modal
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

export default CustomsBrokerForm;
