'use client';

import { useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInput from '../UI_Elements/Form/TextInput';
import SelectInput from '../UI_Elements/Form/SelectInput';
import DateSelect from '../UI_Elements/Form/DateSelect';
import { status, trailers } from './data/details';
import { ModalContext } from '@/context/modalContext';
import { addTrailer } from '@/lib/dbActions';

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

export const TrailerForm = () => {
  const {
    handleSubmit,
    setError,
    reset,
    control,
    formState: { errors, isSubmitting, isSubmitSuccessful },
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

  const { toggleOpen } = useContext(ModalContext);

  const onSubmit = async (data: Trailer) => {
    console.log(data);
    try {
      await addTrailer({ trailer: data });
      console.log('Trailer added successfully');
      toggleOpen();
    } catch (error) {
      console.log('Error submitting form:', error);
      setError('root', { message: 'Error Submitting Form - Please try Again' });
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        'Trailer Type': '',
        'License Plate': '',
        'Plate Expiry': undefined,
        'Inspection Expiry': undefined,
        Status: '',
        Notes: '',
      });
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div className="flex flex-col gap-9">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-full max-w-xl mx-auto overflow-y-auto max-h-screen">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            New Trailer
          </h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6.5">
            <TextInput control={control} name="License Plate" required={true} />
            <div className=" flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <DateSelect
                  control={control}
                  name="Plate Expiry"
                  required={true}
                />
                <SelectInput
                  control={control}
                  options={trailers}
                  name="Trailer Type"
                />
              </div>
              <div className="w-full xl:w-1/2">
                <DateSelect
                  control={control}
                  name="Inspection Expiry"
                  required={true}
                />
                <SelectInput
                  control={control}
                  options={status}
                  name="Status"
                  required={true}
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

export default TrailerForm;
