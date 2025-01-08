'use client';

import { useEffect, useContext, useCallback } from 'react';
import { ModalContext } from '@/context/modalContext';
import { UserContext } from '@/context/userContextProvider';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { status } from '../data/details';
import { usStates } from '@/components/Forms/data/states';
import TextInput from '@ui/Form/TextInput';
import DynamicSelect from '@ui/Form/DynamicSelect';
import SelectInput from '@/components/UI_Elements/Form/SelectInput';
import Button from '@/components/UI_Elements/Buttons/Button';
import { getCarriers } from '@/lib/dbActions';
import { useRouter, usePathname } from 'next/navigation';
import { driverDataMap } from '@/types/driverTypes';

// this component uses yup and react-hook-form to submit form values to a context

const driverSchema = yup.object({
  Status: yup.string().required('Must enter Status'),
  Type: yup.string().required('Select driver type'),
  'Driver Name': yup.string().required('Driver Name is required'),
  Telephone: yup.string().required('Telephone is required'),
  Email: yup.string().email('Must use a valid email').nullable(),
  Address: yup.string().nullable(),
  Country: yup.string().required('Country is required'),
  State: yup.string().required('State is required'),
  City: yup.string().required('City is required'),
  Zip: yup
    .string()
    .matches(/^\d{5}$/, 'Zip must be 5 digits')
    .required('Zip Code is required '),
  License: yup.string().nullable(),
  Employer: yup.string().required('Must assign to carrier'),
  Notes: yup.string().max(250, 'Must be under 250 characters').nullable(),
});

type Driver = yup.InferType<typeof driverSchema>;

export const DriverForm = () => {
  const router = useRouter();

  const pathname = usePathname();

  const segment = pathname.includes('add-driver')
    ? 'add-driver'
    : 'update-driver';

  const { formData, saveFormValues } = useContext(ModalContext);

  // orgName because we will need it
  const { user } = useContext(UserContext);
  const orgName = user?.user_metadata.org_name;

  const isUpdate = formData !== null && formData['id'];

  const {
    handleSubmit,
    // setError,
    setValue,
    getValues,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Driver>({
    defaultValues: {
      Status: '',
      Type: '',
      'Driver Name': '',
      Telephone: '',
      Email: '',
      Address: '',
      Country: '',
      State: '',
      City: '',
      Zip: '',
      License: '',
      Employer: '',
      Notes: '',
    },
    resolver: yupResolver(driverSchema),
  });

  // submit the values to the context
  const onSubmit = useCallback(
    (driver: Driver) => {
      // assigning the organization name
      saveFormValues({ orgName: orgName });

      const type = getValues('Type');

      console.log('SUBMITTING DRIVER DETAILS', driver);
      saveFormValues(driver);
      reset();

      // if type is team, add the second driver
      if (type === 'SINGLE') {
        router.push(`/drivers/${segment}/review`);
      } else {
        router.push(`/drivers/${segment}/team`);
      }
    },
    [saveFormValues, router, segment, reset, getValues, orgName]
  );

  // map the fields if is an update
  useEffect(() => {
    if (isUpdate) {
      Object.keys(driverDataMap).forEach((formField) => {
        setValue(formField as keyof Driver, formData[driverDataMap[formField]]);
      });
    }
  }, [formData, setValue, isUpdate]);

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
          Add Driver Details
        </p>

        <div className="flex-grow">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="w-full md:w-1/4">
              <SelectInput
                control={control}
                name="Status"
                options={status}
                required={true}
              />
            </div>
            <div className="w-full md:w-1/4">
              <SelectInput
                control={control}
                name="Type"
                options={[{ Single: 'SINGLE' }, { Team: 'TEAM' }]}
                required={true}
              />
            </div>

            <div className="flex flex-col w-full">
              <TextInput control={control} name="Driver Name" required={true} />
            </div>
          </div>

          <div className="flex flex-col gap-5 xl:flex-row">
            <div className="flex flex-col w-full xl:w-1/2">
              <TextInput control={control} name="Telephone" required={true} />
            </div>

            <div className="flex flex-col w-full xl:w-1/2">
              <TextInput control={control} name="Email" />
            </div>
          </div>

          <div className="w-full">
            <TextInput control={control} name="Address" />
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
              <TextInput control={control} name="License" />
            </div>

            <div className="flex flex-col w-full xl:w-1/2">
              <DynamicSelect
                control={control}
                name="Employer"
                dbaction={getCarriers}
                nameKey="carrierName"
                required={true}
              />
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

          <Button type="submit" disabled={isSubmitting}>
            Next
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DriverForm;
