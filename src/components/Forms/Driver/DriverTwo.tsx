'use client';

import { useEffect, useContext, useCallback } from 'react';
import { ModalContext } from '@/context/modalContext';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { usStates } from '@/components/Forms/data/states';
import TextInput from '@ui/Form/TextInput';
import SelectInput from '@/components/UI_Elements/Form/SelectInput';
import Button from '@/components/UI_Elements/Buttons/Button';
import { useRouter, usePathname } from 'next/navigation';

// this component uses yup and react-hook-form to submit form values to a context

const driverSchema = yup.object({
  'Driver Two Name': yup.string().required('Driver Name is required'),
  'Driver Telephone': yup.string().required('Telephone is required'),
  'Driver Email': yup.string().email('Must use a valid email').nullable(),
  'Driver Address': yup.string().nullable(),
  'Driver Country': yup.string().required('Country is required'),
  'Driver State': yup.string().required('State is required'),
  'Driver City': yup.string().required('City is required'),
  'Driver Zip': yup
    .string()
    .matches(/^\d{5}$/, 'Zip must be 5 digits')
    .required('Zip Code is required '),
  'Driver License': yup.string().nullable(),
});

type Driver = yup.InferType<typeof driverSchema>;

export const DriverTwoForm = () => {
  const router = useRouter();

  const pathname = usePathname();

  const segment = pathname.includes('add-driver')
    ? 'add-driver'
    : 'update-driver';

  const { formData, saveFormValues } = useContext(ModalContext);

  // const isUpdate = formData !== null && formData['id'];

  const {
    handleSubmit,
    // setError,
    setValue,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Driver>({
    defaultValues: {
      'Driver Two Name': '',
      'Driver Telephone': '',
      'Driver Email': '',
      'Driver Address': '',
      'Driver Country': '',
      'Driver State': '',
      'Driver City': '',
      'Driver Zip': '',
      'Driver License': '',
    },
    resolver: yupResolver(driverSchema),
  });

  // submit the values to the context
  const onSubmit = useCallback(
    (driver: Driver) => {
      console.log('SUBMITTING DRIVER', driver);
      saveFormValues(driver);
      reset();

      router.push(`/drivers/${segment}/review`);
    },
    [saveFormValues, router, segment, reset]
  );

  // keep fields populated when going back from review page
  useEffect(() => {
    if (formData) {
      Object.keys(formData).forEach((formField) => {
        setValue(formField as keyof Driver, formData[formField]);
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
          Add Second Driver Details
        </p>

        <div className="flex-grow">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex flex-col w-full">
              <TextInput
                control={control}
                name="Driver Two Name"
                required={true}
              />
            </div>

            <div className="flex flex-col w-full">
              <TextInput control={control} name="Driver License" />
            </div>
          </div>

          <div className="flex flex-col gap-5 xl:flex-row">
            <div className="flex flex-col w-full xl:w-1/2">
              <TextInput
                control={control}
                name="Driver Telephone"
                required={true}
              />
            </div>

            <div className="flex flex-col w-full xl:w-1/2">
              <TextInput control={control} name="Driver Email" />
            </div>
          </div>

          <div className="w-full">
            <TextInput control={control} name="Driver Address" />
          </div>

          <div className="flex flex-col gap-4 md:flex-row">
            <div className="w-full md:w-1/4">
              <TextInput control={control} name="Driver City" required={true} />
            </div>
            <div className="w-full md:w-1/4">
              <SelectInput
                control={control}
                name="Driver State"
                options={usStates}
                required={true}
              />
            </div>
            <div className="w-full md:w-1/4">
              <TextInput control={control} name="Driver Zip" required={true} />
            </div>
            <div className="w-full md:w-1/4">
              <TextInput
                control={control}
                name="Driver Country"
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
                router.push('/drivers');
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

export default DriverTwoForm;
