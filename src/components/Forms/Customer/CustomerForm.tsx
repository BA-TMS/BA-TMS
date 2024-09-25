import React, { useContext, useState, useEffect } from 'react';
import { ModalContext } from '@/Context/modalContext';
import * as yup from 'yup';
import Button from '../../UI_Elements/buttons/Button';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { createCustomer, updateCustomer } from '@/store/slices/customerSlice';
import { CustomerData, customerFieldMap } from '@/types/customerTypes';
import { useRouter } from 'next/navigation';

// this component submits form data from the context to database using redux
// TODO: the design could be improved

// Define the validation schema for customer data
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
  City: yup.string().required('City is required'),
  State: yup.string().required('State is required'),
  Zip: yup
    .string()
    .matches(/^\d{5}$/, 'Zip must be 5 digits')
    .required('Zip Code is required'),
  Country: yup.string().required('Must enter Country'),
  'Billing Address': yup.string().required('Billing address required'),
  'Billing Address Line 2': yup.string().nullable(),
  'Billing Address Line 3': yup.string().nullable(),
  'Billing City': yup.string().required('Billing city is required'),
  'Billing State': yup.string().required('Billing state is required'),
  'Billing Zip': yup
    .string()
    .matches(/^\d{5}$/, 'Zip must be 5 digits')
    .required('Zip Code is required'),
  'Billing Country': yup.string().required('Must enter Billing Country'),
  'Billing Email': yup
    .string()
    .email('Must use a valid email')
    .required('Billing email required'),
  'Billing Telephone': yup.string().required('Must enter Billing Telephone'),
  'Sales Rep': yup.string().nullable(),
  Currency: yup.string(),
  'Payment Terms': yup.string().required('Must enter Payment Terms'),
  'Credit Limit': yup
    .number()
    .nullable()
    .typeError('Credit Limit must be a numeric value'),
  'Federal ID': yup.string().required('Must enter Federal ID'),
  'Factoring Company': yup.string().nullable(),
});

const CustomerForm = () => {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const { formData, saveFormValues } = useContext(ModalContext);

  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  useEffect(() => {
    if (formData !== null && formData['id']) {
      setIsUpdate(true);
    }
  }, [formData]);

  const onSubmit = async (customer: CustomerData) => {
    setIsSubmitting(true);
    setError(''); // clear previous errors

    customerSchema
      .validate(customer)
      .then(async () => {
        if (!isUpdate) {
          try {
            await dispatch(createCustomer(customer)).unwrap();
          } catch (error) {
            setError(`Error creating customer: ${error}`);
          }
        } else {
          try {
            await dispatch(
              updateCustomer({
                id: formData['id'],
                updatedCustomer: customer,
              })
            ).unwrap();
          } catch (error) {
            setError(`Error updating customer: ${error}`);
          }
        }
        setIsSubmitting(false);
      })
      .catch((error) => {
        setError('Please fill out all required fields');
        setIsSubmitting(false);
      });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-4.5 flex-grow">
        <p className="my-3.5 body2 text-grey-800 dark:text-white">
          Confirm Customer Details
        </p>

        <div className="flex flex-wrap flex-col gap-1">
          {Object.entries(customerFieldMap).map(([fieldLabel, fieldKey]) => (
            <p className="body2 text-grey-800 dark:text-white inline-block">
              <b>{fieldLabel}: </b>
              {formData[fieldKey] || ''}
            </p>
          ))}
        </div>

        <div className="py-3.5 gap-2 border-t border-grey-300 dark:border-grey-700 flex justify-end sticky bottom-0 bg-white dark:bg-grey-900 z-10">
          {error && (
            <div className="min-h-5 mr-2 self-center">
              <p className="caption mb-1 text-error-dark">{error}</p>
            </div>
          )}
          <Button
            id="cancel"
            type="button"
            disabled={isSubmitting}
            onClick={() => {
              saveFormValues({}, true); // Reset form data
            }}
            variant="outline"
            intent="default"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            onClick={() => {
              onSubmit(formData as CustomerData);
              saveFormValues({}, true); // Reset form data after submission
              router.push('/customers');
            }}
          >
            {isSubmitting ? 'Submitting...' : isUpdate ? 'Update' : 'Add'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;
