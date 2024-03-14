'use client';

import { useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInput from './UI_Elements/TextInput';
import SelectInput from './UI_Elements/SelectInput';
import { status } from './data/details';
import { ModalContext } from '@/Context/modalContext';

const trailerSchema = yup.object({
  'Trailer Number': yup.string().required('Trailer Number is required'),
  'Trailer Type': yup.string(),
  'License Plate': yup.string(),
  Status: yup.string(),
  Notes: yup.string().max(250, 'Must be under 250 characters'),
});

type Trailer = yup.InferType<typeof trailerSchema>;

export const TrailerForm = () => {
  const {
    handleSubmit,
    setError, // async error handling
    reset, // for resetting form
    control, // based on schema
    formState: { errors, isSubmitting, isSubmitSuccessful }, // boolean values representing form state
  } = useForm<Trailer>({
    defaultValues: {
      'Trailer Number': '',
      'Trailer Type': '',
      'License Plate': '',
      Status: '',
      Notes: '',
    },
    resolver: yupResolver(trailerSchema),
  });

  const { toggleOpen } = useContext(ModalContext);

  const onSubmit = async (data: Trailer) => {
    console.log(data);
    try {
      //   add database integration
      console.log('External Carrier added successfully');
      toggleOpen();
    } catch (error) {
      console.log('Error submitting form:', error);
      setError('root', { message: 'Error Submitting Form - Please try Again' });
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        'Trailer Number': '',
        'Trailer Type': '',
        'License Plate': '',
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
            <TextInput
              control={control}
              name="Trailer Number"
              required={true}
            />

            <TextInput control={control} name="Trailer Type" />
            <TextInput control={control} name="License Plate" />
            <SelectInput control={control} name="Status" options={status} />

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
