'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { addShipper } from '../../lib/dbActions'; // Adjust the path as necessary

interface ShipperFormProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
}

// Define your schema outside the component to avoid re-creation on each render
const shipperSchema = yup.object({
  name: yup.string().required('Name is required'),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  addressAddOn: yup.string(),
  postCountry: yup.string().required('Country is required'),
  postCode: yup.string().required('Postal code is required'),
  telCountry: yup.string().required('Telephone country code is required'),
  telephone: yup.string().required('Telephone is required'),
}).required();

const ShipperForm: React.FC<ShipperFormProps> = ({ modalOpen, setModalOpen }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(shipperSchema),
  });

  const onSubmit = async (data: any) => {
    // Attempt to parse telCountry to an integer
    const telCountryInt = parseInt(data.telCountry, 10);
    
    // Check if the parsing was successful and telCountry is a valid integer
    // This code was added to ensure telCountry is correctly formatted as an integer
    const formattedData = {
      ...data,
      telCountry: !isNaN(telCountryInt) ? telCountryInt : null, // Fallback to null if not a valid integer
    };

    await addShipper({ shipper: formattedData });
    setModalOpen(false);
    reset(); // Reset form fields after submission
  };

  return (
    <div>
      <button
        onClick={() => setModalOpen(!modalOpen)}
        className="rounded-md bg-primary py-3 px-9 font-medium text-white"
      >
        Add user
      </button>
      {modalOpen && (
        <div
          className="fixed top-0 left-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5 overflow-y-auto"
        >
          <div
            className="w-full max-w-screen-md rounded-lg bg-white py-8 px-8 text-left dark:bg-boxdark md:py-10 md:px-17.5 overflow-y-auto max-h-[90vh]"
          >
            <div className="border-b border-stroke px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white text-center">
                Shipper Form
              </h3>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="p-6.5">
                {/* Example for Name field */}
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Name
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    placeholder="Enter name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {errors.name && <p>{errors.name.message}</p>}
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Address
                  </label>
                  <input
                    {...register('address')}
                    type="text"
                    placeholder="Enter address"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {errors.address && <p>{errors.address.message}</p>}
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    City
                  </label>
                  <input
                    {...register('city')}
                    type="text"
                    placeholder="Enter city"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {errors.city && <p>{errors.city.message}</p>}
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    State
                  </label>
                  <input
                    {...register('state')}
                    type="text"
                    placeholder="Enter state"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {errors.state && <p>{errors.state.message}</p>}
                </div>
                {/* Additional fields as per the consignee form structure */}
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Country
                  </label>
                  <input
                    {...register('postCountry')}
                    type="text"
                    placeholder="Enter country"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {errors.postCountry && <p>{errors.postCountry.message}</p>}
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Postal Code
                  </label>
                  <input
                    {...register('postCode')}
                    type="text"
                    placeholder="Enter postal code"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {errors.postCode && <p>{errors.postCode.message}</p>}
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Telephone Country Code
                  </label>
                  <input
                    {...register('telCountry')}
                    type="text"
                    placeholder="Enter telephone country code"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {errors.telCountry && <p>{errors.telCountry.message}</p>}
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Telephone
                  </label>
                  <input
                    {...register('telephone')}
                    type="text"
                    placeholder="Enter telephone number"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {errors.telephone && <p>{errors.telephone.message}</p>}
                </div>
                <div className="flex w-full justify-between space-x-2">
                  <button 
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="flex w-1/2 justify-center rounded bg-red p-3 font-medium text-gray"
                  >
                    Close
                  </button>
                  <button type="submit" className="flex w-1/2 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-80">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShipperForm;

