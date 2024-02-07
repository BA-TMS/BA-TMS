'use client';

import {
  useForm,
  type SubmitHandler,
  UseControllerProps,
} from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import TextInput from './TextInput';
import SelectInput from './SelectInput';
import { usStates } from '@/assets/data/states';

const consigneeSchema = yup.object({
  'Consignee Name': yup.string().required('Consignee Name is required'),
  Address: yup.string().required('Address is required'),
  Country: yup.string().required('Country is required'),
  State: yup.string().required('State is required '),
  City: yup.string().required('City is required '),
  Zip: yup
    .string()
    .length(5, 'Zip must be 5 characters')
    .required('Zip Code is required '),
  'Contact Name': yup.string().required('Contact Name is required'),
  'Phone Number': yup
    .string()
    .matches(/^[0-9]+$/, 'Must use valid phone number')
    .required('Contact phone number required'),
  Email: yup
    .string()
    .email('Must use a valid email')
    .required('Contact email required'),
  Notes: yup.string().max(250, 'Must be under 250 characters'),
});

type Consignee = yup.InferType<typeof consigneeSchema>;

export const FormComponent = (props: Consignee) => {
  const {
    handleSubmit,
    clearErrors, // will we need to clear errors?
    reset, // for resetting form
    control, // seems based on schema
    formState: { errors, isSubmitting }, // errors for root errors in validation, isSubmitting is boolean when form is submitting
  } = useForm<Consignee>({
    defaultValues: {
      'Consignee Name': '',
      Address: '',
      Country: '',
      State: '',
      City: '',
      Zip: '',
      'Contact Name': '',
      'Phone Number': '',
      Email: '',
      Notes: '',
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
      <TextInput control={control} name="City" />
      <SelectInput control={control} name="State" options={usStates} />
      <TextInput control={control} name="Zip" />
      <TextInput control={control} name="Contact Name" />
      <TextInput control={control} name="Phone Number" />
      <TextInput control={control} name="Email" />
      <TextInput control={control} name="Notes" isTextArea={true} />
      {errors.root && <p className="mt-1 text-danger">{errors.root.message}</p>}
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
