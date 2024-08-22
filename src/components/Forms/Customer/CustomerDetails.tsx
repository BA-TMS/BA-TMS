'use client';

import React, { useEffect, useContext, useState, useRef } from 'react';
import { ModalContext } from '@/Context/modalContext';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import CheckBox from '../../UI_Elements/Form/CheckBox';
import TextInput from '../../UI_Elements/Form/TextInput';
import SelectInput from '../../UI_Elements/Form/SelectInput';
import { usStates } from '@/components/Forms/data/states';
import { customerStatus } from '../data/details';
import { CustomerData, customerFieldMap } from '@/types/customerTypes';

const customerSchema = yup.object({
  Status: yup.string().required('Must enter Customer Status'),
  'Company Name': yup.string().required('Must enter Company Name'),
  'Contact Name': yup.string().required('Must enter Contact Name'),
  'Secondary Contact Name': yup.string().nullable(),

  'Contact Email': yup
    .string()
    .email('Must use a valid email')
    .required('Contact email required'),
  Telephone: yup.string().required('Must enter Contact Telephone'),
  'Toll Free': yup.string().nullable(),
  Fax: yup.string().nullable(),

  Address: yup.string().required('Address is required'),
  'Address Line 2': yup.string().nullable(),
  'Address Line 3': yup.string().nullable(),
  City: yup.string().required('City is required '),
  State: yup.string().required('State is required '),
  Zip: yup
    .string()
    .matches(/^\d{5}$/, 'Zip must be 5 digits')
    .required('Zip Code is required '),
  Country: yup.string().required('Must enter Country'),

  'Billing Address': yup.string().required('Billing address required'),
  'Billing Address Line 2': yup.string().nullable(),
  'Billing Address Line 3': yup.string().nullable(),
  'Billing City': yup.string().required('Billing city is required '),
  'Billing State': yup.string().required('Billing state is required '),
  'Billing Zip': yup
    .string()
    .matches(/^\d{5}$/, 'Zip must be 5 digits')
    .required('Zip Code is required '),
  'Billing Country': yup.string().required('Must enter Billing Country'),
  'Billing Email': yup
    .string()
    .email('Must use a valid email')
    .required('Billing email required'),
  'Billing Telephone': yup.string().required('Must enter Billing Telephone'),

  // Notes: yup.string().max(250, 'Must be under 250 characters'),
});

type Customer = yup.InferType<typeof customerSchema>;

