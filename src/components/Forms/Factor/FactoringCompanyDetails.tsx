'use client';

import React, { useEffect, useContext, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInput from '@ui/Form/TextInput';
import SelectInput from '@ui/Form/SelectInput';
import Button from '@/components/UI_Elements/Buttons/Button';
import { paymentTerms, status } from '@/components/Forms/data/details';
import { ModalContext } from '@/context/modalContext';
import { useRouter, usePathname } from 'next/navigation';
import { usStates } from '../data/states';
import { factorDataMap } from '@/types/factorTypes';

const factoringSchema = yup.object({
  Status: yup.string().required('Must enter Status'),
  'Factor Name': yup.string().required('Factoring Company Name is required'),

  Address: yup.string().required('Address is required'),
  'Address Line 2': yup.string(),
  City: yup.string().required('City is required '),
  State: yup.string().required('State is required '),
  Zip: yup
    .string()
    .matches(/^\d{5}$/, 'Zip must be 5 digits')
    .required('Zip Code is required '),
  Country: yup.string().required('Country is required'),

  'Primary Contact': yup.string(),
  Telephone: yup
    .string()
    .matches(/^\d{10}$/, 'Must use valid phone number')
    .required('Contact phone number required'),
  'Toll Free': yup
    .string()
    .nullable()
    .notRequired() // field is optional
    .matches(/^\d{10}$/, {
      // match regex if not empty string
      message: 'Must use valid phone number',
      excludeEmptyString: true,
    }),
  Email: yup.string(),
  'Secondary Contact': yup.string(),
  'Secondary Telephone': yup
    .string()
    .nullable()
    .notRequired() // field is optional
    .matches(/^\d{10}$/, {
      // match regex if not empty string
      message: 'Must use valid phone number',
      excludeEmptyString: true,
    }),

  Currency: yup.string(),
  'Payment Terms': yup.string(),
  'Tax ID#': yup.string(),

  Notes: yup.string().max(250, 'Must be under 250 characters'),
});

type FactoringCompany = yup.InferType<typeof factoringSchema>;

export const FactoringCompanyForm: React.FC = () => {
  const router = useRouter();

  const pathname = usePathname();
  const segment = pathname.includes('add-factor')
    ? 'add-factor'
    : 'update-factor';

  const { formData, saveFormValues } = useContext(ModalContext);

  const isUpdate = formData !== null && formData['id'];

  const {
    setValue,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FactoringCompany>({
    defaultValues: {
      Status: '',
      'Factor Name': '',

      Address: '',
      'Address Line 2': '',
      City: '',
      State: '',
      Zip: '',
      Country: '',

      'Primary Contact': '',
      Telephone: '',
      'Toll Free': '',
      Email: '',
      'Secondary Contact': '',
      'Secondary Telephone': '',

      Currency: '',
      'Payment Terms': '',
      'Tax ID#': '',

      Notes: '',
    },
    resolver: yupResolver(factoringSchema),
  });

  // submit the values to the context
  const onSubmit = useCallback(
    (factor: FactoringCompany) => {
      saveFormValues(factor);
      reset();
      router.push(`/factors/${segment}/review`);
    },
    [saveFormValues, router, segment, reset]
  );

  // if there's an update
  useEffect(() => {
    if (isUpdate) {
      Object.keys(factorDataMap).forEach((formField) => {
        setValue(
          formField as keyof FactoringCompany,
          formData[factorDataMap[formField]]
            ? formData[factorDataMap[formField]]
            : ''
        );
      });
    }
  }, [formData, setValue, isUpdate]);

  // keep fields populated when going back
  useEffect(() => {
    if (formData) {
      Object.keys(formData).forEach((formField) => {
        setValue(formField as keyof FactoringCompany, formData[formField]);
      });
    }
  }, [formData, setValue]);

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-between grow"
      >
        <p className="mt-3.5 mb-5 body2 text-grey-800 dark:text-white">
          Set Factoring Company Details
        </p>

        <div className="grow">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="w-full md:w-1/4">
              <SelectInput
                control={control}
                name="Status"
                options={status}
                required={true}
              />
            </div>

            <div className="flex flex-col w-full">
              <TextInput control={control} name="Factor Name" required={true} />
            </div>
          </div>

          <div className="w-full">
            <TextInput control={control} name="Address" required={true} />
          </div>

          <div className="w-full">
            <TextInput control={control} name="Address Line 2" />
          </div>

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
              <TextInput control={control} name="Primary Contact" />
            </div>

            <div className="flex flex-col w-full xl:w-1/2">
              <TextInput control={control} name="Telephone" required={true} />
            </div>
          </div>

          <div className="flex flex-col gap-5 xl:flex-row">
            <div className="flex flex-col w-full xl:w-1/2">
              <TextInput control={control} name="Toll Free" />
            </div>

            <div className="flex flex-col w-full xl:w-1/2">
              <TextInput control={control} name="Email" />
            </div>
          </div>

          <div className="flex flex-col gap-5 xl:flex-row">
            <div className="flex flex-col w-full xl:w-1/2">
              <TextInput control={control} name="Secondary Contact" />
            </div>

            <div className="flex flex-col w-full xl:w-1/2">
              <TextInput control={control} name="Secondary Telephone" />
            </div>
          </div>

          <div className="flex flex-col gap-5 xl:flex-row">
            <div className="flex flex-col w-full xl:w-1/3">
              <SelectInput
                control={control}
                name="Currency"
                options={[{ USD: 'USD' }, { CAD: 'CAD' }]}
              />
            </div>

            <div className="flex flex-col w-full xl:w-1/3">
              <SelectInput
                control={control}
                name="Payment Terms"
                options={paymentTerms}
              />
            </div>

            <div className="flex flex-col w-full xl:w-1/3">
              <TextInput control={control} name="Tax ID#" />
            </div>
          </div>

          <div className="flex flex-col w-full">
            <TextInput control={control} name="Notes" isTextArea={true} />
          </div>
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
                router.push('/factors');
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

export default FactoringCompanyForm;
