'use client';

import { useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInput from '../UI_Elements/Form/TextInput';
import DynamicSelect from '../UI_Elements/Form/DynamicSelect';
import { ModalContext } from '@/context/modalContext';
import {
  getCarriers,
  getConsignees,
  getCustomers,
  getDrivers,
  getOrganizations,
  getShippers,
} from '@/lib/dbActions';
import DateSelect from '../UI_Elements/Form/DateSelect';
import Button from '../UI_Elements/Buttons/Button';
import SelectInput from '../UI_Elements/Form/SelectInput';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { createLoad, updateLoad, setError } from '@/store/slices/loadSlice';
import { LoadFormData } from '@/types/loadTypes';
import { useRouter } from 'next/navigation';

// this component handles form validation and submission with react-hook-form and yup

const status = [
  { Open: 'OPEN' },
  { Covered: 'COVERED' },
  { Dispatched: 'DISPATCHED' },
  { Loading: 'LOADING' },
  { 'On Route': 'ON_ROUTE' },
  { Unloading: 'UNLOADING' },
  { Delivered: 'DELIVERED' },
  { 'Needs Review': 'NEEDS_REVIEW' },
  { Claim: 'CLAIM' },
];

const loadSchema = yup.object({
  Owner: yup.string().required('Enter owner for this load'),
  Status: yup.string(),
  'Load Number': yup.string().required('Enter load number for your records'), // do we need a max number of characters?
  'Pay Order Number': yup.string().required('Enter PO number for your records'), // do we need a max number of characters?
  Customer: yup.string().required('Enter customer for load'),
  Driver: yup.string().nullable(),
  Carrier: yup.string().nullable(),
  Shipper: yup.string().nullable(),
  Consignee: yup.string().nullable(),
  'Ship Date': yup.date().nullable(),
  'Received Date': yup.date().nullable(),
});

type Load = yup.InferType<typeof loadSchema>;

export const LoadForm = () => {
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  // use extra reducers for error handling
  const errorState = useSelector((state: RootState) => state.loads.error);

  const { formData, saveFormValues } = useContext(ModalContext);

  const isUpdate = formData !== null && formData['id'];

  // action to update the error state
  const handleError = (error: string) => {
    dispatch(setError(error));
  };

  const {
    setValue,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Load>({
    defaultValues: {
      'Load Number': '',
      'Pay Order Number': '',
      'Ship Date': undefined,
      'Received Date': undefined,
    },
    resolver: yupResolver(loadSchema),
  });

  // populate with existing data when updating
  useEffect(() => {
    if (isUpdate) {
      setValue('Owner', formData['ownerId']);
      setValue('Status', formData['status']);
      setValue('Load Number', formData['loadNum']);
      setValue('Pay Order Number', formData['payOrderNum']);
      setValue('Customer', formData['customerId']);
      setValue('Driver', formData['driverId']);
      setValue('Carrier', formData['carrierId']);
      setValue('Shipper', formData['originId']);
      setValue('Consignee', formData['destId']);
      setValue('Ship Date', formData['shipDate']);
      setValue('Received Date', formData['deliveryDate']);
    }
  }, [formData, setValue, isUpdate]);

  // Form submission handler
  // react-hook-form submission handler expects a type of Load as determined by yup schema
  // casting type in the dispatch actions because dispatch actions expects different types
  // this data becomes different type at other points in the process so this should be safe

  const onSubmit = async (load: Load) => {
    if (!isUpdate) {
      try {
        await dispatch(createLoad(load as unknown as LoadFormData)).unwrap();
        reset(); // update form to default values
        router.push('/dispatch');
      } catch (error) {
        console.error('Error creating load:', error);
      }
    } else {
      try {
        await dispatch(
          updateLoad({
            id: formData['id'],
            updatedLoad: load as unknown as LoadFormData,
          })
        ).unwrap();
        saveFormValues({}, true); // clear context
        reset(); // update form to default values
        router.push('/dispatch');
      } catch (error) {
        console.error('Error updating load:', error); // error returned from the slice
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-between"
    >
      <p className="mt-3.5 mb-5 body2 text-grey-800 dark:text-white">
        Set load details
      </p>
      <div>
        <DynamicSelect
          control={control}
          name="Owner"
          required={true}
          dbaction={getOrganizations}
          nameKey="orgName"
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
              nameKey="companyName"
              required={true}
              dbaction={getCustomers}
            />

            <DateSelect control={control} name="Ship Date" required={false} />
          </div>

          <div className="flex flex-col w-full xl:w-1/2">
            <DynamicSelect
              control={control}
              name="Carrier"
              required={false}
              dbaction={getCarriers}
            />

            <DynamicSelect
              control={control}
              name="Driver"
              required={false}
              dbaction={getDrivers} // fix when creating drivers page
            />

            <DynamicSelect
              control={control}
              name="Shipper"
              required={false}
              dbaction={getShippers} // fix when creating shippers page
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
              handleError('');
              router.push('/dispatch');
            } else return;
          }}
        >
          Cancel
        </Button>

        {errorState && ( // errors coming from redux toolkit
          <div className="min-h-5 mr-2 self-center">
            <p className="caption mb-1 text-error-dark">{errorState}</p>
          </div>
        )}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting' : isUpdate ? 'Update' : 'Add'}
        </Button>
      </div>
    </form>
  );
};

export default LoadForm;