const CustomerDetails: React.FC = () => {
  const { toggleOpen, data, formData, saveFormValues } =
    useContext(ModalContext);

  // triggering any re-renders based on form input
  const [rerender, setRerender] = useState(false);

  const isUpdate = data !== null && data['id'];

  // is formData from the context
  const getFields = Object.keys(formData).length > 0;

  // we are submitting the form data to the context on click off of the form component
  const componentRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      componentRef.current &&
      !componentRef.current.contains(event.target as Node)
    ) {
      console.log(!componentRef.current.contains(event.target as Node));
      handleSubmit(onSubmit)();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const {
    setValue, // set value of a form field
    handleSubmit,
    getValues, // get values of a form field
    resetField, //reset individual form field
    // setError, // async error handling
    reset, // for resetting form
    control, // based on schema
    formState: { errors, isSubmitting, isSubmitSuccessful }, // boolean values representing form state
  } = useForm<Customer>({
    defaultValues: {
      Status: '',
      'Company Name': '',
      'Contact Name': '',
      'Secondary Contact Name': '',
      'Contact Email': '',
      Telephone: '',
      'Toll Free': '',
      Fax: '',

      Address: '',
      'Address Line 2': '',
      'Address Line 3': '',
      City: '',
      State: '',
      Zip: '',
      Country: '',

      'Billing Address': '',
      'Billing Address Line 2': '',
      'Billing Address Line 3': '',
      'Billing City': '',
      'Billing State': '',
      'Billing Zip': '',
      'Billing Country': '',
      'Billing Email': '',
      'Billing Telephone': '',
    },
    resolver: yupResolver(customerSchema),
  });

  function setBillingAddress() {
    // get values of mailing address
    const mailingAddress = getValues([
      'Address',
      'Address Line 2',
      'Address Line 3',
      'City',
      'State',
      'Zip',
      'Country',
    ]);
    // if values of billing address are empty
    if (getValues('Billing Address') === '') {
      // set them
      setValue('Billing Address', mailingAddress[0]);
      setValue('Billing Address Line 2', mailingAddress[1]);
      setValue('Billing Address Line 3', mailingAddress[2]);
      setValue('Billing City', mailingAddress[3]);
      setValue('Billing State', mailingAddress[4]);
      setValue('Billing Zip', mailingAddress[5]);
      setValue('Billing Country', mailingAddress[6]);
    } else {
      // if they are full, clear them when uncheck box
      resetField('Billing Address');
      resetField('Billing Address Line 2');
      resetField('Billing Address Line 3');
      resetField('Billing City');
      resetField('Billing State');
      resetField('Billing Zip');
      resetField('Billing Country');
      resetField('Billing Email');
      resetField('Billing Telephone');
    }
    // need to rerender the component to show any updated values
    setRerender(!rerender);
  }

  // is this being used here?
  const mapCustomerData = (customer: Customer) => {
    const mappedData: Record<string, unknown> = {};

    Object.keys(customer).forEach((key) => {
      // the field name in the db
      const dbField = customerFieldMap[key as keyof typeof customerFieldMap];

      if (dbField) {
        mappedData[dbField] = customer[key as keyof Customer];
      } else {
        mappedData[key] = customer[key as keyof Customer];
      }
    });

    console.log('mapped data', mappedData);
    return mappedData as CustomerData;
  };

  // submit the values to the context
  const onSubmit = async (customer: Customer) => {
    console.log('submitting customer', customer);
    saveFormValues(customer);
  };

  // fix update
  useEffect(() => {
    if (isUpdate) {
      // populate form with data from context
      Object.keys(customerFieldMap).forEach((formField) => {
        setValue(
          formField as keyof Customer,
          data[customerFieldMap[formField]]
        );
      });
    }
  }, [data, setValue, isUpdate]);

  // keep fields populated when switching tabs
  useEffect(() => {
    if (formData) {
      // populate form with data from context
      Object.keys(formData).forEach((formField) => {
        setValue(formField as keyof Customer, formData[formField]);
      });
    }
  }, []);

  // reset form if submit successful
  // this may or may not be necessary in the final round
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        Status: '',
        'Company Name': '',
        'Contact Name': '',
        'Secondary Contact Name': '',

        'Contact Email': '',
        Telephone: '',
        'Toll Free': '',
        Fax: '',

        Address: '',
        'Address Line 2': '',
        'Address Line 3': '',
        City: '',
        State: '',
        Zip: '',
        Country: '',

        'Billing Address': '',
        'Billing Address Line 2': '',
        'Billing Address Line 3': '',
        'Billing City': '',
        'Billing State': '',
        'Billing Zip': '',
        'Billing Country': '',
        'Billing Email': '',
        'Billing Telephone': '',
      });
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div ref={componentRef}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-between"
      >
        <p className="px-4.5 mt-3.5 mb-5 body2 text-grey-800 dark:text-white">
          Set customer details
        </p>
        <div className="px-4.5">
          <SelectInput
            control={control}
            name="Status"
            options={customerStatus}
            required={true}
          />
          <TextInput control={control} name="Company Name" required={true} />

          <TextInput control={control} name="Contact Name" required={true} />

          <TextInput control={control} name="Secondary Contact Name" />

          <TextInput control={control} name="Contact Email" required={true} />
          <TextInput control={control} name="Telephone" required={true} />
          <TextInput control={control} name="Toll Free" />
          <TextInput control={control} name="Fax" />

          <TextInput control={control} name="Address" required={true} />
          <TextInput control={control} name="Address Line 2" />
          <TextInput control={control} name="Address Line 3" />
          <TextInput control={control} name="City" required={true} />
          <SelectInput
            control={control}
            name="State"
            options={usStates}
            required={true}
          />
          <TextInput control={control} name="Zip" required={true} />
          <TextInput control={control} name="Country" required={true} />

          {/* Billing Address */}
          <CheckBox
            id={'billing_address'}
            onChange={setBillingAddress}
            label="Same as Mailing Address"
          />
          <TextInput control={control} name="Billing Address" required={true} />
          <TextInput control={control} name="Billing Address Line 2" />
          <TextInput control={control} name="Billing Address Line 3" />
          <TextInput control={control} name="Billing City" required={true} />
          <SelectInput
            control={control}
            name="Billing State"
            options={usStates}
            required={true}
          />
          <TextInput control={control} name="Billing Zip" required={true} />
          <TextInput control={control} name="Billing Country" required={true} />
          <TextInput control={control} name="Billing Email" required={true} />
          <TextInput
            control={control}
            name="Billing Telephone"
            required={true}
          />
        </div>

        <div className="min-h-5">
          {errors.root && (
            <p className="caption mb-1 text-error-dark">
              {errors.root.message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default CustomerDetails;
