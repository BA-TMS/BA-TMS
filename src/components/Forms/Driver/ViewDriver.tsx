'use Client';

import { useContext, useState, useEffect } from 'react';
import { ModalContext } from '@/context/modalContext';
import { useRouter } from 'next/navigation';
import { DriverData } from '@/types/driverTypes';
import Button from '@/components/UI_Elements/Buttons/Button';
import DataDisplay from '@/components/UI_Elements/Display/DataDisplay';
import AddressDisplay from '@/components/UI_Elements/Display/AddressDisplay';

// this component displays information about a specific carrier

interface ViewDriverProps {
  data: DriverData | undefined;
}

const ViewDriver = ({ data }: ViewDriverProps) => {
  const router = useRouter();

  const [isTeam, setIsTeam] = useState<boolean>(false);

  const { saveFormValues } = useContext(ModalContext);

  if (!data) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex flex-col justify-between flex-grow">
          <p className="py-5 body2 text-error-dark text-center">
            Oops! Something went wrong- Could not find Driver.
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

  // if this is a team
  useEffect(() => {
    if (data['type'] === 'TEAM') {
      setIsTeam(true);
    }
  }, [data]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col justify-between flex-grow">
        {/* Driver One */}
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="w-full md:w-1/4">
            <DataDisplay title="Status" text={data['status']} />
          </div>
          <div className="w-full md:w-1/4">
            <DataDisplay title="Type" text={data['type']} />
          </div>
          <div className="w-full">
            <DataDisplay title="Employer" text={data['employer']} />
          </div>
        </div>

        <div className="flex flex-col gap-5 xl:flex-row">
          <div className="w-full">
            <DataDisplay title="Driver Name" text={data['name']} />
          </div>
          <div className="w-full md:w-1/2">
            <DataDisplay title="License" text={data['license']} />
          </div>
        </div>

        <div className="flex flex-col gap-5 xl:flex-row">
          <div className="flex flex-col w-full xl:w-1/2">
            <DataDisplay title="Telephone" text={data['telephone']} />
          </div>

          <div className="flex flex-col w-full xl:w-1/2">
            <DataDisplay title="Email" text={data['email']} />
          </div>
        </div>

        <div className="flex flex-col self-center w-full">
          <AddressDisplay
            title={'Driver Address'}
            addressLine1={data['address']}
            city={data['city']}
            state={data['state']}
            zip={data['zip']}
            country={data['country']}
          />
        </div>

        {/* Driver Two */}
        {isTeam ? (
          <>
            <div className="flex flex-col gap-5 xl:flex-row">
              <div className="w-full">
                <DataDisplay
                  title="Driver Two Name"
                  text={data['driverTwo']?.name}
                />
              </div>
              <div className="w-full md:w-1/2">
                <DataDisplay
                  title="Driver Two License"
                  text={data['driverTwo']?.license}
                />
              </div>
            </div>

            <div className="flex flex-col gap-5 xl:flex-row">
              <div className="flex flex-col w-full xl:w-1/2">
                <DataDisplay
                  title="Driver Two Telephone"
                  text={data['driverTwo']?.telephone}
                />
              </div>

              <div className="flex flex-col w-full xl:w-1/2">
                <DataDisplay
                  title="Driver Two Email"
                  text={data['driverTwo']?.email}
                />
              </div>
            </div>

            <div className="flex flex-col self-center w-full">
              <AddressDisplay
                title={'Driver Two Address'}
                addressLine1={data['driverTwo']?.address as string}
                city={data['driverTwo']?.city as string}
                state={data['driverTwo']?.state as string}
                zip={data['driverTwo']?.zip as string}
                country={data['driverTwo']?.country as string}
              />
            </div>
          </>
        ) : null}

        <DataDisplay title="Notes" text={data['notes']} />

        <div className="py-3.5 gap-2 border-t border-grey-300 dark:border-grey-700 flex justify-between bottom-0 bg-white dark:bg-grey-900 z-10">
          <Button
            type="button"
            variant="outline"
            intent="default"
            onClick={() => {
              // send data to context
              saveFormValues(data);
              router.push('/drivers/update-driver/details');
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

export default ViewDriver;
