'use client';

import { useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInput from './UI_Elements/TextInput';
import SelectInput from './UI_Elements/SelectInput';
import { usStates } from '@/components/Forms/data/states';
import { ModalContext } from '@/Context/modalContext';
import { addFactoringCo } from '@/lib/dbActions';

const factoringSchema = yup.object({
  'Factoring Company Name': yup
    .string()
    .required('Factoring Company Name is required'),
  Address: yup.string().required('Address is required'),
  'Address Line 2': yup.string(),
  City: yup.string().required('City is required '),
  State: yup.string().required('State is required '),
  Zip: yup
    .string()
    .matches(/^\d{5}$/, 'Zip must be 5 digits')
    .required('Zip Code is required '),
  Country: yup.string().required('Country is required'),
  'Country Code': yup
    .string()
    .matches(/^\d+$/, 'Must be a valid Country Code')
    .required('Country Code is required'),
  'Phone Number': yup
    .string()
    .matches(/^\d{10}$/, 'Must use valid phone number')
    .required('Contact phone number required'),
  Notes: yup.string().max(250, 'Must be under 250 characters'), // not in db yet
});

type FactoringCompany = yup.InferType<typeof factoringSchema>;

export const FactoringCompanyForm = () => {
  const {
    handleSubmit,
    setError,
    reset,
    control,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FactoringCompany>({
    defaultValues: {
      'Factoring Company Name': '',
      Address: '',
      'Address Line 2': '',
      City: '',
      State: '',
      Zip: '',
      Country: '',
      'Country Code': '',
      'Phone Number': '',
      Notes: '',
    },
    resolver: yupResolver(factoringSchema),
  });

  const { toggleOpen } = useContext(ModalContext);

  const onSubmit = async (data: FactoringCompany) => {
    console.log(data);
    try {
      await addFactoringCo({ factor: data });
      console.log('Factoring Company added successfully');
      toggleOpen();
    } catch (error) {
      console.log('Error submitting form:', error);
      setError('root', { message: 'Error Submitting Form - Please try Again' });
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        'Factoring Company Name': '',
        Address: '',
        'Address Line 2': '',
        City: '',
        State: '',
        Zip: '',
        Country: '',
        'Country Code': '',
        'Phone Number': '',
        Notes: '',
      });
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div className="flex flex-col gap-9">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-full max-w-xl mx-auto overflow-y-auto max-h-screen">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            New Factoring Company
          </h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6.5">
            <TextInput
              control={control}
              name="Factoring Company Name"
              required={true}
            />
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
              </div>
              <div className="w-full xl:w-1/2">
                <TextInput control={control} name="Zip" required={true} />
                <TextInput control={control} name="Country" required={true} />
                <TextInput
                  control={control}
                  name="Phone Number"
                  required={true}
                />
              </div>
            </div>

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

export default FactoringCompanyForm;
