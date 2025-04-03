'use client';

import { useState, useContext } from 'react';
import { ModalContext } from '@/context/modalContext';
import Button from '@/components/UI_Elements/buttons/Button';
import DataDisplay from '@/components/UI_Elements/Display/DataDisplay';
import AddressDisplay from '@/components/UI_Elements/Display/AddressDisplay';
import { useRouter } from 'next/navigation';
import { signUpAdmin } from '../actions';

interface SignUpData {
  'First Name': string;
  'Last Name': string;
  Email: string;
  Password: string;
  'Personal Telephone': string;

  'Company Name': string;
  Address: string;
  'Address Field 2'?: string;
  City: string;
  State: string;
  Zip: string;
  Country: string;
  Telephone: string;
  'Toll Free'?: string;
  Fax?: string;
  'Docket Number Type': string;
  'Docket Number': string;
  'DOT ID#'?: string;
}

// this component handles the actual user sign up auth with supabase

export default function Signup() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const { formData, saveFormValues } = useContext(ModalContext);

  // auth signup
  const onSubmit = async (data: SignUpData) => {
    setIsSubmitting(true);
    setError(null);

    if (!data['Company Name']) {
      setError('Cound not submit data - please try again');
      setIsSubmitting(false);
      return;
    }

    try {
      await signUpAdmin(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
      setIsSubmitting(false);
      return;
    }
    // don't do this?
    setTimeout(() => {
      saveFormValues({}, true);
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="flex flex-col h-full justify-between">
      <p className="mt-3.5 mb-5 body2 text-grey-800 text-center">
        Confirm Details to Finish Sign Up
      </p>

      <DataDisplay title="Company Name" text={formData['Company Name']} />

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="w-full md:w-1/3">
          <DataDisplay title="Telephone" text={formData['Telephone']} />
        </div>
        <div className="w-full md:w-1/3">
          <DataDisplay title="Toll Free" text={formData['Toll Free']} />
        </div>
        <div className="w-full md:w-1/3">
          <DataDisplay title="Fax" text={formData['Fax']} />
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex flex-col self-center w-full">
          <AddressDisplay
            title={'Address'}
            addressLine1={formData['Address']}
            addressLine2={formData['Address Field 2']}
            city={formData['City']}
            state={formData['State']}
            zip={formData['Zip']}
            country={formData['Country']}
          />
        </div>
        <div className="w-full md:w-1/3">
          <DataDisplay
            title="Docket Number"
            text={
              formData['Docket Number Type'] + ' ' + formData['Docket Number']
            }
          />
        </div>
        <div className="w-full md:w-1/3">
          <DataDisplay title="DOT ID#" text={formData['DOT ID#']} />
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="w-full md:w-1/4">
          <DataDisplay title="First Name" text={formData['First Name']} />
        </div>
        <div className="w-full md:w-1/4">
          <DataDisplay title="Last Name" text={formData['Last Name']} />
        </div>
        <div className="w-full md:w-1/4">
          <DataDisplay title="Email" text={formData['Email']} />
        </div>
        <div className="w-full md:w-1/4">
          <DataDisplay
            title="Personal Telephone"
            text={formData['Personal Telephone']}
          />
        </div>
      </div>

      <div className="py-3.5 gap-2 border-t border-grey-300 dark:border-grey-700 flex justify-between sticky bottom-0 bg-white dark:bg-grey-900 z-10">
        <Button
          id="cancel"
          type="button"
          disabled={isSubmitting}
          onClick={() => {
            const cancel = confirm('Cancel Signup?');
            if (cancel) {
              saveFormValues({}, true); // clears context values
              router.push('/'); // this will go to the login page
            } else return;
          }}
          variant="outline"
          intent="default"
        >
          Cancel
        </Button>

        {error && (
          <div className="min-h-5 mr-2 self-center">
            <p className="subtitle mb-1 text-error-dark">{error}</p>
          </div>
        )}

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            intent="success"
            disabled={isSubmitting}
            onClick={() => {
              router.back();
            }}
          >
            Back
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            onClick={() => {
              onSubmit(formData as SignUpData);
            }}
          >
            {isSubmitting ? 'Submitting...' : 'Confirm Sign Up'}
          </Button>
        </div>
      </div>
    </div>
  );
}
