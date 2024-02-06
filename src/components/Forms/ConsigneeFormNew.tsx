'use client';

import { useForm, type SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import TextInput from './Input';

const consigneeSchema = yup.object({
  consigneeName: yup.string().required('Consignee Name is required'),
  // address: yup.string().required('Address is required'),
  // country: yup.string().required('Country is required'),
  // state: yup.string().required('State is required '),
  // city: yup.string().required('City is required '),
  // zip: yup
  //   .string()
  //   .length(5, 'Zip must be 5 characters')
  //   .required('Zip Code is required '),
  // contactName: yup.string().required('Contact Name is required'),
  // phone: yup
  //   .string()
  //   .matches(/^[0-9]+$/, 'Must use valid phone number')
  //   .required('Contact phone number required'),
  // email: yup
  //   .string()
  //   .email('Must use a valid email')
  //   .required('Contact email required'),
  // notes: yup.string().max(250, 'Must be under 250 characters'),
});

type Consignee = yup.InferType<typeof consigneeSchema>;

export const FormComponent = (props: any) => {
  const {
    handleSubmit,
    clearErrors,
    setValue,
    control, // seems based on schema
    formState: { errors, isSubmitting }, // errors for the errors in validation, isSubmitting is boolean when form is submitting
  } = useForm({ resolver: yupResolver(consigneeSchema) });

  const onSubmit = (data: Consignee) => {
    console.log(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        id="consigneeName"
        control={control}
        name="Consignee Name"
        type="text"
        rules={{ required: true }}
      />
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-1/4 rounded bg-primary p-3 font-medium text-gray"
        >
          {isSubmitting ? 'Submitting' : 'Add'}
        </button>
        <button
          type="reset"
          onClick={() => reset()}
          disabled={isSubmitting}
          className="rounded bg-red p-3 font-medium text-gray ml-2"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
