import React, { useContext, useState, useEffect } from 'react';
import { ModalContext } from '@/context/modalContext';
import { UserContext } from '@/context/userContextProvider';
import * as yup from 'yup';
import Button from '../../UI_Elements/Buttons/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { createCustomer, updateCustomer } from '@/store/slices/customerSlice';
import { CustomerData, CustomerFormData } from '@/types/customerTypes';
import DataDisplay from '@/components/UI_Elements/Display/DataDisplay';
import AddressDisplay from '@/components/UI_Elements/Display/AddressDisplay';
import { useRouter } from 'next/navigation';
import { FactorData } from '@/types/factorTypes';

// this component submits form data from the context to database using redux

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

  const { organization } = useContext(UserContext);
  formData.orgName = organization;

  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  // use the id to pull factor name from redux
  const factor = useSelector((state: RootState) =>
    state.factors.items.find(
      (factor: FactorData) => factor.id === formData['Factoring Company']
    )
  );

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
            await dispatch(
              createCustomer(customer as unknown as CustomerFormData)
            ).unwrap();
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
        console.error(error); // do something with this?
        setError('Please fill out all required fields');
        setIsSubmitting(false);
      });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        <p className="my-3.5 body2 text-grey-800 dark:text-white">
          Confirm Customer Details
        </p>

        <DataDisplay title="Customer Name" text={formData['Company Name']} />
        <div className="flex flex-col gap-5 xl:flex-row">
          <div className="flex flex-col self-center w-full">
            <DataDisplay title="Status" text={formData['Status']} />
            <DataDisplay title="Broker/ Rep" text={formData['Sales Rep']} />
            <DataDisplay
              title="Payment Terms"
              text={formData['Payment Terms']}
            />
            <DataDisplay title="Current Credit Balance" text={undefined} />
            <DataDisplay title="Credit Limit" text={formData['Credit Limit']} />
            <DataDisplay title="Currency" text={formData['Currency']} />
            <DataDisplay title="Federal ID" text={formData['Federal ID']} />
          </div>

          <div className="flex flex-col self-center w-full">
            <DataDisplay title="Contact Name" text={formData['Contact Name']} />
            <DataDisplay
              title="Secondary Contact"
              text={formData['Secondary Contact Name']}
            />
            <DataDisplay
              title="Contact Email"
              text={formData['Contact Email']}
            />
            <DataDisplay
              title="Telephone"
              text={formData['Contact Telephone']}
            />
            <DataDisplay title="Toll Free" text={formData['Toll Free']} />
            <DataDisplay title="Fax" text={formData['Fax']} />
            <DataDisplay title="Factoring Company" text={factor?.name} />
          </div>
        </div>

        <div className="flex flex-col self-center w-full">
          <AddressDisplay
            title={'Contact Address'}
            addressLine1={formData['Address']}
            addressLine2={formData['Address Line 2']}
            addressLine3={formData['Address Line 3']}
            city={formData['City']}
            state={formData['State']}
            zip={formData['Zip']}
            country={formData['Country']}
          />
        </div>

        <div className="flex flex-col self-center w-full">
          <AddressDisplay
            title={'Billing Address'}
            addressLine1={formData['Billing Address']}
            addressLine2={formData['Billing Address Line 2']}
            addressLine3={formData['Billing Address Line 3']}
            city={formData['Billing City']}
            state={formData['Billing State']}
            zip={formData['Billing Zip']}
            country={formData['Billing Country']}
          />
        </div>

        <div className="flex flex-col gap-5 xl:flex-row">
          <div className="flex flex-col self-center w-full">
            <DataDisplay
              title="Billing Email"
              text={formData['Billing Email']}
            />
          </div>

          <div className="flex flex-col self-center w-full">
            <DataDisplay
              title="Billing Telephone"
              text={formData['Billing Telephone']}
            />
          </div>
        </div>

        <div className="py-3.5 gap-2 border-t border-grey-300 dark:border-grey-700 flex justify-between sticky bottom-0 bg-white dark:bg-grey-900 z-10">
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
              const cancel = confirm('Cancel this entry?');
              if (cancel) {
                saveFormValues({}, true); // clears context values
                router.push('/customers');
              } else return;
            }}
            variant="outline"
            intent="default"
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
    </div>
  );
};

export default CustomerForm;
