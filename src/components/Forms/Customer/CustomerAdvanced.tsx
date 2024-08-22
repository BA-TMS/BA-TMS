'use client';

import React, { useEffect, useContext, useRef } from 'react';
import { ModalContext } from '@/Context/modalContext';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInput from '../../UI_Elements/Form/TextInput';
import SelectInput from '../../UI_Elements/Form/SelectInput';
import DynamicSelect from '../../UI_Elements/Form/DynamicSelect';
import { currency, paymentTerms } from '../data/details';
import { CustomerData, customerFieldMap } from '@/types/customerTypes';
import { getFactors } from '@/lib/dbActions';

const customerSchema = yup.object({
  'Sales Rep': yup.string().nullable(),
  Currency: yup.string(),
  'Payment Terms': yup.string().required('Must enter Payment Terms'),
  'Credit Limit': yup
    .number()
    .nullable()
    .typeError('Credit Limit be numeric value'),
  'Federal ID': yup.string().required('Must enter Federal ID'),
  'Factoring Company': yup.string().nullable(),
  // 'Factoring Company ID': yup.string().nullable(), // do we need this?
});

type Customer = yup.InferType<typeof customerSchema>;

const AdvancedCustomerDetails: React.FC = () => {
  const { toggleOpen, data, formData, saveFormValues } =
    useContext(ModalContext);

  const isUpdate = data !== null && data['id'];

  // is formData from the context?
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
      'Sales Rep': '',
      Currency: '',
      'Payment Terms': '',
      'Credit Limit': undefined, // this might be angry
      'Federal ID': '',
      'Factoring Company': '',
      // 'Factoring Company ID': '', // do we need this?
    },
    resolver: yupResolver(customerSchema),
  });

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
  // may or may not be necessary?
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        'Sales Rep': '',
        Currency: '',
        'Payment Terms': '',
        'Credit Limit': undefined, // this might be angry
        'Federal ID': '',
        'Factoring Company': '',
        // 'Factoring Company ID': '', // do we need this?
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
          <TextInput control={control} name="Sales Rep" />
          <SelectInput control={control} name="Currency" options={currency} />
          <SelectInput
            control={control}
            name="Payment Terms"
            options={paymentTerms}
            required={true}
          />
          <TextInput control={control} name="Credit Limit" />
          <TextInput control={control} name="Federal ID" required={true} />
          <DynamicSelect
            control={control}
            name="Factoring Company"
            dbaction={getFactors}
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

export default AdvancedCustomerDetails;
