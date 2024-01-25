'use client'
import { ReactNode, useState } from 'react';
// import "primereact/resources/themes/lara-light-indigo/theme.css";

// TESTING
import Input from '../../../../components/Settings-General/Input';
import Form, { type FormHandle } from '../../../../components/Settings-General/Form';
import Button from '../../../../components/Settings-General/Button';
import { useRef } from 'react';




const ImageUpload = () => {
  return (
    <div className="overflow-hidden relative z-0 py-20 px-6 leading-6 text-center text-gray-800 bg-white rounded-2xl shadow">
      <div className="text-center">
        <div
          role="presentation"
          tabIndex={0}
          className="flex overflow-hidden relative justify-center items-center m-auto w-32 h-32 text-gray-800 border border-dashed cursor-pointer border-zinc-200 rounded-full"
        >
          <input
            accept="image/*"
            type="file"
            tabIndex={-1}
            className="hidden font-sans text-sm whitespace-pre cursor-default"
          />
          <div
            className="flex absolute flex-col justify-center items-center w-32 h-32 text-gray-400 bg-gray-100 rounded-full z-10 transition-opacity duration-200"
          >
            <svg
              aria-hidden="true"
              role="img"
              className="mb-2 w-6 h-6"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M3 8c0 .55.45 1 1 1s1-.45 1-1V6h2c.55 0 1-.45 1-1s-.45-1-1-1H5V2c0-.55-.45-1-1-1s-1 .45-1 1v2H1c-.55 0-1 .45-1 1s.45 1 1 1h2z"
              ></path>
              <circle cx="13" cy="14" r="3" fill="currentColor"></circle>
              <path
                fill="currentColor"
                d="M21 6h-3.17l-1.24-1.35A1.99 1.99 0 0 0 15.12 4h-6.4c.17.3.28.63.28 1c0 1.1-.9 2-2 2H6v1c0 1.1-.9 2-2 2c-.37 0-.7-.11-1-.28V20c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2m-8 13c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5s-2.24 5-5 5"
              ></path>
            </svg>
            <span className="font-sans text-xs font-normal leading-normal">Upload photo</span>
          </div>
        </div>
        <span className="block mx-auto mt-4 mb-0 font-sans text-xs font-normal leading-normal text-gray-500">
          Allowed*.jpeg, *.jpg, *.png, *.gif<br className="leading-4" />
          Max size of 3.1 MB
        </span>
      </div>
    </div>
  );
};








const SettingsPage = () => {
    const customers = [
        { code: 'string', address: 'string', city: 'string', zip: 'string', state: 'string', phoneNumber: "string" }
    ];

    // Need a ref that we connect to our custom component.
    const customForm = useRef<FormHandle>(null);

    function handleSave(data: unknown) {
        // Convince TypeScript that we know what the data is.
        const extractedData = data as {
          code: string;
          address: string;
          country: string;
          state: string;
          city: string;
          zip: string;
          name: string;
          email:string;
          phoneNumber: string
        };
        console.log(extractedData);
        customForm.current?.clear(); // Current could be null, so add a ?.
    
        // Add new ID to the new customer and put them at the end of the list.
        // First, convert the last value of 'code' into an int, add 1, then turn it
        // back into a string, then set that as the new ID for the newest customer.
        extractedData.code = String(parseInt(customers[customers.length - 1].code) + 1);
        customers.push(extractedData);
      }


    return (
      <div className="flex">
        <ImageUpload />
        <div id="input-box">
          <Form onSave={handleSave} ref={customForm}>
            <Input type="text" label="Address" id="address" />

            <div className="flex-container">
              <div className="flex-child">
                <Input type="text" label="Country" id="country" />
              </div>
              <div className="flex-child">
                <Input type="text" label="State" id="state" />
              </div>
            </div>

            <div className="flex-container">
              <div className="flex-child">
                <Input type="text" label="City" id="city" />
              </div>
              <div className="flex-child">
                <Input type="text" label="Postal/Zip" id="zip" />
              </div>
            </div>

            <div className="flex-container">
              <div className="flex-child">
                <Input type="text" label="Name" id="name" />
              </div>
              <div className="flex-child">
                <Input type="email" label="Email" id="email" />
              </div>
            </div>

            <Input type="tel" label="Phone number" id="phoneNumber" />
            <p>
              <Button>Save Changes</Button>
            </p>
          </Form>
        </div>
      </div>
)};

export default SettingsPage;






