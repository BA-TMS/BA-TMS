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
import TextInput from '../../UI_Elements/Form/TextInput';
import SelectInput from '../../UI_Elements/Form/SelectInput';
import DynamicSelect from '../../UI_Elements/Form/DynamicSelect';
import { currency, paymentTerms } from '../data/details';
import Button from '../../UI_Elements/buttons/Button';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { createCustomer, updateCustomer } from '@/store/slices/customerSlice';
import { CustomerData, customerFieldMap } from '@/types/customerTypes';
import { getFactors } from '@/lib/dbActions';

// this component holds state and layout for the customer form

interface AdvancedCustomerDetailsProps {
  modalOpen?: boolean;
  setModalOpen?: Dispatch<SetStateAction<boolean>>;
  updateFormState?: any;
}

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

const AdvancedCustomerDetails: React.FC<AdvancedCustomerDetailsProps> = ({
  updateFormState,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  // handle form state to be submitted
  const [formValues, setFormValues] = useState<Partial<CustomerData>>({});
  //   console.log('state form values', formValues);

  // pass this as a prop
  const saveFormValues = (customer: Partial<CustomerData>) => {
    console.log('saving values', customer);
    setFormValues({ ...formValues, ...customer });
  };

  // triggering any re-renders based on form input
  const [rerender, setRerender] = useState(false);

  const { toggleOpen, data } = useContext(ModalContext);

  const isUpdate = data !== null && data['id'];

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

    console.log('submit', mappedCustomer);

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
        'Sales Rep': '',
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
      <form
        onSubmit={handleSubmit(updateFormState)}
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
        <div className="py-3.5 px-4.5 border-t border-grey-300 dark:border-grey-700 flex justify-end gap-2.5">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting' : isUpdate ? 'Update' : 'Add'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdvancedCustomerDetails;
