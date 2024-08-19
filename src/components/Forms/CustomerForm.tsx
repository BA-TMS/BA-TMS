'use client';

import React, { useEffect, useContext, Dispatch, SetStateAction } from 'react';
import { ModalContext } from '@/Context/modalContext';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInput from '../UI_Elements/Form/TextInput';
import SelectInput from '../UI_Elements/Form/SelectInput';
import DynamicSelect from '../UI_Elements/Form/DynamicSelect';
import { usStates } from '@/components/Forms/data/states';
import { customerStatus, currency, paymentTerms } from './data/details';
import Button from '../UI_Elements/buttons/Button';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { createCustomer, updateCustomer } from '@/store/slices/customerSlice';
import { CustomerData, customerFieldMap } from '@/types/customerTypes';
import { TabsComponent, Tab } from '../UI_Elements/Form/Tabs';
import { getFactors } from '@/lib/dbActions';

interface CustomerFormProps {
  modalOpen?: boolean;
  setModalOpen?: Dispatch<SetStateAction<boolean>>;
}

const customerSchema = yup.object({
  Status: yup.string().required('Must enter Customer Status'),
  'Company Name': yup.string().required('Must enter Company Name'),
  'Contact Name': yup.string().required('Must enter Contact Name'),
  'Secondary Contact Name': yup.string().nullable(),
  'Sales Rep': yup.string().nullable(),
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

  // advanced options
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
      Status: '',
      'Company Name': '',
      'Contact Name': '',
      'Secondary Contact Name': '',
      'Sales Rep': '',
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

      // advanced options
      Currency: '',
      'Payment Terms': '',
      'Credit Limit': undefined, // this might be angry
      'Federal ID': '',
      'Factoring Company': '',
      // 'Factoring Company ID': '', // do we need this?
      // Notes: '',
    },
    resolver: yupResolver(customerSchema),
  });

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

  const onSubmit = async (customer: Customer) => {
    const mappedCustomer = mapCustomerData(customer);

    if (data !== null && !data['id']) {
      try {
        await dispatch(createCustomer(mappedCustomer)).unwrap();
        reset();
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

  // reset form if submit successful
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        Status: '',
        'Company Name': '',
        'Contact Name': '',
        'Secondary Contact Name': '',
        'Sales Rep': '',
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

        // advanced options
        Currency: '',
        'Payment Terms': '',
        'Credit Limit': undefined, // this might be angry
        'Federal ID': '',
        'Factoring Company': '',
        // 'Factoring Company ID': '', // do we need this?
        // Notes: '',
      });
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div>
      <TabsComponent>
        <Tab label={'customer_details'} tabName={'Customer Details'}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-between"
          >
            <p className="px-4.5 mt-3.5 mb-5 body2 text-grey-800 dark:text-white">
              Set the details
            </p>
            <div className="px-4.5">
              <SelectInput
                control={control}
                name="Status"
                options={customerStatus}
                required={true}
              />
              <TextInput
                control={control}
                name="Company Name"
                required={true}
              />

              <TextInput
                control={control}
                name="Contact Name"
                required={true}
              />

              <TextInput control={control} name="Secondary Contact Name" />

              <TextInput
                control={control}
                name="Contact Email"
                required={true}
              />
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
              <TextInput
                control={control}
                name="Billing Address"
                required={true}
              />
              <TextInput control={control} name="Billing Address Line 2" />
              <TextInput control={control} name="Billing Address Line 3" />
              <TextInput
                control={control}
                name="Billing City"
                required={true}
              />
              <SelectInput
                control={control}
                name="Billing State"
                options={usStates}
                required={true}
              />
              <TextInput control={control} name="Billing Zip" required={true} />
              <TextInput
                control={control}
                name="Billing Country"
                required={true}
              />
              <TextInput
                control={control}
                name="Billing Email"
                required={true}
              />
              <TextInput
                control={control}
                name="Billing Telephone"
                required={true}
              />

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
              <TextInput control={control} name="Credit Limit" />
              <TextInput control={control} name="Federal ID" required={true} />
              <DynamicSelect
                control={control}
                name="Factoring Company"
                dbaction={getFactors}
              />
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
        <Tab label={'advanced_customer'} tabName={'Advanced'}>
          <p>Advanced options</p>
        </Tab>
      </TabsComponent>
    </div>
  );
};

export default CustomerForm;
