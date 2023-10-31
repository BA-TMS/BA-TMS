'use client';

import { useState } from 'react';
import Button from './button';
import Table from './table';
import { FormData } from '@/types';

// with more time, modal could be a separate component
// get buttons to look better

// array of states for dropdown
const states: string[] = [
  'Alabama',
  'Alaska',
  'American Samoa',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'District of Columbia',
  'Federated States of Micronesia',
  'Florida',
  'Georgia',
  'Guam',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Marshall Islands',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Northern Mariana Islands',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Palau',
  'Pennsylvania',
  'Puerto Rico',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virgin Island',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
];

export default function Form() {
  // state
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    city: '',
    state: '',
    zip: '',
  });

  function handleClick(): void {
    const firstNameInput = document.getElementById(
      'grid-first-name'
    ) as HTMLInputElement;
    const lastNameInput = document.getElementById(
      'grid-last-name'
    ) as HTMLInputElement;
    const cityInput = document.getElementById('grid-city') as HTMLInputElement;
    const stateElement = document.getElementById(
      'grid-state'
    ) as HTMLSelectElement;
    const zipInput = document.getElementById('grid-zip') as HTMLInputElement;

    const firstName: string = firstNameInput.value.trim();
    const lastName: string = lastNameInput.value.trim();
    const city: string = cityInput.value.trim();
    const state: string =
      stateElement.options[stateElement.selectedIndex].value;
    const zip: string = zipInput.value.trim();

    // do not submit if all fields are not filled
    if (firstName && lastName && city && state && zip) {
      setFormData({
        firstName,
        lastName,
        city,
        state,
        zip,
      });

      // clear input fields
      firstNameInput.value = '';
      lastNameInput.value = '';
      cityInput.value = '';
      zipInput.value = '';
    } else {
      alert('Please fill out all the required fields.');
    }
  }

  // handling modal functionality
  const [openModal, setOpenModal] = useState(false);

  function showModal(): void {
    setOpenModal(openModal ? false : true);
    console.log(openModal);
  }

  return (
    <div className="flex flex-col content-center items-center">
      <form className="w-full max-w-lg border border-blue-300 p-6 rounded-lg">
        <div className="flex flex-wrap -mx-3 mb-3">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="form-label" htmlFor="grid-first-name">
              First Name
            </label>
            <input
              className="form-input"
              id="grid-first-name"
              type="text"
              placeholder="Jane"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="form-label" htmlFor="grid-last-name">
              Last Name
            </label>
            <input
              className="form-input"
              id="grid-last-name"
              type="text"
              placeholder="Doe"
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="form-label" htmlFor="grid-city">
              City
            </label>
            <input
              className="form-input"
              id="grid-city"
              type="text"
              placeholder="City"
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="form-label" htmlFor="grid-state">
              State
            </label>
            <div className="relative">
              <select className="form-input" id="grid-state">
                <option value="">Select</option>
                {/* map through array of states to populate dropdown with JSX elements */}
                {states.map(
                  (state: string, index: number): JSX.Element => (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  )
                )}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="form-label" htmlFor="grid-zip">
              Zip
            </label>
            <input
              className="form-input"
              id="grid-zip"
              type="text"
              placeholder="90210"
            />
          </div>
        </div>
      </form>
      <Button type="submit" name="Submit" onClick={handleClick}></Button>
      <Button type="button" name="View Table" onClick={showModal}></Button>
      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black bg-opacity-75"
            onClick={showModal}
          ></div>
          <div className="flex flex-col content-center items-center bg-black border border-blue-500 p-6 rounded-lg z-10">
            <h2 className="text-lg font-bold">Secret Customer Data</h2>
            <Table formData={formData} />
            <Button type="button" name="Close" onClick={showModal} />
          </div>
        </div>
      )}
    </div>
  );
}
