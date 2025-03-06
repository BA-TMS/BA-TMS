'use client';

import React, { useEffect, useContext, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInput from '@ui/Form/TextInput';
import SelectInput from '@ui/Form/SelectInput';
import DateSelect from '@/components/UI_Elements/Form/DateSelect';
import CheckBox from '@/components/UI_Elements/Form/CheckBox';
import Button from '@/components/UI_Elements/Buttons/Button';
import { ModalContext } from '@/context/modalContext';
import { useRouter, usePathname } from 'next/navigation';
import { usStates } from '../data/states';
import { truckDataMap } from '@/types/truckTypes';

const truckSchema = yup.object({
  Mileage: yup.string().nullable(),
  Axels: yup.string().nullable(),
  'Fuel Type': yup.string().nullable(),
  Year: yup.string().nullable(),
  'Start Date': yup.date().nullable(),
  'Deactivation Date': yup.date().nullable(),
  IFTA: yup.boolean().nullable(),
  'Registered State': yup.string().nullable(),
  Weight: yup.string().nullable(),
  VIN: yup.string().nullable(),
  'DOT Expiry': yup.date().nullable(),
});

type Truck = yup.InferType<typeof truckSchema>;

export const TruckIFTAForm = () => {
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
      Mileage: '',
      Axels: '',
      'Fuel Type': '',
      Year: '',
      'Start Date': undefined,
      'Deactivation Date': undefined,
      IFTA: undefined,
      'Registered State': '',
      Weight: '',
      VIN: '',
      'DOT Expiry': undefined,
    },
    resolver: yupResolver(truckSchema),
  });

  // submit the values to the context
  const onSubmit = useCallback(
    (truck: Truck) => {
      saveFormValues(truck);
      reset();
      router.push(`/trucks/${segment}/review`);
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

  const handleCheckbox = () => {
    if (isUpdate) {
      // we are copying a consignee during an update
      saveFormValues({ ...formData, IFTA: true });
    } else {
      formData.IFTA === true ? (formData.IFTA = false) : (formData.IFTA = true);
    }
  };

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
            <div className="w-full md:w-1/4">
              <TextInput control={control} name="Mileage" />
            </div>
            <div className="w-full md:w-1/4">
              <TextInput control={control} name="Axels" />
            </div>
            <div className="w-full md:w-1/4">
              <TextInput control={control} name="Year" />
            </div>
            <div className="w-full md:w-1/4">
              <SelectInput
                control={control}
                name="Fuel Type"
                options={[{ Diesel: 'Diesel' }]}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 md:flex-row">
            <div className="w-full md:w-1/2">
              <DateSelect
                control={control}
                name="Start Date"
                required={false}
              />
            </div>
            <div className="w-full md:w-1/2">
              <DateSelect
                control={control}
                name="Deactivation Date"
                required={false}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 md:flex-row">
            <div className="w-full md:w-1/4">
              <SelectInput
                control={control}
                name="Registered State"
                options={usStates}
              />
            </div>
            <div className="w-full md:w-1/4">
              <TextInput control={control} name="Weight" />
            </div>
            <div className="w-full md:w-1/4">
              <TextInput control={control} name="VIN" />
            </div>
            <div className="w-full md:w-1/4">
              <DateSelect
                control={control}
                name="DOT Expiry"
                required={false}
              />
            </div>
          </div>

          <div className="flex gap-2 align-baseline">
            <CheckBox
              id={'ifta'}
              label={'IFTA'}
              onChange={handleCheckbox}
              checked={false}
            />
            <p className="body2 text-grey-800 dark:text-white">
              Include this truck for IFTA?
            </p>
          </div>
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

export default TruckIFTAForm;
