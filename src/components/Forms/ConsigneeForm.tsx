'use client';

import { useEffect } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import TextInput from './UI_Elements/TextInput';
import SelectInput from './UI_Elements/SelectInput';
import { usStates } from '@/assets/data/states';

const consigneeSchema = yup.object({
  'Consignee Name': yup.string().required('Consignee Name is required'),
  Address: yup.string().required('Address is required'),
  City: yup.string().required('City is required '),
  State: yup.string().required('State is required '),
  Zip: yup
    .string()
    .length(5, 'Zip must be 5 characters')
    .required('Zip Code is required '),
  Country: yup.string().required('Country is required'),
  'Contact Name': yup.string().required('Contact Name is required'),
  'Phone Number': yup
    .string()
    .matches(/^[0-9]+$/, 'Must use valid phone number')
    .required('Contact phone number required'),
  Email: yup
    .string()
    .email('Must use a valid email')
    .required('Contact email required'),
  Notes: yup.string().max(250, 'Must be under 250 characters'),
});

type Consignee = yup.InferType<typeof consigneeSchema>;

export const ConsigneeForm = () => {
  const {
    handleSubmit,
    setError, // async error handling
    reset, // for resetting form
    control, // based on schema
    formState: { errors, isSubmitting, isSubmitSuccessful }, // boolean values representing form state
  } = useForm<Consignee>({
    defaultValues: {
      'Consignee Name': '',
      Address: '',
      City: '',
      State: '',
      Zip: '',
      Country: '',
      'Contact Name': '',
      'Phone Number': '',
      Email: '',
      Notes: '',
    },
    resolver: yupResolver(consigneeSchema),
  });

  // add our backend functionality here
  const onSubmit = async (data: Consignee) => {
    try {
      console.log(data); // see the object being sent
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
      // throw Error; // for testing
    } catch (error) {
      setError('root', { message: 'Error Submitting Form- Please try Again' }); // root is for errors that belong to form as a whole
    }
  };

  // found out this is best practice for reset
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        'Consignee Name': '',
        Address: '',
        City: '',
        State: '',
        Zip: '',
        Country: '',
        'Contact Name': '',
        'Phone Number': '',
        Email: '',
        Notes: '',
      });
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              New Consignee
            </h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-6.5">
              <TextInput
                control={control}
                name="Consignee Name" // name always needs to match schema
              />
              <TextInput control={control} name="Address" />

              <div className=" flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <TextInput control={control} name="City" />
                  <SelectInput
                    control={control}
                    name="State"
                    options={usStates}
                  />
                </div>
                <div className="w-full xl:w-1/2">
                  <TextInput control={control} name="Zip" />
                  <TextInput control={control} name="Country" />
                </div>
              </div>
              <TextInput control={control} name="Phone Number" />
              <TextInput control={control} name="Contact Name" />
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
    </div>
  );
};

export default ConsigneeForm;
