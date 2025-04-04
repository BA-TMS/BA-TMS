'use client';

import React, { useEffect, useContext, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInput from '@ui/Form/TextInput';
import SelectInput from '@ui/Form/SelectInput';
import DateSelect from '@/components/UI_Elements/Form/DateSelect';
import Button from '@/components/UI_Elements/buttons/Button';
import { trailerStatus, trailers } from '@/components/Forms/data/details';
import { ModalContext } from '@/context/modalContext';
import { useRouter, usePathname } from 'next/navigation';
import { trailerDataMap } from '@/types/trailerTypes';

const trailerSchema = yup.object({
  'Trailer Type': yup.string(),
  'License Plate': yup.string().required('License Plate is required'),
  'Plate Expiry': yup
    .date()
    .nullable()
    .required('Plate Expiry is required')
    .typeError('Invalid Date'),
  'Inspection Expiry': yup
    .date()
    .nullable()
    .required('Inspection Expiry is required')
    .typeError('Invalid Date'),
  Status: yup.string().required('Status is required'),
  Notes: yup.string().max(250, 'Must be under 250 characters'),
});

type Trailer = yup.InferType<typeof trailerSchema>;

export const TrailerDetails = () => {
  const router = useRouter();

  const pathname = usePathname();
  const segment = pathname.includes('add-trailer')
    ? 'add-trailer'
    : 'update-trailer';

  const { formData, saveFormValues } = useContext(ModalContext);

  const isUpdate = formData !== null && formData['id'];

  const {
    setValue,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Trailer>({
    defaultValues: {
      'Trailer Type': '',
      'License Plate': '',
      'Plate Expiry': undefined,
      'Inspection Expiry': undefined,
      Status: '',
      Notes: '',
    },
    resolver: yupResolver(trailerSchema),
  });

  // submit the values to the context
  const onSubmit = useCallback(
    (trailer: Trailer) => {
      saveFormValues(trailer);
      reset();
      router.push(`/trailers/${segment}/review`);
    },
    [saveFormValues, router, segment, reset]
  );

  // if there's an update
  useEffect(() => {
    if (isUpdate) {
      Object.keys(trailerDataMap).forEach((formField) => {
        setValue(
          formField as keyof Trailer,
          formData[trailerDataMap[formField]]
            ? formData[trailerDataMap[formField]]
            : ''
        );
      });
    }
  }, [formData, setValue, isUpdate]);

  // keep fields populated when going back
  useEffect(() => {
    if (formData) {
      Object.keys(formData).forEach((formField) => {
        setValue(formField as keyof Trailer, formData[formField]);
      });
    }
  }, [formData, setValue]);

  return (
    <div className="flex flex-col h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-between grow"
      >
        <p className="mt-3.5 mb-5 body2 text-grey-800 dark:text-white">
          Set Trailer Details
        </p>

        <div className="grow">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="w-full md:w-1/3">
              <SelectInput
                control={control}
                name="Type"
                options={trailers}
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
                options={trailerStatus}
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
                router.push('/trailers');
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

export default TrailerDetails;
