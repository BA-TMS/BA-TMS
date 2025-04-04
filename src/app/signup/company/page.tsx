'use client';

import { useContext, useEffect } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { ModalContext } from '@/context/modalContext';
import TextInput from '@/components/UI_Elements/Form/TextInput';
import SelectInput from '@/components/UI_Elements/Form/SelectInput';
import Button from '@/components/UI_Elements/buttons/Button';
import { useRouter } from 'next/navigation';

const orgSchema = yup.object().shape({
  'Company Name': yup.string().required(),
  Address: yup.string().required(),
  'Address Field 2': yup.string(),
  City: yup.string().required(),
  State: yup.string().required(),
  Zip: yup.string().required(),
  Country: yup.string().required(),
  Telephone: yup.string().required(),
  'Toll Free': yup.string(),
  Fax: yup.string(),
  'Docket Number Type': yup.string().required(),
  'Docket Number': yup.string().required(),
  'DOT ID#': yup.string(),
});

type NewOrg = yup.InferType<typeof orgSchema>;

export default function Signup() {
  const router = useRouter();

  const { formData, saveFormValues } = useContext(ModalContext);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    // setError,
    formState: { errors, isSubmitting },
  } = useForm<NewOrg>({
    defaultValues: {
      'Company Name': '',
      Address: '',
      'Address Field 2': '',
      City: '',
      State: '',
      Zip: '',
      Country: '',
      Telephone: '',
      'Toll Free': '',
      Fax: '',
      'Docket Number Type': '',
      'Docket Number': '',
      'DOT ID#': '',
    },
    resolver: yupResolver(orgSchema),
  });

  const onSubmit = (data: NewOrg) => {
    saveFormValues(data);
    reset(); // update form to default values
    router.push('/signup/user'); // next step
  };

  // keep fields populated when switching tabs or going back
  useEffect(() => {
    if (formData) {
      Object.keys(formData).forEach((formField) => {
        setValue(formField as keyof NewOrg, formData[formField]);
      });
    }
  }, [formData, setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col h-full justify-between"
    >
      <p className="mt-3.5 mb-5 body2 text-grey-800 text-center">
        Enter details about your company
      </p>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="w-full md:w-1/2">
          <TextInput control={control} name="Company Name" required={true} />

          <TextInput control={control} name="Toll Free" />
        </div>
        <div className="w-full md:w-1/2">
          <TextInput control={control} name="Telephone" required={true} />

          <TextInput control={control} name="Fax" />
        </div>
      </div>

      <TextInput control={control} name="Address" required={true} />

      <TextInput control={control} name="Address Field 2" />

      {/* City, State, Zip, Country */}
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="w-full md:w-1/4">
          <TextInput control={control} name="City" required={true} />
        </div>
        <div className="w-full md:w-1/4">
          <TextInput control={control} name="State" required={true} />
        </div>
        <div className="w-full md:w-1/4">
          <TextInput control={control} name="Zip" required={true} />
        </div>
        <div className="w-full md:w-1/4">
          <TextInput control={control} name="Country" required={true} />
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="w-full md:w-1/3">
          <SelectInput
            control={control}
            name="Docket Number Type"
            options={[{ MC: 'MC' }, { FF: 'FF' }]}
          />
        </div>
        <div className="w-full md:w-1/3">
          <TextInput control={control} name="Docket Number" />
        </div>
        <div className="w-full md:w-1/3">
          <TextInput control={control} name="DOT ID#" />
        </div>
      </div>

      {errors.root && (
        <p className="font-public font-normal text-text-sm text-danger text-center mt-2">
          {errors.root.message}
        </p>
      )}

      <div className="py-4 gap-2 border-t border-grey-300 bg-white flex justify-end sticky bottom-0 z-10">
        <Button type="submit" disabled={isSubmitting}>
          Next
        </Button>
      </div>
    </form>
  );
}
