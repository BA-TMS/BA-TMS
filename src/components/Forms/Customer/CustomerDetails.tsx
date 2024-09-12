'use client';

import React, {
  useEffect,
  useContext,
  useState,
  useRef,
  useCallback,
} from 'react';
import { ModalContext } from '@/Context/modalContext';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import CheckBox from '../../UI_Elements/Form/CheckBox';
import TextInput from '../../UI_Elements/Form/TextInput';
import SelectInput from '../../UI_Elements/Form/SelectInput';
import { usStates } from '@/components/Forms/data/states';
import { customerStatus } from '../data/details';
import { customerFieldMap } from '@/types/customerTypes';

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
  const { formData, saveFormValues } = useContext(ModalContext);

  // triggering any re-renders based on form input
  const [rerender, setRerender] = useState<boolean>(false);

  const isUpdate = formData !== null && formData['id'];
  let same: boolean = false;

  // see if billing and contact match if this is an update
  if (isUpdate) {
    const contactAddress: { [key: string]: unknown } = {
      address: formData.contactAddress,
      addressField2: formData.contactAddressField2,
      addressField3: formData.contactAddressField3,
      city: formData.contactCity,
      state: formData.contactState,
      postCode: formData.contactPostCode,
      country: formData.contactCountry,
    };

    const billingAddress: { [key: string]: unknown } = {
      address: formData.billingAddress,
      addressField2: formData.billingAddressField2,
      addressField3: formData.billingAddressField3,
      city: formData.billingCity,
      state: formData.billingState,
      postCode: formData.billingPostCode,
      country: formData.billingCountry,
    };

    const keys = Object.keys(contactAddress);

    same = keys.every((key) => contactAddress[key] === billingAddress[key]);
  }

  // we are submitting the form data to the context on click off of the form component
  // each click on a tab or outside of the component should submit
  const componentRef = useRef<HTMLDivElement | null>(null);

  const {
    setValue, // set value of a form field
    handleSubmit,
    getValues, // get values of a form field
    resetField, //reset individual form field
    control, // based on schema
    formState: { errors },
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

  // see if all address fields match
  function matchAddress(address: unknown[], billingAddress: unknown[]) {
    if (address.length !== billingAddress.length) return false;

    const match = address.every((element, index) => {
      return element === billingAddress[index];
    });
    return match;
  }

  function setBillingAddress() {
    const mailingAddress = getValues([
      'Address',
      'Address Line 2',
      'Address Line 3',
      'City',
      'State',
      'Zip',
      'Country',
    ]);

    const billingAddress = getValues([
      'Billing Address',
      'Billing Address Line 2',
      'Billing Address Line 3',
      'Billing City',
      'Billing State',
      'Billing Zip',
      'Billing Country',
    ]);
    // if values of addresses are not the same
    if (!matchAddress(mailingAddress, billingAddress)) {
      // set them
      setValue('Billing Address', mailingAddress[0]);
      setValue('Billing Address Line 2', mailingAddress[1]);
      setValue('Billing Address Line 3', mailingAddress[2]);
      setValue('Billing City', mailingAddress[3]);
      setValue('Billing State', mailingAddress[4]);
      setValue('Billing Zip', mailingAddress[5]);
      setValue('Billing Country', mailingAddress[6]);
    } else {
      // clear them when uncheck box
      resetField('Billing Address');
      resetField('Billing Address Line 2');
      resetField('Billing Address Line 3');
      resetField('Billing City');
      resetField('Billing State');
      resetField('Billing Zip');
      resetField('Billing Country');
    }
    // need to rerender the component to show any updated values
    setRerender(!rerender);
  }

  // submit the values to the context
  const onSubmit = useCallback(
    async (customer: Customer) => {
      saveFormValues(customer);
    },
    [saveFormValues]
  );

  // if there's an update, we have to use the map to get the correct field values
  useEffect(() => {
    if (isUpdate) {
      // populate form with data from context
      Object.keys(customerFieldMap).forEach((formField) => {
        setValue(
          formField as keyof Customer,
          formData[customerFieldMap[formField]]
        );
      });
    }
  }, [formData, setValue, isUpdate]);

  // keep fields populated when switching tabs
  useEffect(() => {
    if (formData) {
      // populate form with data from context
      Object.keys(formData).forEach((formField) => {
        setValue(formField as keyof Customer, formData[formField]);
      });
    }
  }, [formData, setValue]);

  // clicking outside this element will submit form to the context
  // unless we're clicking a cancel button
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if ((event.target as HTMLElement).id === 'cancel') {
        return;
      } else if (
        componentRef.current &&
        !componentRef.current.contains(event.target as Node)
      ) {
        // validate and submit
        handleSubmit(onSubmit)();
      }
    },

    [handleSubmit, onSubmit]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

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
          <div className="flex flex-col gap-5 xl:flex-row">
            <div className="flex flex-col w-full xl:w-1/2">
              <SelectInput
                control={control}
                name="Status"
                options={customerStatus}
                required={true}
              />

              <TextInput
                control={control}
                name="Contact Name"
                required={true}
              />

              <TextInput control={control} name="Telephone" required={true} />

              <TextInput control={control} name="Toll Free" />
            </div>
            <div className="flex flex-col w-full xl:w-1/2">
              <TextInput
                control={control}
                name="Company Name"
                required={true}
              />

              <TextInput control={control} name="Secondary Contact Name" />

              <TextInput
                control={control}
                name="Contact Email"
                required={true}
              />

              <TextInput control={control} name="Fax" />
            </div>
          </div>

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
            checked={isUpdate ? same : false}
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

          <div className="flex flex-col gap-5 xl:flex-row">
            <div className="flex flex-col w-full xl:w-1/2">
              <TextInput
                control={control}
                name="Billing Telephone"
                required={true}
              />
            </div>
            <div className="flex flex-col w-full xl:w-1/2">
              <TextInput
                control={control}
                name="Billing Email"
                required={true}
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
      </form>
    </div>
  );
};

export default CustomerDetails;
