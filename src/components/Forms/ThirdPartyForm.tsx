'use client';

import { useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInput from '../UI_Elements/Form/TextInput';
import SelectInput from '../UI_Elements/Form/SelectInput';
import { usStates } from '@/components/Forms/data/states';
import { ModalContext } from '@/context/modalContext';
import { addThirdParty } from '@/lib/dbActions';

const thirdPartySchema = yup.object({
  'Third Party Name': yup.string().required('Third Party Name is required'),
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
});

type thirdParty = yup.InferType<typeof thirdPartySchema>;

export const ThirdPartyForm = () => {
  const {
    handleSubmit,
    setError,
    reset,
    control,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<thirdParty>({
    defaultValues: {
      'Third Party Name': '',
      Address: '',
      'Address Line 2': '',
      City: '',
      State: '',
      Zip: '',
      Country: '',
      'Country Code': '',
      'Phone Number': '',
    },
    resolver: yupResolver(thirdPartySchema),
  });

  const { toggleOpen } = useContext(ModalContext);

  const onSubmit = async (data: thirdParty) => {
    console.log(data);
    try {
      await addThirdParty({ billee: data }); // Change these to thirdParty
      console.log('thirdParty added successfully');
      toggleOpen();
    } catch (error) {
      console.log('Error submitting form:', error);
      setError('root', { message: 'Error Submitting Form - Please try Again' });
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        'Third Party Name': '',
        Address: '',
        'Address Line 2': '',
        City: '',
        State: '',
        Zip: '',
        Country: '',
        'Country Code': '',
        'Phone Number': '',
      });
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div className="flex flex-col gap-9">
      <div className="rounded-xs border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-full max-w-xl mx-auto overflow-y-auto max-h-screen">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Add Third Party
          </h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6.5">
            <TextInput
              control={control}
              name="Third Party Name" // name always needs to match schema
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
                  options={usStates}
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
            {errors.root && (
              <p className="mb-5 text-danger">{errors.root.message}</p>
            )}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-1/4 rounded-sm bg-primary p-3 font-medium text-gray hover:bg-opacity-80"
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
                className="rounded-sm bg-red p-3 font-medium text-gray ml-2 hover:bg-opacity-80"
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

export default ThirdPartyForm;
