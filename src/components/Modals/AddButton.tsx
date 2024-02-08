'use client';

import React, { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react';

interface ModalOneProps {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const ModalOne: React.FC<ModalOneProps> = ({ modalOpen, setModalOpen }) => {
  const trigger = useRef<any>(null);
  const modal = useRef<any>(null);

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

              {/* Turn form into its own component */}
              <form action="#">
                <div className="p-6.5">
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        First name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter first name"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Last name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter last name"
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
                      placeholder="Enter email address"
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
                    <button className="flex w-1/2 justify-center rounded bg-green p-3 font-medium text-gray bg-green-500">
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
