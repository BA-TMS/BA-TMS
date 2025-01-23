'use client';

import React, { useEffect, useContext, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInput from '@ui/Form/TextInput';
import SelectInput from '@ui/Form/SelectInput';
import Button from '@/components/UI_Elements/Buttons/Button';
import { status } from '@/components/Forms/data/details';
import { ModalContext } from '@/context/modalContext';
import { useRouter, usePathname } from 'next/navigation';

const customsBrokerSchema = yup.object({
  Status: yup.string().required('Must enter Status'),
  'Broker Name': yup.string().required('Broker Name is required'),
  Crossing: yup.string().required('Customs crossing is required'),

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
});

type CustomsBroker = yup.InferType<typeof customsBrokerSchema>;

export const CustomsBrokerDetails: React.FC = () => {
  const router = useRouter();

  const pathname = usePathname();
  const segment = pathname.includes('add-broker')
    ? 'add-broker'
    : 'update-broker';

  const { formData, saveFormValues } = useContext(ModalContext);

  const isUpdate = formData !== null && formData['id'];

  const {
    setValue, // set value of a form field
    handleSubmit,
    reset,
    control, // based on schema
    formState: { errors, isSubmitting },
  } = useForm<CustomsBroker>({
    defaultValues: {
      Status: '',
      'Broker Name': '',
      Crossing: '',
      Telephone: '',
      'Toll Free': '',
    },
    resolver: yupResolver(customsBrokerSchema),
  });

  // submit the values to the context
  const onSubmit = useCallback(
    (broker: CustomsBroker) => {
      console.log('ADDING BROKER', broker);
      saveFormValues(broker);
      reset();
      router.push(`/brokers/${segment}/review`);
    },
    [saveFormValues, router, segment, reset]
  );

  return (
    <div className="flex flex-col h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-between flex-grow"
      >
        <p className="mt-3.5 mb-5 body2 text-grey-800 dark:text-white">
          Set Customs Broker Details
        </p>

        <div className="flex-grow">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="w-full md:w-1/3">
              <TextInput control={control} name="Broker Name" required={true} />
            </div>
            <div className="w-full md:w-1/3">
              <TextInput control={control} name="Crossing" required={true} />
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

          <TextInput control={control} name="Telephone" required={true} />

          <TextInput control={control} name="Toll Free" required={false} />
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
                router.push('/brokers');
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

export default CustomsBrokerDetails;
