'use client';

import React, { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react';
import { addCarrier } from '../../lib/dbActions'; // Adjust the path as necessary

interface ModalOneProps {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const ModalOne: React.FC<ModalOneProps> = ({ modalOpen, setModalOpen }) => {
  const trigger = useRef<any>(null);
  const modal = useRef<any>(null);

  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [addressAddOn, setAddressAddOn] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postCountry, setPostCountry] = useState('');
  const [postCode, setPostCode] = useState('');
  const [telCountryCode, setTelCountryCode] = useState('');
  const [telephone, setTelephone] = useState('');
  const [dotId, setDotId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const carrierData = {
      name: firstName,
      email,
      address,
      addressAddOn,
      city,
      state,
      postCountry,
      zip: postCode,
      telephone,
      telCountry: parseInt(telCountryCode, 10),
      dotId: parseInt(dotId, 10) // Placeholder value for dotId
    };

    await addCarrier({carrier: carrierData});

    setModalOpen(false);
  };

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!modalOpen || keyCode !== 27) return;
      setModalOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div>
      <button
        ref={trigger}
        onClick={() => setModalOpen(!modalOpen)}
        className="rounded-md bg-primary py-3 px-9 font-medium text-white"
      >
        Add user
      </button>
      {modalOpen && (
        <div
          className="fixed top-0 left-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5"
        >
          <div
            ref={modal}
            className="w-full max-w-screen-md rounded-lg bg-white py-8 px-8 text-left dark:bg-boxdark md:py-10 md:px-17.5"
          >
              <div className="border-b border-stroke px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white text-center">
                  User Form
                </h3>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="p-6.5">
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        First name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter first name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>

                    {/* <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Last name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter last name"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div> */}
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Email <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Enter email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Address
                    </label>
                    <input
                      type="text"
                      placeholder="Enter address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Address Add On
                    </label>
                    <input
                      type="text"
                      placeholder="Enter additional address info (optional)"
                      value={addressAddOn}
                      onChange={(e) => setAddressAddOn(e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        City
                      </label>
                      <input
                        type="text"
                        placeholder="Enter city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        State
                      </label>
                      <input
                        type="text"
                        placeholder="Enter state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Post Country
                      </label>
                      <input
                        type="text"
                        placeholder="Enter post country"
                        value={postCountry}
                        onChange={(e) => setPostCountry(e.target.value)}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Post Code
                      </label>
                      <input
                        type="text"
                        placeholder="Enter post code"
                        value={postCode}
                        onChange={(e) => setPostCode(e.target.value)}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Telephone Country Code
                      </label>
                      <input
                        type="number"
                        placeholder="Enter telephone country code"
                        value={telCountryCode}
                        onChange={(e) => setTelCountryCode(e.target.value)}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Telephone
                      </label>
                      <input
                        type="text"
                        placeholder="Enter telephone number"
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      DOT ID
                    </label>
                    <input
                      type="number"
                      placeholder="Enter DOT ID"
                      value={dotId}
                      onChange={(e) => setDotId(e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="flex w-full justify-between space-x-2">
                    <button 
                      onClick={() => setModalOpen(false)}
                      className="flex w-1/2 justify-center rounded bg-red p-3 font-medium text-gray"
                    >
                      Close
                    </button>
                    <button type="submit" className="flex w-1/2 justify-center rounded bg-green p-3 font-medium text-gray bg-green-500">
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

export default ModalOne;
