'use client';

import { useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInput from '@/components/Forms/UI_Elements/TextInput';
import SelectInput from '@/components/Forms/UI_Elements/SelectInput';
import { ModalContext } from '@/Context/modalContext';

const schema = yup.object({
  'Company Name': yup.string(),
  'Primary Contact Name': yup.string(),
  Telephone: yup
    .string()
    .matches(/^\d{3}-\d{3}-\d{4}$/, 'Must use valid phone number xxx-xxx-xxxx'),
  'Toll Free': yup
    .string()
    .matches(/^\d{3}-\d{3}-\d{4}$/, 'Must use valid phone number xxx-xxx-xxxx'),
  'FEI Number': yup.string(),
  Currency: yup.string(),
  'Date Format': yup.string(),
  'Time Format': yup.string(),
  'Calendar Format': yup.string(),
});

type AccountPreferences = yup.InferType<typeof schema>;

export default () => {
  const {
    handleSubmit,
    setError,
    reset,
    control,
    formState: { errors, isSaving, isSaveSuccessful },
  } = useForm<AccountPreferences>({
    defaultValues: {
      'Company Name': '',
      'Primary Contact Name': '',
      Telephone: '',
      'Toll Free': '',
      'FEI Number': '',
      Currency: '',
      'Date Format': '',
      'Time Format': '',
      'Calendar Format': '',
    },
    resolver: yupResolver(schema),
  });

  const { toggleOpen } = useContext(ModalContext);

  const onSubmit = async (data: AccountPreferences) => {
    console.log(data);
    try {
      console.log('account preferences updated successfully');
      toggleOpen();
    } catch (error) {
      console.log('Error saving:', error);
      setError('root', { message: 'Error saving' });
    }
  };

  useEffect(() => {
    if (isSaveSuccessful) {
      reset({
        'Company Name': '',
        'Primary Contact Name': '',
        Telephone: '',
        'Toll Free': '',
        'FEI Number': '',
        Currency: '',
        'Date Format': '',
        'Time Format': '',
        'Calendar Format': '',
      });
    }
  }, [isSaveSuccessful, reset]);

  return (
    <div className="flex flex-col gap-9">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-full max-w-xl mx-auto overflow-y-auto max-h-screen">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Account Preferences
          </h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6.5">
            <TextInput
              control={control}
              name="Company Name" // name always needs to match schema
            />
            <TextInput control={control} name="Primary Contact Name" />
            <TextInput control={control} name="Telephone" />
            <TextInput control={control} name="Toll Free" />
            <TextInput control={control} name="FEI Number" />
            <SelectInput
              control={control}
              name="Currency"
              options={['American Dollars', 'Canadian Dollars']}
            />
            <SelectInput
              control={control}
              name="Date Format"
              options={['m/d/Y']}
            />
            <SelectInput
              control={control}
              name="Time Format"
              options={['24 Hour (Military)', '12 Hour']}
            />
            <SelectInput
              control={control}
              name="Calendar Format"
              options={['Yearly']}
            />
            <div className="flex">
              <div>Mileage System</div>
              <div className="ml-5">
                <input type="radio" />
                <label>ProMiles</label>
                <br />
                <input type="checkbox" />
                <label>Avoid Toll Roads</label>
                <br />
                <input type="checkbox" />
                <label>Open Borders</label>
              </div>
            </div>
            Print Setting
            <input name="print_setting" className="ml-5" type="radio" />
            <label>Show Logo</label>
            <input name="print_setting" className="ml-5" type="radio" />
            <label>Hide Logo</label>
            <br />
            Company Logo
            <button className="rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-80">
              MANAGE COMPANY LOGO
            </button>
            {errors.root && (
              <p className="mb-5 text-danger">{errors.root.message}</p>
            )}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="w-1/4 rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-80"
              >
                {isSaving ? 'Saving' : 'Save'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
