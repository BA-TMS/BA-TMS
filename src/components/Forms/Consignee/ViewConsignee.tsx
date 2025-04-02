'use client';

import { useContext } from 'react';
import { ModalContext } from '@/context/modalContext';
import { useRouter } from 'next/navigation';
import { ConsigneeData } from '@/types/consigneeTypes';
import Button from '@/components/UI_Elements/Buttons/Button';
import DataDisplay from '@/components/UI_Elements/Display/DataDisplay';
import AddressDisplay from '@/components/UI_Elements/Display/AddressDisplay';

// this component displays information about a specific consignee

interface ViewConsigneeProps {
  data: ConsigneeData | undefined;
}

const ViewConsigneeForm = ({ data }: ViewConsigneeProps) => {
  const router = useRouter();

  const { saveFormValues } = useContext(ModalContext);

  if (!data) {
    return (
      <div className="flex flex-col h-full">
        <div className="py-5 grow">
          <p className="body2 text-error-dark text-center">
            Oops! Something went wrong- Could not find Consignee.
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
    <div className="flex flex-col h-full">
      <div className="flex flex-col justify-between grow">
        <p className="mt-3.5 mb-5 body2 text-grey-800 dark:text-white">
          Confirm Consignee Details
        </p>

        <div className="grow overflow-auto">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="w-full md:w-1/4">
              <DataDisplay title="Status" text={data['status']} />
            </div>

            <div className="flex flex-col w-full">
              <DataDisplay title="Consignee Name" text={data['name']} />
            </div>
          </div>

          <div className="w-full">
            <AddressDisplay
              title="Address"
              addressLine1={data['address']}
              addressLine2={data['addressField2']}
              addressLine3={data['addressField3']}
              city={data['city']}
              state={data['state']}
              zip={data['postCode']}
              country={data['postCountry']}
            />
          </div>

          <div className="flex flex-col gap-5 xl:flex-row">
            <div className="flex flex-col w-full xl:w-1/2">
              <DataDisplay title="Contact" text={data['contactName']} />
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
              <DataDisplay title="Email" text={data['contactEmail']} />
            </div>
          </div>

          <div className="flex flex-col gap-5 xl:flex-row">
            <div className="flex flex-col w-full xl:w-1/3">
              <DataDisplay
                title="Recieving Hours"
                text={data['recievingHours']}
              />
            </div>

            <div className="flex flex-col w-full xl:w-1/3">
              <DataDisplay title="Appointments" text={data['appointments']} />
            </div>

            <div className="flex flex-col w-full xl:w-1/3">
              <DataDisplay title="Intersections" text={data['intersections']} />
            </div>
          </div>

          <div className="flex flex-col w-full">
            <DataDisplay title="Notes" text={data['notes']} />
          </div>
        </div>

        <div className="py-3.5 gap-2 border-t border-grey-300 dark:border-grey-700 flex justify-between bg-white dark:bg-grey-900">
          <Button
            type="button"
            variant="outline"
            intent="default"
            onClick={() => {
              // send data to context
              saveFormValues(data);
              router.push('/consignees/update-consignee/details');
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

export default ViewConsigneeForm;
