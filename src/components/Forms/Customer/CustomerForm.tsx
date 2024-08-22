'use client';

import React, {
  useEffect,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';
import { ModalContext } from '@/Context/modalContext';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '../../UI_Elements/buttons/Button';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { createCustomer, updateCustomer } from '@/store/slices/customerSlice';
import { CustomerData, customerFieldMap } from '@/types/customerTypes';
import { TabsComponent, Tab } from '../../UI_Elements/Form/Tabs';
import CustomerDetails from './CustomerDetails';
import AdvancedCustomerDetails from './CustomerAdvanced';

// this component holds state and layout for the customer form
// it also submits the data to redux/ db

// NEED TO HANDLE FORM SUBMIT

interface CustomerFormProps {
  modalOpen?: boolean;
  setModalOpen?: Dispatch<SetStateAction<boolean>>;
}

const customerDetailsSchema = yup.object({
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

  // advanced
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

  // Notes: yup.string().max(250, 'Must be under 250 characters'),
});

type Customer = yup.InferType<typeof customerDetailsSchema>;

const CustomerForm: React.FC<CustomerFormProps> = () => {
  const dispatch = useDispatch<AppDispatch>();

  // triggering any re-renders based on form input
  const [rerender, setRerender] = useState(false);

  const { toggleOpen, data, formData } = useContext(ModalContext);
  console.log('form data in customer form', formData);

  const isUpdate = data !== null && data['id'];

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isSubmitSuccessful }, // boolean values representing form state
  } = useForm({ defaultValues: formData });

  // will want to map before submitting to db
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

  // submit
  // make sure to clear the object in the context
  const onSubmit = async (customer: Customer) => {
    const mappedCustomer = mapCustomerData(customer);

    console.log('submit', mappedCustomer);

    if (data !== null && !data['id']) {
      try {
        await dispatch(createCustomer(mappedCustomer)).unwrap();
        // reset();
        toggleOpen();
      } catch (error) {
        console.error('Error creating customer:', error);
      }
    } else {
      if (data !== null) {
        try {
          await dispatch(
            updateCustomer({ id: data['id'], updatedCustomer: mappedCustomer })
          ).unwrap();

          // reset();
          toggleOpen();
        } catch (error) {
          console.error('Error updating customer:', error);
          toggleOpen();
        }
      }
    }
  };

  return (
    <div>
      <TabsComponent>
        <Tab label={'customer_details'} tabName={'Customer Details'}>
          <CustomerDetails />
        </Tab>
        <Tab label={'advanced_customer'} tabName={'Advanced'}>
          <AdvancedCustomerDetails />
        </Tab>
      </TabsComponent>
      <div className="min-h-5">
        {errors.root && (
          <p className="caption mb-1 text-error-dark">{errors.root.message}</p>
        )}
      </div>
      <div className="py-3.5 px-4.5 border-t border-grey-300 dark:border-grey-700 flex justify-end gap-2.5">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting' : isUpdate ? 'Update' : 'Add'}
        </Button>
        <Button
          type="button"
          disabled={isSubmitting}
          onClick={() => {
            // reset();
            toggleOpen();
          }}
          variant="outline"
          intent="default"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default CustomerForm;
