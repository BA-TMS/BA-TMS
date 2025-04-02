'use client';

import { useContext } from 'react';
import { ModalContext } from '@/context/modalContext';
import { useRouter } from 'next/navigation';
import { TrailerData } from '@/types/trailerTypes';
import Button from '@/components/UI_Elements/Buttons/Button';
import DataDisplay from '@/components/UI_Elements/Display/DataDisplay';

// this component displays information about a specific trailer

interface ViewTrailerProps {
  data: TrailerData | undefined;
}

const statusMap = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  NOTAVAILABLE: 'Not Available',
} as const;

type StatusMap = typeof statusMap;
type StatusKey = keyof StatusMap;

export const ViewTrailerForm = ({ data }: ViewTrailerProps) => {
  const router = useRouter();

  const { saveFormValues } = useContext(ModalContext);

  if (!data) {
    return (
      <div className="flex flex-col h-full">
        <div className="py-5 grow">
          <p className="body2 text-error-dark text-center">
            Oops! Something went wrong- Could not find Trailer.
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
        <p className="my-3.5 body2 text-grey-800 dark:text-white">
          View Trailer
        </p>

        <div className="grow">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="w-full md:w-1/3">
              <DataDisplay title="Type" text={data['type']} />
            </div>
            <div className="w-full md:w-1/3">
              <DataDisplay title="License Plate" text={data['licensePlate']} />
            </div>
            <div className="w-full md:w-1/3">
              <DataDisplay
                title="Status"
                text={statusMap[data['status'] as StatusKey]}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="w-full md:w-1/2">
              <DataDisplay title="Plate Expiry" text={data['plateExpiry']} />
            </div>
            <div className="w-full md:w-1/2">
              <DataDisplay
                title="Inspection Expiry"
                text={data['inspectionExpiry']}
              />
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
              router.push('/trailers/update-trailer/details');
            }}
          >
            Edit
          </Button>

          <div className="flex justify-end gap-2">
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
    </div>
  );
};

export default ViewTrailerForm;
