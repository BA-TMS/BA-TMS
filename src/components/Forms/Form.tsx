import { useForm, type SubmitHandler } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from './Input';

const FormSchema = yup.object({
  name: yup.string().required('Consignee Name is required'),
  address: yup.string().required('Address is required'),
  country: yup.string().required('Country is required'),
  state: yup.string().required('State is required '),
  city: yup.string().required('City is required '),
  zip: yup
    .string()
    .length(5, 'Zip must be 5 characters')
    .required('Zip Code is required '),
  contactName: yup.string().required('Contact Name is required'),
  phone: yup
    .string()
    .matches(/^[0-9]+$/, 'Must use valid phone number')
    .required('Contact phone number required'),
  email: yup
    .string()
    .email('Must use a valid email')
    .required('Contact email required'),
  notes: yup.string().max(250, 'Must be under 250 characters'),
});

type FormSchema = yup.InferType<typeof FormSchema>;

export const FormComponent = (props: any) => {
  const {
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
    control,
  } = useForm({ resolver: yupResolver(FormSchema) });

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Name"
        controllerProps={{ name: 'name', control }}
        error={errors.name}
        inputProps={{ className: 'w-full', maxLength: 64 }} //optional
        labelProps={{ className: 'w-full' }} //optional
        as="text" //optional (default)
      />
      <Input
        label="Price"
        controllerProps={{ name: 'address', control }}
        error={errors.address}
        inputProps={{
          type: 'string',
        }}
      />
    </form>
  );
};
