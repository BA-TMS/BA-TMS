'use client';

import { useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInput from '../UI_Elements/Form/TextInput';
import DynamicSelect from '../UI_Elements/Form/DynamicSelect';
import { ModalContext } from '@/Context/modalContext';
import {
  addLoad,
  getCarriers,
  getConsignees,
  getCustomers,
  getDrivers,
  getOrganizations,
  getShippers,
} from '@/lib/dbActions';
import DateSelect from '../UI_Elements/Form/DateSelect';
import Button from '../UI_Elements/buttons/Button';
import SelectInput from '../UI_Elements/Form/SelectInput';

const status = [
  { 'On Route': 'ON_ROUTE' },
  { Open: 'OPEN' },
  { Refused: 'REFUSED' },
  { Covered: 'COVERED' },
  { Pending: 'PENDING' },
  { Dispatched: 'DISPATCHED' },
  { '(Un)Loading': 'LOADING_UNLOADING' },
  // { 'In Yard': 'IN_YARD' },
];

const loadSchema = yup.object({
  Owner: yup.string().required('Enter owner for this load'),
  Status: yup.string(),
  'Load Number': yup.string().required('Enter load number for your records'),
  'Pay Order Number': yup.string().required('Enter PO number for your records'),
  Customer: yup.string().required('Enter customer for load'),
  Driver: yup.string(),
  Carrier: yup.string().required('Who will be carrying this load?'),
  Shipper: yup.string(),
  Consignee: yup.string(),
  'Ship Date': yup.date().nullable(),
  'Received Date': yup.date().nullable(),
});

type Load = yup.InferType<typeof loadSchema>;

export const LoadForm = () => {
  const {
    handleSubmit,
    setError,
    reset,
    control,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<Load>({
    defaultValues: {
      'Load Number': '',
      'Pay Order Number': '',
      'Ship Date': undefined,
      'Received Date': undefined,
    },
    resolver: yupResolver(loadSchema),
  });

  const { toggleOpen } = useContext(ModalContext);

  const onSubmit = async (data: Load) => {
    try {
      await addLoad({ load: data });
      console.log('load dispatched successfully');
      toggleOpen();
    } catch (error) {
      console.log('Error submitting form:', error);
      setError('root', { message: 'Error Submitting Form - Please try Again' });
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({});
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <section className="w-full h-full">
      <header className="py-4 px-4.5 border-b border-grey-300 dark:border-grey-700">
        <h6 className="subtitle1 text-grey-800 dark:text-white">New Load</h6>
      </header>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-between"
      >
        <p className="px-4.5 mt-3.5 mb-5 body2 text-grey-800 dark:text-white">
          Set the details
        </p>
        <div className="px-4.5">
          <DynamicSelect
            control={control}
            name="Owner"
            required={true}
            dbaction={getOrganizations}
          />

          <div className="flex flex-col gap-5 xl:flex-row">
            <div className="flex flex-col w-full xl:w-1/2">
              <SelectInput control={control} name="Status" options={status} />

              <TextInput control={control} name="Load Number" required={true} />

              <TextInput
                control={control}
                name="Pay Order Number"
                required={true}
              />

              <DynamicSelect
                control={control}
                name="Customer"
                required={true}
                dbaction={getCustomers}
              />

              <DateSelect control={control} name="Ship Date" required={false} />
            </div>

            <div className="flex flex-col w-full xl:w-1/2">
              <DynamicSelect
                control={control}
                name="Carrier"
                required={true}
                dbaction={getCarriers}
              />

              <DynamicSelect
                control={control}
                name="Driver"
                required={false}
                dbaction={getDrivers}
              />

              <DynamicSelect
                control={control}
                name="Shipper"
                required={false}
                dbaction={getShippers}
              />

              <DynamicSelect
                control={control}
                name="Consignee"
                required={false}
                dbaction={getConsignees}
              />

              <DateSelect
                control={control}
                name="Received Date"
                required={false}
              />
            </div>
          </div>

          <TextInput control={control} name="Notes" isTextArea={true} />
          <div className="min-h-5">
            {errors.root && (
              <p className="caption mb-1 text-error-dark">
                {errors.root.message}
              </p>
            )}
          </div>
        </div>
        <div className="py-3.5 px-4.5 border-t border-grey-300 dark:border-grey-700 flex justify-end gap-2.5">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting' : 'Add'}
          </Button>

          <Button
            type="button"
            disabled={isSubmitting}
            onClick={() => {
              reset();
              toggleOpen();
            }}
            variant="outline"
            intent="default"
          >
            Cancel
          </Button>
        </div>
      </form>
    </section>
  );
};

export default LoadForm;
