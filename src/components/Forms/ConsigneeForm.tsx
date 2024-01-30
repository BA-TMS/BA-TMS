'use client';

import { useState } from 'react';
import { addConsignee } from '@/lib/dbActions';
import { usStates } from '@/assets/data/states';

import * as yup from 'yup';
import { ConsigneeFormDataState } from '@/types/formTypes';

// action- used for processing form, calls a function to run on the server to get/post data to backend

type Event = React.ChangeEvent<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>;

export default function ConsigneeForm() {
  const [formData, setFormData] = useState<ConsigneeFormDataState>({
    consigneeName: '',
    address: '',
    country: '',
    state: '',
    city: '',
    zip: '',
    contactName: '',
    phone: '',
    email: '',
    notes: '',
  });

  // yup schema object for validation
  let consigneeSchema = yup.object({
    consigneeName: yup.string().required('Please enter consignee name'),
    address: yup.string().required('Please enter consignee address'),
    country: yup.string().required('Please enter Country'),
    state: yup.string().required('Please enter State'),
    city: yup.string().required('Please enter City'),
    zip: yup.string().required('Please enter Zip/ Postal Code'),
    contactName: yup.string().required('Please enter consignee contact name'),
    phone: yup
      .string()
      .matches(/^\d{3}-\d{3}-\d{4}$/) // how do we want to do phone format?
      .required('Please enter contact phone'),
    email: yup.string().email().required('Please enter contact email'),
    notes: yup.string(),
  });

  const handleChange = (event: Event): void => {
    const fieldName: string = event.target.name;
    const fieldValue: string = event.target.value;
    if (fieldName !== '') {
      setFormData((prevState) => ({
        ...prevState,
        [fieldName]: fieldValue,
      }));
    }
  };

  const cancelForm = (event: React.FormEvent<HTMLButtonElement>): void => {
    event.preventDefault(); // do we need?

    setFormData((prevState) => ({
      ...prevState,
      consigneeName: '',
      address: '',
      country: '',
      state: '',
      city: '',
      zip: '',
      contactName: '',
      phone: '',
      email: '',
      notes: '',
    }));
  };

  const submitForm = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // yup validation
    consigneeSchema
      .validate(formData)
      .then((valid) => console.log('form data valid', valid))
      .catch((error) => {
        console.log(error);
      });

    // add to database
    // addConsignee(formData);
    setFormData((prevState) => ({
      ...prevState,
      consigneeName: '',
      address: '',
      country: '',
      state: '',
      city: '',
      zip: '',
      contactName: '',
      phone: '',
      email: '',
      notes: '',
    }));
  };

  return (
    <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              New Consignee
            </h3>
          </div>
          <form action={''} onSubmit={submitForm}>
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Consignee Name
                </label>
                <input
                  type="text"
                  name="consigneeName"
                  placeholder="Consignee Name"
                  value={formData.consigneeName}
                  onChange={handleChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Consignee Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Country
                  </label>
                  {/* need to fix the dropdown symbol here */}
                  <select
                    name="country"
                    onChange={handleChange}
                    value={formData.country}
                    className="relative z-20 w-full rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >
                    {/* how many country options should we have? Also phone codes */}
                    <option>Select Country</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    State
                  </label>
                  <select
                    name="state"
                    onChange={handleChange}
                    value={formData.state}
                    className="relative z-20 w-full rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >
                    <option value="">Select State</option>
                    {usStates &&
                      usStates.map((state, index) => (
                        <option key={index + 1} value={`${state.name}`}>
                          {`${state.name}`}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Postal/ Zip
                  </label>
                  <input
                    type="text"
                    name="zip"
                    placeholder="Postal/ Zip"
                    value={formData.zip}
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Contact Name
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    placeholder="Contact Name"
                    value={formData.contactName}
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Email <span className="text-meta-1">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Contact Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block text-black dark:text-white">
                  Notes
                </label>
                <textarea
                  rows={6}
                  name="notes"
                  placeholder="Notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="w-1/4 rounded bg-primary p-3 font-medium text-gray"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={cancelForm}
                  className="rounded bg-red p-3 font-medium text-gray ml-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
