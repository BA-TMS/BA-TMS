'use client';

import { useContext } from 'react';
import { ModalContext } from '@/context/modalContext';
import { useRouter } from 'next/navigation';
import { BrokerData } from '@/types/brokerTypes';
import Button from '@/components/UI_Elements/Buttons/Button';
import DataDisplay from '@/components/UI_Elements/Display/DataDisplay';

// this component displays information about a specific customs broker

interface ViewBrokerProps {
  data: BrokerData | undefined;
}

export const ViewCustomsBroker = ({ data }: ViewBrokerProps) => {
  const router = useRouter();

  const { saveFormValues } = useContext(ModalContext);

  if (!data) {
    return (
      <div className="flex flex-col h-full">
        <div className="py-5 flex-grow">
          <p className="body2 text-error-dark text-center">
            Oops! Something went wrong- Could not find Customs Broker.
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
      <div className="flex flex-col justify-between flex-grow">
        <p className="my-3.5 body2 text-grey-800 dark:text-white">
          View Custom Broker
        </p>

        <div className="flex-grow">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="w-full md:w-1/3">
              <DataDisplay title="Broker Name" text={data['name']} />
            </div>
            <div className="w-full md:w-1/3">
              <DataDisplay title="Crossing" text={data['crossing']} />
            </div>
            <div className="w-full md:w-1/3">
              <DataDisplay title="Status" text={data['status']} />
            </div>
          </div>
          <DataDisplay title="Telephone" text={data['telephone']} />
          <DataDisplay title="Toll Free" text={data['tollFree']} />
        </div>

        <div className="py-3.5 gap-2 border-t border-grey-300 dark:border-grey-700 flex justify-between sticky bottom-0 bg-white dark:bg-grey-900 z-10">
          <Button
            type="button"
            variant="outline"
            intent="default"
            onClick={() => {
              // send data to context
              saveFormValues(data);
              router.push('/brokers/update-broker/details');
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

export default ViewCustomsBroker;
