'use client';

import { useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInput from './UI_Elements/TextInput';
import SelectInput from './UI_Elements/SelectInput';
import { usStates } from '@/components/Forms/data/states';
import { addCarrier } from '@/lib/dbActions';
import { ModalContext } from '@/Context/modalContext';

// contact name and email are commented out in case we need to go back and add them in

const carrierSchema = yup.object({
  'Carrier Name': yup.string().required('Carrier Name is required'),
  Address: yup.string().required('Address is required'),
  'Address Line 2': yup.string(),
  City: yup.string().required('City is required '),
  State: yup.string().required('State is required '),
  Zip: yup
    .string()
    .matches(/^\d{5}$/, 'Zip must be 5 digits')
    .required('Zip Code is required '),
  Country: yup.string().required('Country is required'),
  // 'Contact Name': yup.string().required('Contact Name is required'), // in case we end up needing this
  'Country Code': yup
    .string()
    .matches(/^\d+$/, 'Must be a valid Country Code')
    .required('Country Code is required'),
  'Phone Number': yup
    .string()
    .matches(/^\d{10}$/, 'Must use valid phone number')
    .required('Contact phone number required'),
  // Email: yup
  //   .string()
  //   .email('Must use a valid email')
  //   .required('Contact email required'),
  'DOT ID': yup
    .string()
    .matches(/^\d+$/, 'Must be a valid DOT ID')
    .required('Must enter DOT ID')
    .min(6, 'Must be valid DOT ID')
    .max(8, 'Must be valid DOT ID'),
  'Factor ID': yup.string().required('Must include Factor ID'),
  'Tax ID': yup.string(),
  Notes: yup.string().max(250, 'Must be under 250 characters'),
});

type Carrier = yup.InferType<typeof carrierSchema>;

export const CarrierForm = () => {
  const {
    handleSubmit,
    setError,
    reset,
    control,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<Carrier>({
    defaultValues: {
      'Carrier Name': '',
      Address: '',
      'Address Line 2': '',
      City: '',
      State: '',
      Zip: '',
      Country: '',
      // 'Contact Name': '',
      'Country Code': '',
      'Phone Number': '',
      // Email: '',
      'DOT ID': '',
      'Factor ID': '',
      'Tax ID': '',
      Notes: '',
    },
    resolver: yupResolver(carrierSchema),
  });

  const { toggleOpen } = useContext(ModalContext);

  const onSubmit = async (data: Carrier) => {
    console.log(data);
    try {
      await addCarrier({ carrier: data });
      console.log('Carrier added successfully');
      toggleOpen();
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
        'Address Line 2': '',
        City: '',
        State: '',
        Zip: '',
        Country: '',
        // 'Contact Name': '',
        'Country Code': '',
        'Phone Number': '',
        // Email: '',
        'DOT ID': '',
        'Factor ID': '',
        'Tax ID': '',
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
            <TextInput control={control} name="Carrier Name" required={true} />
            <TextInput control={control} name="Address" required={true} />
            <TextInput control={control} name="Address Line 2" />

            <div className=" flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <TextInput control={control} name="City" required={true} />
                <SelectInput
                  control={control}
                  name="State"
                  options={usStates.map((state) => state.name)}
                  required={true}
                />
                <TextInput
                  control={control}
                  name="Country Code"
                  required={true}
                />
                <TextInput control={control} name="DOT ID" required={true} />
              </div>
              <div className="w-full xl:w-1/2">
                <TextInput control={control} name="Zip" required={true} />
                <TextInput control={control} name="Country" required={true} />
                <TextInput
                  control={control}
                  name="Phone Number"
                  required={true}
                />
                <TextInput control={control} name="Factor ID" required={true} />
              </div>
            </div>
            {/* <TextInput control={control} name="Contact Name" required={true} /> */}
            {/* <TextInput control={control} name="Email" required={true} /> */}
            <TextInput control={control} name="Tax ID" />
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

export default CarrierForm;
