'use client';

import React, { useEffect, useContext, Dispatch, SetStateAction } from 'react';
import { ModalContext } from '@/Context/modalContext';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInput from '../UI_Elements/Form/TextInput';
import SelectInput from '../UI_Elements/Form/SelectInput';
import { usStates } from '@/components/Forms/data/states';
import { addCustomer } from '../../lib/dbActions'; // Adjust the path as necessary

interface CustomerFormProps {
  modalOpen?: boolean;
  setModalOpen?: Dispatch<SetStateAction<boolean>>;
}

const customerSchema = yup.object({
  'Customer Name': yup.string().required('Customer Name is required'),
  Address: yup.string().required('Address is required'),
  'Address Line 2': yup.string(),
  City: yup.string().required('City is required '),
  State: yup.string().required('State is required '),
  Zip: yup
    .string()
    .matches(/^\d{5}$/, 'Zip must be 5 digits')
    .required('Zip Code is required '),
  Country: yup.string().required('Country is required'), // is this necessary or are we US based?
  'Country Code': yup.string().nullable().required('Country Code is required'),
  'Phone Number': yup
    .string()
    .matches(/^\d{3}-\d{3}-\d{4}$/, 'Must use valid phone number xxx-xxx-xxxx')
    .required('Phone number required'),
  // Email: yup // do we need email for customers?
  //   .string()
  //   .email('Must use a valid email')
  //   .required('Contact email required'),
  Notes: yup.string().max(250, 'Must be under 250 characters'),
});

type Customer = yup.InferType<typeof customerSchema>;

const CustomerForm: React.FC<CustomerFormProps> = () => {
  // opening the modal
  const { toggleOpen } = useContext(ModalContext);

  const {
    handleSubmit,
    setError, // async error handling
    reset, // for resetting form
    control, // based on schema
    formState: { errors, isSubmitting, isSubmitSuccessful }, // boolean values representing form state
  } = useForm<Customer>({
    defaultValues: {
      'Customer Name': '',
      Address: '',
      'Address Line 2': '',
      City: '',
      State: '',
      Zip: '',
      Country: '',
      'Country Code': '',
      'Phone Number': '',
      // Email: '',
      Notes: '',
    },
    resolver: yupResolver(customerSchema),
  });

  const onSubmit = async (data: Customer) => {
    console.log(data); // see the data
    try {
      await addCustomer({ customer: data });
      console.log('customer added successfully');
      toggleOpen();
    } catch (error) {
      console.log('Error submitting form:', error);
      setError('root', { message: 'Error Submitting Form - Please try Again' });
    }
  };

  // reset form if submit successful
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        'Customer Name': '',
        Address: '',
        'Address Line 2': '',
        City: '',
        State: '',
        Zip: '',
        Country: '',
        'Country Code': '',
        'Phone Number': '',
        // Email: '',
        Notes: '',
      });
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-6.5">
          <TextInput control={control} name="Customer Name" required={true} />
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

          {/* <TextInput control={control} name="Email" required={true} /> */}
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
  );
};

export default CustomerForm;
