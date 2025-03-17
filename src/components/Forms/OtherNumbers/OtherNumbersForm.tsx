'use client';

import React, { useEffect, useContext, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInput from '@ui/Form/TextInput';
import SelectInput from '@ui/Form/SelectInput';
import Button from '@/components/UI_Elements/Buttons/Button';
import { status } from '@/components/Forms/data/details';
import { ModalContext } from '@/context/modalContext';
import { useRouter, usePathname } from 'next/navigation';
import CheckBox from '@/components/UI_Elements/Form/CheckBox';
import { otherNumDataMap } from '@/types/otherNumTypes';

const otherNumsSchema = yup.object({
  Status: yup.string(),
  Name: yup.string().required('Name is required'),
  dispatch: yup.boolean(),
});

type OtherNums = yup.InferType<typeof otherNumsSchema>;

export const OtherNumbersForm = () => {
  const router = useRouter();

  const pathname = usePathname();
  const segment = pathname.includes('add-number')
    ? 'add-number'
    : 'update-number';

  const { formData, saveFormValues } = useContext(ModalContext);
  console.log('form data', formData);

  const isUpdate = formData !== null && formData['id'];

  const {
    setValue,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<OtherNums>({
    defaultValues: {
      Status: undefined,
      Name: '',
      dispatch: undefined, // check this?
    },
    resolver: yupResolver(otherNumsSchema),
  });

  const handleCheckbox = () => {
    if (isUpdate) {
      saveFormValues({ ...formData, dispatch: true });
    } else {
      formData.dispatch === true
        ? (formData.dispatch = false)
        : (formData.dispatch = true);
    }
    console.log('checkbox', formData.dispatch);
  };

  // submit the values to the context
  const onSubmit = useCallback(
    (otherNum: OtherNums) => {
      saveFormValues(otherNum);
      reset();
      router.push(`/other-numbers/${segment}/review`);
    },
    [saveFormValues, router, segment, reset]
  );

  // if there's an update
  useEffect(() => {
    if (isUpdate) {
      Object.keys(otherNumDataMap).forEach((formField) => {
        setValue(
          formField as keyof OtherNums,
          formData[otherNumDataMap[formField]]
            ? formData[otherNumDataMap[formField]]
            : ''
        );
      });
    }
  }, [formData, setValue, isUpdate]);

  // keep fields populated when going back
  useEffect(() => {
    if (formData) {
      Object.keys(formData).forEach((formField) => {
        setValue(formField as keyof OtherNums, formData[formField]);
      });
    }
  }, [formData, setValue]);

  return (
    <div className="flex flex-col h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-between flex-grow"
      >
        <p className="mt-3.5 mb-5 body2 text-grey-800 dark:text-white">
          Set Other Number
        </p>

        <div className="flex-grow">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="w-full md:w-1/2">
              <TextInput control={control} name="Name" required={true} />
            </div>

            <div className="w-full md:w-1/2">
              <SelectInput control={control} name="Status" options={status} />
            </div>
          </div>

          <CheckBox
            id={'dispatch'}
            onChange={handleCheckbox}
            label="Add to Dispatch Board"
            checked={isUpdate ? formData.dispatch : false}
          />
        </div>

        <div className="min-h-5">
          {errors.root && (
            <p className="caption mb-1 text-error-dark">
              {errors.root.message}
            </p>
          )}
        </div>

        <div className="py-3.5 gap-2 border-t border-grey-300 dark:border-grey-700 flex justify-between bottom-0 bg-white dark:bg-grey-900 z-10">
          <Button
            type="button"
            variant="outline"
            intent="default"
            disabled={isSubmitting}
            onClick={() => {
              const cancel = confirm('Cancel this entry?');
              if (cancel) {
                saveFormValues({}, true); // clears context values
                router.push('/other-numbers');
              } else return;
            }}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            Next
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OtherNumbersForm;
