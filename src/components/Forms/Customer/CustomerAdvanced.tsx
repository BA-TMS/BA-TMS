'use client';

import React, { useEffect, useContext, useCallback } from 'react';
import { ModalContext } from '@/Context/modalContext';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInput from '../../UI_Elements/Form/TextInput';
import SelectInput from '../../UI_Elements/Form/SelectInput';
import DynamicSelect from '../../UI_Elements/Form/DynamicSelect';
import { currency, paymentTerms } from '../data/details';
import { getFactors } from '@/lib/dbActions';
import Button from '@/components/UI_Elements/buttons/Button';
import { useRouter, usePathname } from 'next/navigation';

// this component uses yup and react-hook-form to submit form values to a context

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
  const router = useRouter();

  const pathname = usePathname();
  const segment = pathname.includes('add-customer')
    ? 'add-customer'
    : 'update-customer';

  const { formData, saveFormValues } = useContext(ModalContext);

  const {
    setValue,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<Customer>({
    defaultValues: {
      'Sales Rep': '',
      Currency: '',
      'Payment Terms': '',
      'Credit Limit': undefined,
      'Federal ID': '',
      'Factoring Company': '',
    },
    resolver: yupResolver(customerSchema),
  });

  // submit the values to the context
  const onSubmit = useCallback(
    async (customer: Customer) => {
      saveFormValues(customer);
      router.push(`/customers/${segment}/review`); // next step
    },
    [saveFormValues, router]
  );

  // keep fields populated when switching tabs
  // populate fields if it's an update
  useEffect(() => {
    if (formData) {
      // populate form with data from context
      Object.keys(formData).forEach((formField) => {
        setValue(formField as keyof Customer, formData[formField]);
      });
    }
  }, [formData, setValue]);

  // clear values if successful
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        'Sales Rep': '',
        Currency: '',
        'Payment Terms': '',
        'Credit Limit': undefined,
        'Federal ID': '',
        'Factoring Company': '',
      });
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div className="flex flex-col h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-between flex-grow"
      >
        <p className="mt-3.5 mb-5 body2 text-grey-800 dark:text-white">
          Set customer details
        </p>
        <div className="flex-grow">
          <div className="flex flex-col gap-5 xl:flex-row">
            <div className="flex flex-col w-full xl:w-1/2">
              <TextInput control={control} name="Sales Rep" />

              <SelectInput
                control={control}
                name="Currency"
                options={currency}
              />

              <SelectInput
                control={control}
                name="Payment Terms"
                options={paymentTerms}
                required={true}
              />
            </div>
            <div className="flex flex-col w-full xl:w-1/2">
              <TextInput control={control} name="Federal ID" required={true} />

              <TextInput control={control} name="Credit Limit" />

              <DynamicSelect
                control={control}
                name="Factoring Company"
                dbaction={getFactors}
              />
            </div>
          </div>
        </div>

        <div className="min-h-5">
          {errors.root && (
            <p className="caption mb-1 text-error-dark">
              {errors.root.message}
            </p>
          )}
        </div>
        <div className="py-3.5 gap-2 border-t border-grey-300 dark:border-grey-700 flex justify-between bottom-0 bg-white dark:bg-grey-900 z-10">
          <Button
            type="button"
            variant="outline"
            intent="default"
            disabled={isSubmitting}
            onClick={() => {
              const cancel = confirm('Cancel this entry?');
              if (cancel) {
                saveFormValues({}, true); // clears context values
                router.push('/customers');
              } else return;
            }}
          >
            Cancel
          </Button>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              intent="success"
              disabled={isSubmitting}
              onClick={() => {
                router.back();
              }}
            >
              Back
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              Next
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdvancedCustomerDetails;
