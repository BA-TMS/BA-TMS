'use client';

import React, { useEffect, useContext, Dispatch, SetStateAction } from 'react';
import { ModalContext } from '@/Context/modalContext';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInput from '../UI_Elements/Form/TextInput';
import SelectInput from '../UI_Elements/Form/SelectInput';
import { usStates } from '@/components/Forms/data/states';
import Button from '../UI_Elements/buttons/Button';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { createCustomer, updateCustomer } from '@/store/slices/customerSlice';
import { CustomerData } from '@/types/customerTypes';
import { TabsComponent, Tab } from '../UI_Elements/Form/Tabs';

interface CustomerFormProps {
  modalOpen?: boolean;
  setModalOpen?: Dispatch<SetStateAction<boolean>>;
}

const customerSchema = yup.object({
  'Customer Name': yup.string().required('Customer Name is required'),
  Address: yup.string().required('Address is required'),
  'Address Line 2': yup.string().nullable(),
  City: yup.string().required('City is required '),
  State: yup.string().required('State is required '),
  Zip: yup
    .string()
    .matches(/^\d{5}$/, 'Zip must be 5 digits')
    .required('Zip Code is required '),
  Country: yup.string().required('Country is required'), // is this necessary or are we US based?
  'Country Code': yup.string().nullable(),
  'Phone Number': yup.string().required('Phone number required'),
  // Email: yup // do we need email for customers?
  //   .string()
  //   .email('Must use a valid email')
  //   .required('Contact email required'),
  Notes: yup.string().max(250, 'Must be under 250 characters'),
});

type Customer = yup.InferType<typeof customerSchema>;

const CustomerForm: React.FC<CustomerFormProps> = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { toggleOpen, data } = useContext(ModalContext);

  const isUpdate = data !== null && data['id'];

  const {
    setValue,
    handleSubmit,
    // setError, // async error handling
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

  const onSubmit = async (customer: CustomerData) => {
    // not customer: Customer
    if (data !== null && !data['id']) {
      try {
        await dispatch(createCustomer(customer)).unwrap();
        reset();
        toggleOpen();
      } catch (error) {
        console.error('Error creating load:', error);
      }
    } else {
      // code looks fine but id is undefined?
      {
        try {
          await dispatch(
            updateCustomer({ id: data['id'], updatedCustomer: customer })
          ).unwrap();

          reset();
          toggleOpen();
        } catch (error) {
          console.error('Error updating customer:', error);
          toggleOpen();
        }
      }
    }
  };

  useEffect(() => {
    console.log('context data', data);
    // if data is not a synthetic event
    if (isUpdate) {
      // populate form with data from context
      setValue('Customer Name', data['name']);
      setValue('Address', data['address']);
      setValue('Address Line 2', data['addressAddOn']);
      setValue('City', data['city']);
      setValue('State', data['state']);
      setValue('Zip', data['postCode']);
      setValue('Country', data['postCountry']);
      setValue('Country Code', data['telCountry']);
      setValue('Phone Number', data['telephone']);
      // notes + new values
    }
  }, [data, setValue, isUpdate]);

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
    <>
      <TabsComponent>
        <Tab label={'recommended'} tabName={'Recommended'}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-between"
          >
            <p className="px-4.5 mt-3.5 mb-5 body2 text-grey-800 dark:text-white">
              Set the details
            </p>
            <div className="px-4.5">
              <TextInput
                control={control}
                name="Customer Name"
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
                    required={false}
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
              <div className="min-h-5">
                {errors.root && (
                  <p className="caption mb-1 text-error-dark">
                    {errors.root.message}
                  </p>
                )}
              </div>
            </div>
            <div className="py-3.5 px-4.5 border-t border-grey-300 dark:border-grey-700 flex justify-end gap-2.5">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting' : isUpdate ? 'Update' : 'Add'}
              </Button>
              <Button
                type="button"
                disabled={isSubmitting}
                onClick={() => {
                  reset();
                  toggleOpen();
                }}
                variant="outline"
                intent="default"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Tab>
        <Tab label={'subscribed'} tabName={'Subscribed'}>
          <p>You no subscribed to any channel</p>
        </Tab>
      </TabsComponent>
    </>
  );
};

export default CustomerForm;
