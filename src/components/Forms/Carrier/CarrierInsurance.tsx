'use client';

import React, { useEffect, useContext, useState, useCallback } from 'react';
import { ModalContext } from '@/Context/modalContext';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInput from '../../UI_Elements/Form/TextInput';
import DateSelect from '@/components/UI_Elements/Form/DateSelect';
import Button from '@/components/UI_Elements/buttons/Button';
import { useRouter, usePathname } from 'next/navigation';

// external carrier insurance
// this component uses yup and react-hook-form to submit form values to a context

const carrierInsuranceSchema = yup.object({
  'Liability Insurance Company': yup.string().nullable(),
  'Liability Policy #': yup.string().nullable(),
  'Liability Expiration Date': yup.date().nullable(),
  'Liability Telephone': yup.string().nullable(),
  'Liability Contact': yup.string().nullable(),

  'Auto Insurance Company': yup.string().nullable(),
  'Auto Policy #': yup.string().nullable(),
  'Auto Expiration Date': yup.date().nullable(),
  'Auto Telephone': yup.string().nullable(),
  'Auto Contact': yup.string().nullable(),

  'Cargo Company': yup.string().nullable(),
  'Cargo Policy #': yup
    .string()

    .nullable(),
  'Cargo Expiration Date': yup.date().nullable(),
  'Cargo Telephone': yup.string().nullable(),
  'Cargo Contact': yup.string().nullable(),
  'Cargo WSIB #': yup.string().nullable(),

  'FMCSA Insurance Company': yup
    .string()
    .required('FMCSA Insurance Company Required'),
  'FMCSA Policy #': yup
    .string()
    .matches(/^\d+$/, 'Must be a number')
    .required('FMCSA Insurance Policy Number Required'),
  'FMCSA Expiration Date': yup.date().nullable(),
  'FMCSA Type': yup.string().required('FMCSA Type Required'),
  'FMCSA Coverage $': yup
    .string()
    .matches(/^\d+$/, 'Must be a number')
    .required('FMCSA Coverage Amount Required'),
  'FMCSA Telephone': yup.string().nullable(),
});

type CarrierInsurance = yup.InferType<typeof carrierInsuranceSchema>;

const CarrierInsuranceForm: React.FC = () => {
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
  } = useForm<CarrierInsurance>({
    defaultValues: {
      'Liability Insurance Company': '',
      'Liability Policy #': '',
      'Liability Expiration Date': undefined,
      'Liability Telephone': '',
      'Liability Contact': '',

      'Auto Insurance Company': '',
      'Auto Policy #': '',
      'Auto Expiration Date': undefined,
      'Auto Telephone': '',
      'Auto Contact': '',

      'Cargo Company': '',
      'Cargo Policy #': '',
      'Cargo Expiration Date': undefined,
      'Cargo Telephone': '',
      'Cargo Contact': '',
      'Cargo WSIB #': '',

      'FMCSA Insurance Company': '',
      'FMCSA Policy #': '',
      'FMCSA Expiration Date': undefined,
      'FMCSA Type': '',
      'FMCSA Coverage $': '',
      'FMCSA Telephone': '',
    },
    resolver: yupResolver(carrierInsuranceSchema),
  });

  // submit the values to the context
  const onSubmit = useCallback(
    async (carrier: CarrierInsurance) => {
      saveFormValues(carrier);
      reset();
      router.push(`/carriers/${segment}/review`);
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
        setValue(formField as keyof CarrierInsurance, formData[formField]);
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
          Set carrier insurance
        </p>

        <div className="flex flex-col gap-5 xl:flex-row">
          <div className="flex flex-col w-full xl:w-1/2">
            <TextInput
              control={control}
              name="FMCSA Insurance Company"
              required={true}
            />
          </div>

          <div className="flex flex-col w-full xl:w-1/2">
            <TextInput
              control={control}
              name="FMCSA Policy #"
              required={true}
            />
          </div>
          <div className="w-full md:w-1/3">
            <TextInput control={control} name="FMCSA Type" required={true} />
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <div className="w-full md:w-1/3">
            <TextInput
              control={control}
              name="FMCSA Coverage $"
              required={true}
            />
          </div>
          <div className="w-full md:w-1/3">
            <TextInput control={control} name="FMCSA Telephone" />
          </div>
          <div className="w-full md:w-1/3">
            <DateSelect control={control} name="FMCSA Expiration Date" />
          </div>
        </div>

        {/* Liability Insurance */}
        <div className="mt-5 flex flex-col gap-5 xl:flex-row">
          <div className="flex flex-col w-full xl:w-1/2">
            <TextInput control={control} name="Liability Insurance Company" />
          </div>

          <div className="flex flex-col w-full xl:w-1/2">
            <TextInput control={control} name="Liability Policy #" />
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <div className="w-full md:w-1/3">
            <TextInput control={control} name="Liability Contact" />
          </div>
          <div className="w-full md:w-1/3">
            <TextInput control={control} name="Liability Telephone" />
          </div>
          <div className="w-full md:w-1/3">
            <DateSelect control={control} name="Liability Expiration Date" />
          </div>
        </div>

        {/* Auto Insurance */}
        <div className="mt-5 flex flex-col gap-5 xl:flex-row">
          <div className="flex flex-col w-full xl:w-1/2">
            <TextInput control={control} name="Auto Insurance Company" />
          </div>

          <div className="flex flex-col w-full xl:w-1/2">
            <TextInput control={control} name="Auto Policy #" />
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <div className="w-full md:w-1/3">
            <TextInput control={control} name="Auto Contact" />
          </div>
          <div className="w-full md:w-1/3">
            <TextInput control={control} name="Auto Telephone" />
          </div>
          <div className="w-full md:w-1/3">
            <DateSelect control={control} name="Auto Expiration Date" />
          </div>
        </div>

        {/* Cargo Company */}
        <div className="mt-5 flex flex-col gap-5 xl:flex-row">
          <div className="flex flex-col w-full xl:w-1/2">
            <TextInput control={control} name="Cargo Company" />
          </div>

          <div className="flex flex-col w-full xl:w-1/2">
            <TextInput control={control} name="Cargo Policy #" />
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <div className="w-full md:w-1/3">
            <TextInput control={control} name="Cargo Contact" />
          </div>
          <div className="w-full md:w-1/3">
            <TextInput control={control} name="Cargo Telephone" />
          </div>
          <div className="w-full md:w-1/3">
            <TextInput control={control} name="Cargo WSIB #" />
          </div>
          <div className="w-full md:w-1/3">
            <DateSelect control={control} name="Cargo Expiration Date" />
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
                router.push('/carriers');
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

export default CarrierInsuranceForm;
