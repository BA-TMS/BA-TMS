'use client';

import { useContext, useState, useEffect } from 'react';
import { ModalContext } from '@/context/modalContext';
import { useRouter } from 'next/navigation';
import { DriverData } from '@/types/driverTypes';
import Button from '@/components/UI_Elements/Buttons/Button';
import DataDisplay from '@/components/UI_Elements/Display/DataDisplay';
import AddressDisplay from '@/components/UI_Elements/Display/AddressDisplay';

interface ViewDriverProps {
  data: DriverData | undefined;
}

const ViewDriver = ({ data }: ViewDriverProps) => {
  const router = useRouter();
  const [isTeam, setIsTeam] = useState<boolean>(false);
  const { saveFormValues } = useContext(ModalContext);

  // ✅ Always call hooks at the top level
  useEffect(() => {
    if (data?.type === 'TEAM') {
      setIsTeam(true);
    }
  }, [data]);

  if (!data) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex flex-col justify-between grow">
          <p className="py-5 body2 text-error-dark text-center">
            Oops! Something went wrong - Could not find Driver.
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
    <div className="pt-4 flex flex-col h-full">
      <div className="flex flex-col grow">
        {/* Driver One */}
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="w-full md:w-1/4">
            <DataDisplay title="Status" text={data.status} />
          </div>
          <div className="w-full md:w-1/4">
            <DataDisplay title="Type" text={data.type} />
          </div>
          <div className="w-full">
            <DataDisplay title="Employer" text={data.employer} />
          </div>
        </div>

        <div className="flex flex-col gap-5 xl:flex-row">
          <div className="w-full">
            <DataDisplay title="Driver Name" text={data.name} />
          </div>
          <div className="w-full md:w-1/2">
            <DataDisplay title="License" text={data.license} />
          </div>
        </div>

        <div className="flex flex-col gap-5 xl:flex-row">
          <div className="flex flex-col w-full xl:w-1/2">
            <DataDisplay title="Telephone" text={data.telephone} />
          </div>

          <div className="flex flex-col w-full xl:w-1/2">
            <DataDisplay title="Email" text={data.email} />
          </div>
        </div>

        <div className="flex flex-col self-center w-full">
          <AddressDisplay
            title="Driver Address"
            addressLine1={data.address}
            city={data.city}
            state={data.state}
            zip={data.zip}
            country={data.country}
          />

          {/* Driver Two */}
          {isTeam && data.driverTwo ? (
            <>
              <div className="flex flex-col gap-5 xl:flex-row">
                <div className="w-full">
                  <DataDisplay
                    title="Driver Two Name"
                    text={data.driverTwo.name}
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <DataDisplay
                    title="Driver Two License"
                    text={data.driverTwo.license}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-5 xl:flex-row">
                <div className="flex flex-col w-full xl:w-1/2">
                  <DataDisplay
                    title="Driver Two Telephone"
                    text={data.driverTwo.telephone}
                  />
                </div>

                <div className="flex flex-col w-full xl:w-1/2">
                  <DataDisplay
                    title="Driver Two Email"
                    text={data.driverTwo.email}
                  />
                </div>
              </div>

              <div className="flex flex-col self-center w-full">
                <AddressDisplay
                  title="Driver Two Address"
                  addressLine1={data.driverTwo.address}
                  city={data.driverTwo.city}
                  state={data.driverTwo.state}
                  zip={data.driverTwo.zip}
                  country={data.driverTwo.country}
                />
              </div>
            </>
          ) : null}

          <DataDisplay title="Notes" text={data.notes} />
        </div>
      </div>

      <div className="py-3.5 gap-2 border-t border-grey-300 dark:border-grey-700 flex justify-between sticky bottom-0 bg-white dark:bg-grey-900 z-10">
        <Button
          type="button"
          variant="outline"
          intent="default"
          onClick={() => {
            saveFormValues(data);
            router.push('/drivers/update-driver/details');
          }}
        >
          Edit
        </Button>
        <Button type="button" onClick={() => router.back()}>
          Ok
        </Button>
      </div>
    </div>
  );
};

export default ViewDriver;
