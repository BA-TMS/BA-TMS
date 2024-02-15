'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInput from './UI_Elements/TextInput';
import SelectInput from './UI_Elements/SelectInput';
import { usStates } from '@/assets/data/states';
import { addCarrier } from '@/lib/dbActions';

interface CarrierFormProps {
  closeModal: () => void;
}

const carrierSchema = yup.object({
  'Carrier Name': yup.string().required('Consignee Name is required'),
  Address: yup.string().required('Address is required'),
  'Address (Optional)': yup.string(),
  City: yup.string().required('City is required '),
  State: yup.string().required('State is required '),
  Zip: yup
    .string()
    .length(5, 'Zip must be 5 characters')
    .required('Zip Code is required '),
  Country: yup.string().required('Country is required'), // is this necessary or are we US based?
  'Contact Name': yup.string().required('Contact Name is required'),
  'Country Code': yup
    .number()
    .integer('Must be an integer')
    .required('Country Code is required'),
  'Phone Number': yup
    .string()
    .matches(/^[0-9]+$/, 'Must use valid phone number')
    .required('Contact phone number required'),
  Email: yup
    .string()
    .email('Must use a valid email')
    .required('Contact email required'),
  'DOT ID': yup
    .number()
    .integer('Must be an integer')
    .required('Must enter DOT ID'),
  Notes: yup.string().max(250, 'Must be under 250 characters'),
});

type Carrier = yup.InferType<typeof carrierSchema>;

export const CarrierForm: React.FC<CarrierFormProps> = ({ closeModal }) => {
  const {
    handleSubmit,
    setFocus, // focus - how to use this?
    setError, // async error handling
    reset, // for resetting form
    control, // based on schema
    formState: { errors, isSubmitting, isSubmitSuccessful }, // boolean values representing form state
  } = useForm<Carrier>({
    defaultValues: {
      'Carrier Name': '',
      Address: '',
      'Address (Optional)': '',
      City: '',
      State: '',
      Zip: '',
      Country: '',
      'Contact Name': '',
      'Country Code': undefined,
      'Phone Number': '',
      Email: '',
      'DOT ID': undefined,
      Notes: '',
    },
    resolver: yupResolver(carrierSchema),
  });

  const onSubmit = async (data: Carrier) => {
    console.log(data); // see the data
    try {
      await addCarrier({ carrier: data });
      console.log('Carrier added successfully');
      closeModal();
    } catch (error) {
      console.log('Error submitting form:', error);
      setError('root', { message: 'Error Submitting Form - Please try Again' });
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        'Carrier Name': '',
        Address: '',
        'Address (Optional)': '',
        City: '',
        State: '',
        Zip: '',
        Country: '',
        'Contact Name': '',
        'Country Code': undefined,
        'Phone Number': '',
        Email: '',
        'DOT ID': undefined,
        Notes: '',
      });
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div className="flex flex-col gap-9">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-full max-w-xl mx-auto overflow-y-auto max-h-screen">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            New Carrier
          </h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6.5">
            <TextInput control={control} name="Carrier Name" />
            <TextInput control={control} name="Address" />
            <TextInput control={control} name="Address (Optional)" />

            <div className=" flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <TextInput control={control} name="City" />
                <SelectInput
                  control={control}
                  name="State"
                  options={usStates}
                />
                <TextInput control={control} name="Country Code" />
              </div>
              <div className="w-full xl:w-1/2">
                <TextInput control={control} name="Zip" />
                <TextInput control={control} name="Country" />
                <TextInput control={control} name="Phone Number" />
              </div>
            </div>
            <TextInput control={control} name="Contact Name" />
            <TextInput control={control} name="Email" />
            <TextInput control={control} name="DOT ID" />
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
                  closeModal(); // Close the modal when cancel is clicked
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

export default CarrierForm;
