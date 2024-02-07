'use client';

import { useForm, type SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import TextInput from './TextInput';

const consigneeSchema = yup.object({
  'Consignee Name': yup.string().required('Consignee Name is required'),
  Address: yup.string().required('Address is required'),
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

export type Consignee = yup.InferType<typeof consigneeSchema>;

export const FormComponent = (props: Consignee) => {
  const {
    handleSubmit,
    clearErrors, // will we need to clear errors?
    reset, // for resetting form
    control, // seems based on schema
    formState: { errors, isSubmitting }, // errors for the errors in validation, isSubmitting is boolean when form is submitting
  } = useForm<Consignee>({
    defaultValues: {
      'Consignee Name': '',
      Address: '',
    },
    resolver: yupResolver(consigneeSchema),
  });

  const onSubmit = (data: Consignee) => {
    console.log(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        control={control} // can not figure out type error here
        name="Consignee Name" // needs to match schema
      />
      <TextInput control={control} name="Address" />
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-1/4 rounded bg-primary p-3 font-medium text-gray"
        >
          {isSubmitting ? 'Submitting' : 'Add'}
        </button>
        <button
          type="button"
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
