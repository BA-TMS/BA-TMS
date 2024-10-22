'use client';

import React, { useEffect, useState, useContext } from 'react';
import Button from '../../UI_Elements/buttons/Button';
import { ModalContext } from '@/Context/modalContext';
import { createCarrier } from '@/store/slices/carrierSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import DataDisplay from '@/components/UI_Elements/Display/DataDisplay';
import AddressDisplay from '@/components/UI_Elements/Display/AddressDisplay';
import { useRouter } from 'next/navigation';
import { CarrierData } from '@/types/carrierTypes';

// this component submits form data from the context to database using redux

// simplify submission process- do we need to validate?

// on submit- add carrier using redux, submit insurance data to db
// i don't think insurance data needs to be stored in redux

export const CarrierForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  const { formData, saveFormValues } = useContext(ModalContext);
  console.log('CARRIER FORM DATA', formData);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  const onSubmit = async (carrier: CarrierData) => {
    setIsSubmitting(true);
    setError(''); // clear previous errors
  };

  // in the event of an update
  // we're goung to have to check what kind of id this is (carrier or carrier insurance)
  useEffect(() => {
    if (formData !== null && formData['id']) {
      setIsUpdate(true);
    }
  }, [formData]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        <p className="my-3.5 body2 text-grey-800 dark:text-white">
          Confirm Carrier Details
        </p>

        <div className="mt-5 flex flex-col gap-5 xl:flex-row">
          <div className=" w-full">
            <DataDisplay title="Carrier Name" text={formData['Carrier Name']} />
          </div>
          <div className="w-full md:w-1/3">
            <DataDisplay title="Status" text={formData['Status']} />
          </div>
        </div>

        <div className="flex flex-col gap-5 xl:flex-row">
          <div className="flex flex-col w-full xl:w-1/2">
            <DataDisplay title="Contact Name" text={formData['Contact Name']} />
          </div>

          <div className="flex flex-col w-full xl:w-1/2">
            <DataDisplay
              title="Contact Email"
              text={formData['Contact Email']}
            />
          </div>
        </div>

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

        <div className="flex flex-col gap-5 xl:flex-row">
          <div className="flex flex-col self-center w-full">
            <DataDisplay
              title="Payment Terms"
              text={formData['Payment Terms']}
            />
            <DataDisplay
              title="Docket Number"
              text={
                formData['Docket Number Type']
                  ? formData['Docket Number Type'] +
                    ' ' +
                    formData['Docket Number']
                  : ''
              }
            />
            <DataDisplay title="DOT ID#" text={formData['DOT ID#']} />
          </div>

          <div className="flex flex-col self-center w-full">
            <DataDisplay title="URS #" text={formData['URS #']} />
            <DataDisplay title="Tax ID#" text={formData['Tax ID#']} />

            <DataDisplay title="Factoring Company" text={''} />
          </div>
        </div>

        <div className="flex flex-col self-center w-full">
          <AddressDisplay
            title={'Address'}
            addressLine1={formData['Address']}
            addressLine2={formData['Address Line 2']}
            addressLine3={formData['Address Line 3']}
            city={formData['City']}
            state={formData['State']}
            zip={formData['Zip']}
            country={formData['Country']}
          />
        </div>

        <div className="flex flex-col gap-5 xl:flex-row">
          <div className="flex flex-col w-full xl:w-1/2">
            <DataDisplay
              title="FMCSA Insurance Company"
              text={formData['FMCSA Insurance Company']}
            />
          </div>

          <div className="flex flex-col w-full xl:w-1/2">
            <DataDisplay
              title="FMCSA Policy #"
              text={formData['FMCSA Policy #']}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <div className="w-full md:w-1/3">
            <DataDisplay title="FMCSA Type" text={formData['FMCSA Type']} />
          </div>
          <div className="w-full md:w-1/3">
            <DataDisplay
              title="FMCSA Coverage $"
              text={formData['FMCSA Coverage $']}
            />
          </div>
          <div className="w-full md:w-1/3">
            <DataDisplay
              title="FMCSA Expiration Date"
              text={formData['FMCSA Expiration Date']}
            />
          </div>
        </div>

        {/* Liability Insurance */}
        <div className="mt-5 flex flex-col gap-5 xl:flex-row">
          <div className="flex flex-col w-full xl:w-1/2">
            <DataDisplay
              title="Liability Insurance Company"
              text={formData['Liability Insurance Company']}
            />
          </div>

          <div className="flex flex-col w-full xl:w-1/2">
            <DataDisplay
              title="Liability Policy #"
              text={formData['Liability Policy #']}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <div className="w-full md:w-1/3">
            <DataDisplay
              title="Liability Contact"
              text={formData['Liability Contact']}
            />
          </div>
          <div className="w-full md:w-1/3">
            <DataDisplay
              title="Liability Telephone"
              text={formData['Liability Telephone']}
            />
          </div>
          <div className="w-full md:w-1/3">
            <DataDisplay
              title="Liability Expiration Date"
              text={formData['Liability Expiration Date']}
            />
          </div>
        </div>

        {/* Auto Insurance */}
        <div className="mt-5 flex flex-col gap-5 xl:flex-row">
          <div className="flex flex-col w-full xl:w-1/2">
            <DataDisplay
              title="Auto Insurance Company"
              text={formData['Auto Insurance Company']}
            />
          </div>

          <div className="flex flex-col w-full xl:w-1/2">
            <DataDisplay
              title="Auto Policy #"
              text={formData['Auto Policy #']}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <div className="w-full md:w-1/3">
            <DataDisplay title="Auto Contact" text={formData['Auto Contact']} />
          </div>
          <div className="w-full md:w-1/3">
            <DataDisplay
              title="Auto Telephone"
              text={formData['Auto Telephone']}
            />
          </div>
          <div className="w-full md:w-1/3">
            <DataDisplay
              title="Auto Expiration Date"
              text={formData['Auto Expiration Date']}
            />
          </div>
        </div>

        {/* Cargo Company */}
        <div className="mt-5 flex flex-col gap-5 xl:flex-row">
          <div className="flex flex-col w-full xl:w-1/2">
            <DataDisplay
              title="Cargo Company"
              text={formData['Cargo Company']}
            />
          </div>

          <div className="flex flex-col w-full xl:w-1/2">
            <DataDisplay
              title="Cargo Policy #"
              text={formData['Cargo Policy #']}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <div className="w-full md:w-1/3">
            <DataDisplay
              title="Cargo Contact"
              text={formData['Cargo Contact']}
            />
          </div>
          <div className="w-full md:w-1/3">
            <DataDisplay
              title="Cargo Telephone"
              text={formData['Cargo Telephone']}
            />
          </div>
          <div className="w-full md:w-1/3">
            <DataDisplay title="Cargo WSIB #" text={formData['Cargo WSIB #']} />
          </div>
          <div className="w-full md:w-1/3">
            <DataDisplay
              title="Cargo Expiration"
              text={formData['Cargo Expiration Date']}
            />
          </div>
        </div>

        <DataDisplay title="Notes" text={formData['Notes']} />

        <div className="py-3.5 gap-2 border-t border-grey-300 dark:border-grey-700 flex justify-between sticky bottom-0 bg-white dark:bg-grey-900 z-10">
          {error && (
            <div className="min-h-5 mr-2 self-center">
              <p className="caption mb-1 text-error-dark">{error}</p>
            </div>
          )}
          <Button
            id="cancel"
            type="button"
            disabled={isSubmitting}
            onClick={() => {
              const cancel = confirm('Cancel this entry?');
              if (cancel) {
                saveFormValues({}, true); // clears context values
                router.push('/customers');
              } else return;
            }}
            variant="outline"
            intent="default"
          >
            Cancel
          </Button>

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
                console.log('SUBMITTING');
                // onSubmit(formData as CarrierData);
                saveFormValues({}, true); // Reset form data after submission
                router.push('/carriers');
              }}
            >
              {isSubmitting ? 'Submitting...' : isUpdate ? 'Update' : 'Add'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarrierForm;
