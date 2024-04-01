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
  getOrgs,
  getShippers,
} from '@/lib/dbActions';
import DateSelect from '../UI_Elements/Form/DateSelect';

const loadSchema = yup.object({
  Owner: yup.string(),
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
    console.log(data); // see the data
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
    <div className="flex flex-col gap-9">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-full max-w-xl mx-auto overflow-y-auto max-h-screen">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">New Load</h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6.5">
            <DynamicSelect
              control={control}
              name="Owner"
              required={true}
              dbaction={getOrgs}
            />

            <div className=" flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <TextInput
                  control={control}
                  name="Load Number"
                  required={true}
                />
              </div>

              <div className="w-full xl:w-1/2">
                <TextInput
                  control={control}
                  name="Pay Order Number"
                  required={true}
                />
              </div>
            </div>

            <DynamicSelect
              control={control}
              name="Customer"
              required={true}
              dbaction={getCustomers}
            />

            <DynamicSelect
              control={control}
              name="Driver"
              required={false}
              dbaction={getDrivers}
            />

            <DynamicSelect
              control={control}
              name="Carrier"
              required={true}
              dbaction={getCarriers}
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

            <div className=" flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <DateSelect
                  control={control}
                  name="Ship Date"
                  required={false}
                />
              </div>

              <div className="w-full xl:w-1/2">
                <DateSelect
                  control={control}
                  name="Received Date"
                  required={false}
                />
              </div>
            </div>

            <TextInput control={control} name="Notes" isTextArea={true} />
            {errors.root && (
              <p className="mb-5 text-danger">{errors.root.message}</p>
            )}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-1/4 rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-80"
              >
                {isSubmitting ? 'Submitting' : 'Add'}
              </button>
              <button
                type="button"
                onClick={() => {
                  reset();
                  toggleOpen();
                }}
                disabled={isSubmitting}
                className="rounded bg-red p-3 font-medium text-gray ml-2 hover:bg-opacity-80"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoadForm;
