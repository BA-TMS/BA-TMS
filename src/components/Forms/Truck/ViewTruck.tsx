'use client';

import { useContext } from 'react';
import { ModalContext } from '@/context/modalContext';
import { useRouter } from 'next/navigation';
import { TruckData } from '@/types/truckTypes';
import Button from '@/components/UI_Elements/buttons/Button';
import DataDisplay from '@/components/UI_Elements/Display/DataDisplay';

// this component displays information about a specific truck

interface ViewTruckProps {
  data: TruckData | undefined;
}

export const ViewTruckForm = ({ data }: ViewTruckProps) => {
  const router = useRouter();

  const { saveFormValues } = useContext(ModalContext);

  if (!data) {
    return (
      <div className="flex flex-col h-full">
        <div className="py-5 grow">
          <p className="body2 text-error-dark text-center">
            Oops! Something went wrong- Could not find Truck.
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
        <p className="my-3.5 body2 text-grey-800 dark:text-white">View Truck</p>

        <div className="grow">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="w-full md:w-1/3">
              <DataDisplay title="Truck Number" text={data['truckNum']} />
            </div>
            <div className="w-full md:w-1/3">
              <DataDisplay title="License Plate" text={data['licensePlate']} />
            </div>
            <div className="w-full md:w-1/3">
              <DataDisplay title="Status" text={data['status']} />
            </div>
          </div>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="w-full md:w-1/3">
              <DataDisplay title="Plate Expiry" text={data['plateExpiry']} />
            </div>
            <div className="w-full md:w-1/3">
              <DataDisplay
                title="Inspection Expiry"
                text={data['inspectionExpiry']}
              />
            </div>
            <div className="w-full md:w-1/3">
              <DataDisplay title="Ownership" text={data['ownership']} />
            </div>
          </div>

          <div className="flex flex-col gap-4 md:flex-row">
            <div className="w-full md:w-1/4">
              <DataDisplay title="Mileage" text={data['mileage']} />
            </div>
            <div className="w-full md:w-1/4">
              <DataDisplay title="Axels" text={data['axels']} />
            </div>
            <div className="w-full md:w-1/4">
              <DataDisplay title="Year" text={data['year']} />
            </div>
            <div className="w-full md:w-1/4">
              <DataDisplay title="Fuel Type" text={data['fuelType']} />
            </div>
          </div>

          <div className="flex flex-col gap-4 md:flex-row">
            <div className="w-full md:w-1/2">
              <DataDisplay title="Start Date" text={data['startDate']} />
            </div>
            <div className="w-full md:w-1/2">
              <DataDisplay
                title="Deactivation Date"
                text={data['deactivationDate']}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 md:flex-row">
            <div className="w-full md:w-1/4">
              <DataDisplay
                title="Registered State"
                text={data['registeredState']}
              />
            </div>
            <div className="w-full md:w-1/4">
              <DataDisplay title="Weight" text={data['weight']} />
            </div>
            <div className="w-full md:w-1/4">
              <DataDisplay title="VIN" text={data['vin']} />
            </div>
            <div className="w-full md:w-1/4">
              <DataDisplay title="DOT Expiry" text={data['dotExpiry']} />
            </div>
          </div>

          <DataDisplay title="Notes" text={data['notes']} />
        </div>

        <div className="py-3.5 gap-2 border-t border-grey-300 dark:border-grey-700 flex justify-between sticky bottom-0 bg-white dark:bg-grey-900 z-10">
          <Button
            type="button"
            variant="outline"
            intent="default"
            onClick={() => {
              // send data to context
              saveFormValues(data);
              router.push('/trucks/update-truck/details');
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

export default ViewTruckForm;
