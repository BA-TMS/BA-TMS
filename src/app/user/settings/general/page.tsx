'use client'
import { ReactNode, useState } from 'react';
import "primereact/resources/themes/lara-light-indigo/theme.css";

// TESTING
import Input from '../../../../components/Settings-General/Input';
import Form, { type FormHandle } from '../../../../components/Settings-General/Form';
import Button from '../../../../components/Settings-General/Button';
import { useRef } from 'react';



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
    );
};

export default SettingsPage;