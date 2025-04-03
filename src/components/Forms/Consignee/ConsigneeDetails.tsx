'use client';

import React, { useEffect, useContext, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInput from '@ui/Form/TextInput';
import SelectInput from '@ui/Form/SelectInput';
import CheckBox from '@/components/UI_Elements/Form/CheckBox';
import Button from '@/components/UI_Elements/buttons/Button';
import { status } from '@/components/Forms/data/details';
import { ModalContext } from '@/context/modalContext';
import { useRouter, usePathname } from 'next/navigation';
import { usStates } from '../data/states';
import { consigneeDataMap } from '@/types/consigneeTypes';

// Define your schema outside the component to avoid re-creation on each render
const consigneeSchema = yup.object({
  Status: yup.string().required('Must enter Status'),
  'Consignee Name': yup.string().required('Consignee Name is required'),

  Address: yup.string(),
  'Address Line 2': yup.string(),
  'Address Line 3': yup.string(),
  City: yup.string().required('City is required '),
  State: yup.string().required('State is required '),
  Zip: yup
    .string()
    .matches(/^\d{5}$/, 'Zip must be 5 digits')
    .required('Zip Code is required '),
  Country: yup.string().required('Country is required'),

  Contact: yup.string(),
  Email: yup.string(),
  Telephone: yup
    .string()
    .nullable()
    .notRequired()
    .matches(/^\d{10}$/, {
      // match regex if not empty string
      message: 'Must use valid phone number',
      excludeEmptyString: true,
    }),
  'Toll Free': yup
    .string()
    .nullable()
    .notRequired()
    .matches(/^\d{10}$/, {
      // match regex if not empty string
      message: 'Must use valid phone number',
      excludeEmptyString: true,
    }),

  'Recieving Hours': yup.string(),
  Appointments: yup.string(),
  Intersections: yup.string(),

  Notes: yup.string().max(250, 'Must be under 250 characters'),
});

type Consignee = yup.InferType<typeof consigneeSchema>;

const ConsigneeDetailsForm: React.FC = () => {
  const router = useRouter();

  const pathname = usePathname();
  const segment = pathname.includes('add-consignee')
    ? 'add-consignee'
    : 'update-consignee';

  const { formData, saveFormValues } = useContext(ModalContext);

  const isUpdate = formData !== null && formData['id'];

  const {
    setValue,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Consignee>({
    defaultValues: {
      Status: '',
      'Consignee Name': '',
      Address: '',
      'Address Line 2': '',
      'Address Line 3': '',
      City: '',
      State: '',
      Zip: '',
      Country: '',
      Contact: '',
      Email: '',
      Telephone: '',
      'Toll Free': '',
      'Recieving Hours': '',
      Appointments: '',
      Intersections: '',
      Notes: '',
    },
    resolver: yupResolver(consigneeSchema),
  });

  // submit the values to the context
  const onSubmit = useCallback(
    (consignee: Consignee) => {
      saveFormValues(consignee);
      reset();
      router.push(`/consignees/${segment}/review`);
    },
    [saveFormValues, router, segment, reset]
  );

  // if there's an update
  useEffect(() => {
    if (isUpdate) {
      Object.keys(consigneeDataMap).forEach((formField) => {
        setValue(
          formField as keyof Consignee,
          formData[consigneeDataMap[formField]]
            ? formData[consigneeDataMap[formField]]
            : ''
        );
      });
    }
  }, [formData, setValue, isUpdate]);

  // keep fields populated when going back
  useEffect(() => {
    if (formData) {
      Object.keys(formData).forEach((formField) => {
        setValue(formField as keyof Consignee, formData[formField]);
      });
    }
  }, [formData, setValue]);

  const handleCheckbox = () => {
    if (isUpdate) {
      // we are copying a consignee during an update
      saveFormValues({ ...formData, shipper: true });
    } else {
      formData.shipper === true
        ? (formData.shipper = false)
        : (formData.shipper = true);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-between grow"
      >
        <p className="mt-3.5 mb-5 body2 text-grey-800 dark:text-white">
          Set Consignee Details
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
              <TextInput
                control={control}
                name="Consignee Name"
                required={true}
              />
            </div>
          </div>

          <CheckBox
            id={'shipper'}
            label={isUpdate ? 'Update as Shipper' : 'Duplicate as Shipper'}
            onChange={handleCheckbox}
            checked={formData.shipper === true}
          />

          <div className="w-full">
            <TextInput control={control} name="Address" />
          </div>

          <div className="w-full">
            <TextInput control={control} name="Address Line 2" />
          </div>

          <div className="w-full">
            <TextInput control={control} name="Address Line 3" />
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
              <TextInput control={control} name="Contact" />
            </div>

            <div className="flex flex-col w-full xl:w-1/2">
              <TextInput control={control} name="Telephone" />
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
            <div className="flex flex-col w-full xl:w-1/3">
              <TextInput control={control} name="Recieving Hours" />
            </div>

            <div className="flex flex-col w-full xl:w-1/3">
              <TextInput control={control} name="Appointments" />
            </div>

            <div className="flex flex-col w-full xl:w-1/3">
              <TextInput control={control} name="Intersections" />
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
                router.push('/consignees');
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

export default ConsigneeDetailsForm;
