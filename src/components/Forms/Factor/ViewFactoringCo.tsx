'use client';

import { useContext } from 'react';
import { ModalContext } from '@/context/modalContext';
import { useRouter } from 'next/navigation';
import { FactorData } from '@/types/factorTypes';
import Button from '@/components/UI_Elements/buttons/Button';
import DataDisplay from '@/components/UI_Elements/Display/DataDisplay';
import AddressDisplay from '@/components/UI_Elements/Display/AddressDisplay';

// this component displays information about a specific factoring company

interface ViewFactorProps {
  data: FactorData | undefined;
}

export const ViewFactoringCo = ({ data }: ViewFactorProps) => {
  const router = useRouter();

  const { saveFormValues } = useContext(ModalContext);

  if (!data) {
    return (
      <div className="flex flex-col h-full">
        <div className="py-5 grow">
          <p className="body2 text-error-dark text-center">
            Oops! Something went wrong- Could not find Factoring Company.
          </p>
        </div>
        <div className="py-3.5 gap-2 border-t border-grey-300 dark:border-grey-700 flex justify-end bg-white dark:bg-grey-900 z-10">
          <Button
            type="button"
            onClick={() => {
              router.back();
            }}
          >
            Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col justify-between grow">
        <p className="my-3.5 body2 text-grey-800 dark:text-white">
          View Factoring Company
        </p>

        <div className="grow">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="w-full md:w-1/4">
              <DataDisplay title="Status" text={data['status']} />
            </div>

            <div className="flex flex-col w-full">
              <DataDisplay title="Factor Name" text={data['name']} />
            </div>
          </div>

          <div className="w-full">
            <AddressDisplay
              title="Address"
              addressLine1={data['address']}
              addressLine2={data['addressAddOn']}
              city={data['city']}
              state={data['state']}
              zip={data['postCode']}
              country={data['postCountry']}
            />
          </div>

          <div className="flex flex-col gap-5 xl:flex-row">
            <div className="flex flex-col w-full xl:w-1/2">
              <DataDisplay
                title="Primary Contact"
                text={data['primaryContact']}
              />
            </div>

            <div className="flex flex-col w-full xl:w-1/2">
              <DataDisplay title="Telephone" text={data['telephone']} />
            </div>
          </div>

          <div className="flex flex-col gap-5 xl:flex-row">
            <div className="flex flex-col w-full xl:w-1/2">
              <DataDisplay title="Toll Free" text={data['tollFree']} />
            </div>

            <div className="flex flex-col w-full xl:w-1/2">
              <DataDisplay title="Email" text={data['email']} />
            </div>
          </div>

          <div className="flex flex-col gap-5 xl:flex-row">
            <div className="flex flex-col w-full xl:w-1/2">
              <DataDisplay
                title="Secondary Contact"
                text={data['secondaryContact']}
              />
            </div>

            <div className="flex flex-col w-full xl:w-1/2">
              <DataDisplay
                title="Secondary Telephone"
                text={data['secondaryTelephone']}
              />
            </div>
          </div>

          <div className="flex flex-col gap-5 xl:flex-row">
            <div className="flex flex-col w-full xl:w-1/3">
              <DataDisplay title="Currency" text={data['currency']} />
            </div>

            <div className="flex flex-col w-full xl:w-1/3">
              <DataDisplay title="Payment Terms" text={data['paymentTerms']} />
            </div>

            <div className="flex flex-col w-full xl:w-1/3">
              <DataDisplay title="Tax ID#" text={data['taxId']} />
            </div>
          </div>

          <div className="flex flex-col w-full">
            <DataDisplay title="Notes" text={data['notes']} />
          </div>
        </div>

        <div className="py-3.5 gap-2 border-t border-grey-300 dark:border-grey-700 flex justify-between sticky bottom-0 bg-white dark:bg-grey-900 z-10">
          <Button
            type="button"
            variant="outline"
            intent="default"
            onClick={() => {
              // send data to context
              saveFormValues(data);
              router.push('/factors/update-factor/details');
            }}
          >
            Edit
          </Button>
          <Button
            type="button"
            onClick={() => {
              router.back();
            }}
          >
            Ok
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewFactoringCo;
