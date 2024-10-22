'use client';

import React, { useEffect, useContext, useState, useCallback } from 'react';
import { ModalContext } from '@/Context/modalContext';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInput from '../../UI_Elements/Form/TextInput';
import SelectInput from '../../UI_Elements/Form/SelectInput';
import DynamicSelect from '@/components/UI_Elements/Form/DynamicSelect';
import { getFactors } from '@/lib/dbActions';
import { usStates } from '@/components/Forms/data/states';
import { status } from '../data/details';
import Button from '@/components/UI_Elements/buttons/Button';
import { useRouter, usePathname } from 'next/navigation';

// external carrier details
// this component uses yup and react-hook-form to submit form values to a context

const carrierDetailsSchema = yup.object({
  Status: yup.string().required('Must enter Carrier Status'),

  'Carrier Name': yup.string().required('Must enter Carrier Name'),
  Address: yup.string().required('Address is required'),
  'Address Line 2': yup.string().nullable(),
  'Address Line 3': yup.string().nullable(),
  City: yup.string().required('City is required'),
  State: yup.string().required('State is required'),
  Zip: yup
    .string()
    .matches(/^\d{5}$/, 'Zip must be 5 digits')
    .required('Zip Code is required '),
  Country: yup.string().required('Must enter Country'),

  'Contact Name': yup.string().required('Must enter Contact Name'),
  'Contact Email': yup
    .string()
    .email('Must use a valid email')
    .required('Contact email required'),
  Telephone: yup.string().required('Must enter Contact Telephone'),
  'Toll Free': yup.string().nullable(),
  Fax: yup.string().nullable(),

  'Payment Terms': yup.string().required('Must enter Payment Terms'),
  'Tax ID#': yup.string().nullable(),
  'Docket Number Type': yup
    .string()
    .required('Please specify type of Docket Number'),
  'Docket Number': yup.string().required('Please enter Docket Number'),
  'URS #': yup.string().nullable(),
  'DOT ID#': yup.string().required('Please enter DOT ID'),
  'Factoring Company': yup.string().nullable(),

  Notes: yup.string().max(250, 'Must be under 250 characters').nullable(),
});

type Carrier = yup.InferType<typeof carrierDetailsSchema>;

const CarrierDetails: React.FC = () => {
  const router = useRouter();

  const pathname = usePathname();
  const segment = pathname.includes('add-carrier')
    ? 'add-carrier'
    : 'update-carrier';

  const { formData, saveFormValues } = useContext(ModalContext);

  //   const isUpdate = formData !== null && formData['id']; // Do we need this?

  const {
    setValue, // set value of a form field
    handleSubmit,
    reset,
    getValues, // get values of a form field
    resetField, //reset individual form field
    control, // based on schema
    formState: { errors, isSubmitting },
  } = useForm<Carrier>({
    defaultValues: {
      Status: '',
      'Carrier Name': '',
      Address: '',
      'Address Line 2': '',
      'Address Line 3': '',
      City: '',
      State: '',
      Zip: '',
      Country: '',

      'Contact Name': '',
      'Contact Email': '',
      Telephone: '',
      'Toll Free': '',
      Fax: '',

      'Payment Terms': '',
      'Tax ID#': '',
      'Docket Number Type': '',
      'Docket Number': '',
      'URS #': '',
      'DOT ID#': '',
      'Factoring Company': '',

      Notes: '',
    },
    resolver: yupResolver(carrierDetailsSchema),
  });

  // submit the values to the context
  const onSubmit = useCallback(
    async (carrier: Carrier) => {
      saveFormValues(carrier);
      reset();
      router.push(`/carriers/${segment}/insurance`);
    },
    [saveFormValues, router, segment, reset]
  );

  // if there's an update, we have to use the map to get the correct field values
  //   useEffect(() => {
  //     if (isUpdate) {
  //       Object.keys(customerFieldMap).forEach((formField) => {
  //         setValue(
  //           formField as keyof Customer,
  //           formData[customerFieldMap[formField]]
  //         );
  //       });
  //     }
  //   }, [formData, setValue, isUpdate]);

  // keep fields populated when switching tabs or going back
  useEffect(() => {
    if (formData) {
      Object.keys(formData).forEach((formField) => {
        setValue(formField as keyof Carrier, formData[formField]);
      });
    }
  }, [formData, setValue]);

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-between"
      >
        <p className="mt-3.5 mb-5 body2 text-grey-800 dark:text-white">
          Set carrier details
        </p>
        <div className="">
          <div className="flex flex-col gap-5 xl:flex-row">
            <div className="flex flex-col w-full xl:w-1/2">
              <TextInput
                control={control}
                name="Carrier Name"
                required={true}
              />

              <TextInput
                control={control}
                name="Contact Name"
                required={true}
              />
            </div>

            <div className="flex flex-col w-full xl:w-1/2">
              <SelectInput
                control={control}
                name="Status"
                options={status}
                required={true}
              />

              <TextInput control={control} name="Telephone" required={true} />
            </div>
          </div>

          {/* email/ fax/ toll free */}
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="w-full md:w-1/3">
              <TextInput
                control={control}
                name="Contact Email"
                required={false}
              />
            </div>
            <div className="w-full md:w-1/3">
              <TextInput control={control} name="Fax" />
            </div>
            <div className="w-full md:w-1/3">
              <TextInput control={control} name="Toll Free" />
            </div>
          </div>

          <TextInput control={control} name="Address" required={true} />
          <TextInput control={control} name="Address Line 2" />
          <TextInput control={control} name="Address Line 3" />

          {/* City, State, Zip, Country */}
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="w-full md:w-1/4">
              <TextInput control={control} name="City" required={true} />
            </div>
            <div className="w-full md:w-1/4">
              <SelectInput
                control={control}
                name="State"
                options={usStates}
                required={true}
              />
            </div>
            <div className="w-full md:w-1/4">
              <TextInput control={control} name="Zip" required={true} />
            </div>
            <div className="w-full md:w-1/4">
              <TextInput control={control} name="Country" required={true} />
            </div>
          </div>

          <div className="flex flex-col gap-5 xl:flex-row">
            <div className="flex flex-col w-full xl:w-1/2">
              <SelectInput
                control={control}
                name="Payment Terms"
                options={status}
                required={true}
              />

              <TextInput control={control} name="Tax ID#" />

              <SelectInput
                control={control}
                name="Docket Number Type"
                options={[{ MC: 'MC' }, { FF: 'FF' }]}
                required={true}
              />
            </div>

            <div className="flex flex-col w-full xl:w-1/2">
              <TextInput control={control} name="URS #" />

              <TextInput control={control} name="DOT ID#" />

              <TextInput
                control={control}
                name="Docket Number"
                required={true}
              />
            </div>
          </div>

          <DynamicSelect
            control={control}
            name="Factoring Company"
            dbaction={getFactors}
          />

          <TextInput control={control} name="Notes" isTextArea={true} />
        </div>

        <div className="min-h-5">
          {errors.root && (
            <p className="caption mb-1 text-error-dark">
              {errors.root.message}
            </p>
          )}
        </div>
        <div className="py-3.5 gap-2 border-t border-grey-300 dark:border-grey-700 flex justify-between sticky bottom-0 bg-white dark:bg-grey-900 z-10">
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
          <Button type="submit" disabled={isSubmitting}>
            Next
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CarrierDetails;
