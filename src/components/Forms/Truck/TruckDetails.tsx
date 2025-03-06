'use client';

import React, { useEffect, useContext, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInput from '@ui/Form/TextInput';
import SelectInput from '@ui/Form/SelectInput';
import DateSelect from '@/components/UI_Elements/Form/DateSelect';
import Button from '@/components/UI_Elements/Buttons/Button';
import { status, truckTypes } from '@/components/Forms/data/details';
import { ModalContext } from '@/context/modalContext';
import { useRouter, usePathname } from 'next/navigation';
import { truckDataMap } from '@/types/truckTypes';

const truckSchema = yup.object({
  Status: yup.string().required('Status is required'),

  'Truck Number': yup.string().required('Truck Number is required'),
  'License Plate': yup.string().nullable(),
  'Plate Expiry': yup.date().nullable(),
  'Inspection Expiry': yup.date().nullable(),
  Type: yup.string().nullable(),
  Ownership: yup.string().nullable(),

  Notes: yup.string().max(250, 'Must be under 250 characters').nullable(),
});

type Truck = yup.InferType<typeof truckSchema>;

export const TruckDetails = () => {
  const router = useRouter();

  const pathname = usePathname();
  const segment = pathname.includes('add-truck') ? 'add-truck' : 'update-truck';

  const { formData, saveFormValues } = useContext(ModalContext);

  const isUpdate = formData !== null && formData['id'];

  const {
    setValue,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Truck>({
    defaultValues: {
      Status: '',
      'Truck Number': '',
      'License Plate': '',
      'Plate Expiry': undefined,
      'Inspection Expiry': undefined,
      Type: '',
      Ownership: '',
      Notes: '',
    },
    resolver: yupResolver(truckSchema),
  });

  // submit the values to the context
  const onSubmit = useCallback(
    (truck: Truck) => {
      saveFormValues(truck);
      reset();
      router.push(`/trucks/${segment}/ifta`);
    },
    [saveFormValues, router, segment, reset]
  );

  // if there's an update
  useEffect(() => {
    if (isUpdate) {
      Object.keys(truckDataMap).forEach((formField) => {
        setValue(
          formField as keyof Truck,
          formData[truckDataMap[formField]]
            ? formData[truckDataMap[formField]]
            : ''
        );
      });
    }
  }, [formData, setValue, isUpdate]);

  // keep fields populated when going back
  useEffect(() => {
    if (formData) {
      Object.keys(formData).forEach((formField) => {
        setValue(formField as keyof Truck, formData[formField]);
      });
    }
  }, [formData, setValue]);

  return (
    <div className="flex flex-col h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-between flex-grow"
      >
        <p className="mt-3.5 mb-5 body2 text-grey-800 dark:text-white">
          Set Truck Details
        </p>

        <div className="flex-grow">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="w-full md:w-1/3">
              <TextInput
                control={control}
                name="Truck Number"
                required={true}
              />
            </div>
            <div className="w-full md:w-1/3">
              <TextInput control={control} name="License Plate" />
            </div>
            <div className="w-full md:w-1/3">
              <SelectInput
                control={control}
                name="Status"
                options={status}
                required={true}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 md:flex-row">
            <div className="w-full md:w-1/2">
              <DateSelect
                control={control}
                name="Plate Expiry"
                required={false}
              />
            </div>
            <div className="w-full md:w-1/2">
              <DateSelect
                control={control}
                name="Inspection Expiry"
                required={false}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 md:flex-row">
            <div className="w-full md:w-1/2">
              <SelectInput control={control} name="Type" options={truckTypes} />
            </div>
            <div className="w-full md:w-1/2">
              <SelectInput
                control={control}
                name="Ownership"
                options={[
                  { 'Company Truck': 'Company Truck' },
                  { 'Owner/ Operator': 'Owner/ Operator' },
                ]}
              />
            </div>
          </div>

          <TextInput control={control} name="Notes" isTextArea={true} />
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
                router.push('/trucks');
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

export default TruckDetails;
