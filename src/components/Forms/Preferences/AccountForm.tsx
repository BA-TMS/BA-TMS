'use client';

import { useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInput from '@/components/UI_Elements/Form/TextInput';
import SelectInput from '@/components/UI_Elements/Form/SelectInput';
import { ModalContext } from '@/context/modalContext';
import {
  getAccountPreferences,
  updateAccountPreferences,
} from '@/lib/dbActions';

type AccountPreferencesResponse = {
  companyName?: string;
  primaryContactName?: string;
  telephone?: string;
  tollFree?: string;
  fei?: string;
  currency?: string;
  dateFormat?: string;
  timeFormat?: string;
  calendarFormat?: string;
};

const schema = yup.object({
  'Company Name': yup.string(),
  'Primary Contact Name': yup.string(),
  Telephone: yup
    .string()
    .matches(/^\d{10}$/, 'Must use valid phone number xxx-xxx-xxxx'),
  'Toll Free': yup
    .string()
    .matches(/^\d{10}$/, 'Must use valid phone number xxx-xxx-xxxx'),
  'FEI Number': yup.string(),
  Currency: yup.string(),
  'Date Format': yup.string(),
  'Time Format': yup.string(),
  'Calendar Format': yup.string(),
});

type AccountPreferences = yup.InferType<typeof schema>;

const AccountForm = () => {
  const {
    handleSubmit,
    setError,
    reset,
    control,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<AccountPreferences>({
    defaultValues: async () => {
      const prefs =
        ((await getAccountPreferences()) as AccountPreferencesResponse) ?? {};

      return {
        'Company Name': prefs.companyName ?? '',
        'Primary Contact Name': prefs.primaryContactName ?? '',
        Telephone: prefs.telephone ?? '',
        'Toll Free': prefs.tollFree ?? '',
        'FEI Number': prefs.fei ?? '',
        Currency: prefs.currency ?? '',
        'Date Format': prefs.dateFormat ?? '',
        'Time Format': prefs.timeFormat ?? '',
        'Calendar Format': prefs.calendarFormat ?? '',
      };
    },

    resolver: yupResolver(schema),
  });

  const { toggleOpen } = useContext(ModalContext);

  const onSubmit = async (data: AccountPreferences) => {
    console.log(data);
    try {
      await updateAccountPreferences({
        companyName: data['Company Name'] ?? '',
        primaryContactName: data['Primary Contact Name'] ?? '',
        telephone: data['Telephone'] ?? '',
        tollFree: data['Toll Free'] ?? '',
        fei: data['FEI Number'] ?? '',
        currency: data['Currency'] ?? '',
        dateFormat: data['Date Format'] ?? '',
        timeFormat: data['Time Format'] ?? '',
        calendarFormat: data['Calendar Format'] ?? '',
        id: '',
        mileageSystem: '',
        printSetting: '',
      });
      console.log('account preferences updated successfully');
      toggleOpen();
    } catch (error) {
      console.log('Error saving:', error);
      setError('root', { message: 'Error saving' });
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
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
  }, [isSubmitSuccessful, reset]);

  return (
    <div className="flex flex-col gap-9">
      <div className="rounded-xs border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-full max-w-xl mx-auto overflow-y-auto max-h-screen">
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
              options={[
                { label: 'American Dollars', value: 'USD' },
                { label: 'Canadian Dollars', value: 'CAD' },
              ]}
            />
            <SelectInput
              control={control}
              name="Date Format"
              options={[{ label: 'm/d/Y', value: 'm/d/Y' }]}
            />
            <SelectInput
              control={control}
              name="Time Format"
              options={[
                { label: '24 Hour (Military)', value: '24h' },
                { label: '12 Hour', value: '12h' },
              ]}
            />
            <SelectInput
              control={control}
              name="Calendar Format"
              options={[{ label: 'Yearly', value: 'yearly' }]}
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
            <button className="rounded-sm bg-primary p-3 font-medium text-gray hover:bg-opacity-80">
              MANAGE COMPANY LOGO
            </button>
            {errors.root && (
              <p className="mb-5 text-danger">{errors.root.message}</p>
            )}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-1/4 rounded-sm bg-primary p-3 font-medium text-gray hover:bg-opacity-80"
              >
                {isSubmitting ? 'Saving' : 'Save'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountForm;
