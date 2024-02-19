'use client';

import { useState, useEffect, useContext } from 'react';
import { ModalContext } from '@/Context/modalContext';
import FormModal from '../Modals/FormModal';
import DriverForm from '../Forms/DriverForm';

export default function Driver() {
  const { isOpen, toggleOpen } = useContext(ModalContext);

  const handleClick = () => {
    toggleOpen();
    console.log('button clicked', isOpen);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <button
        onClick={handleClick}
        className="float-right rounded-md bg-primary py-3 px-9 font-medium text-white hover:bg-opacity-80"
      >
        Add Driver
      </button>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base leading-6 text-gray-900">Drivers</h1>
          <p className="mt-2 text-md text-gray-700">
            A list of all the driver information.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <FormModal>
            <DriverForm />
          </FormModal>
        </div>
      </div>
    </div>
  );
}
