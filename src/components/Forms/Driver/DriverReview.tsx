'use client';

import { useEffect, useContext, useState } from 'react';
import { ModalContext } from '@/context/modalContext';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { DriverData, DriverFormData } from '@/types/driverTypes';
import Button from '@/components/UI_Elements/Buttons/Button';
import DataDisplay from '@/components/UI_Elements/Display/DataDisplay';
import AddressDisplay from '@/components/UI_Elements/Display/AddressDisplay';
import { useRouter } from 'next/navigation';
import { createDriver, updateDriver } from '@/store/slices/driverSlice';
import { CarrierData } from '@/types/carrierTypes';
import { getCarrier, getFactor } from '@/lib/dbActions';

// this component submits form data from the context to database using redux

// TODO- maybe fetch carrier name from redux rather than db

export const DriverReviewForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const errorState = useSelector((state: RootState) => state.drivers.error);

  const router = useRouter();

  const { formData, saveFormValues } = useContext(ModalContext);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [isTeam, setIsTeam] = useState<boolean>(false);

  // get the name of the employer (carrier)
  const [employer, setEmployer] = useState<string | undefined>(''); // carrier name

  const employerId = formData['Employer'];

  // fetch carrier name when component mounts
  useEffect(() => {
    const fetchCarrier = async () => {
      const employer = await getCarrier(employerId);
      setEmployer(employer?.carrierName);
    };

    fetchCarrier();
  }, [employerId]);

  // use the id to pull from redux
  // we could do it this way if we could guarantee carrier information would be in global state
  // const employer = useSelector((state: RootState) =>
  //   state.carriers.items.find(
  //     (carrier: CarrierData) => carrier.id === formData['Employer']
  //   )
  // );

  // submit the values to redux
  const onSubmit = async (driver: DriverFormData) => {
    setIsSubmitting(true);
    setError(''); // clear previous errors

    // if not an update
    if (!isUpdate) {
      try {
        await dispatch(createDriver(driver)).unwrap();
      } catch (error) {
        setError(`Error creating driver: ${error}`);
      }
    } else {
      try {
        await dispatch(
          updateDriver({
            id: formData['id'],
            updatedDriver: driver as Partial<DriverData>,
          })
        ).unwrap();
      } catch (error) {
        setError(`Error updating driver: ${error}`);
      }
    }
    setIsSubmitting(false);
  };

  // if this is an update
  useEffect(() => {
    if (formData !== null && formData['id']) {
      setIsUpdate(true);
    }
  }, [formData]);

  // if this is a team
  useEffect(() => {
    if (formData !== null && formData['Type'] === 'TEAM') {
      setIsTeam(true);
    }
  }, [formData]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col justify-between flex-grow">
        <p className="my-3.5 body2 text-grey-800 dark:text-white">
          Confirm Driver Details
        </p>

        <div className="flex-grow">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="w-full md:w-1/4">
              <DataDisplay title="Status" text={formData['Status']} />
            </div>
            <div className="w-full md:w-1/4">
              <DataDisplay title="Type" text={formData['Type']} />
            </div>

            <div className="flex flex-col w-full">
              <DataDisplay
                title="Employer"
                text={employer} // get the name not the id
              />
            </div>
          </div>

          <div className="flex flex-col gap-5 xl:flex-row">
            <div className="flex flex-col w-full xl:w-1/2">
              <DataDisplay title="Driver Name" text={formData['Driver Name']} />
            </div>

            <div className="flex flex-col w-full xl:w-1/2">
              <DataDisplay title="License" text={formData['License']} />
            </div>
          </div>

          <div className="flex flex-col gap-5 xl:flex-row">
            <div className="flex flex-col w-full xl:w-1/2">
              <DataDisplay title="Telephone" text={formData['Telephone']} />
            </div>

            <div className="flex flex-col w-full xl:w-1/2">
              <DataDisplay title="Email" text={formData['Email']} />
            </div>
          </div>

          <div className="flex flex-col self-center w-full">
            <AddressDisplay
              title="Driver Address"
              addressLine1={formData['Address']}
              city={formData['City']}
              state={formData['State']}
              zip={formData['Zip']}
              country={formData['Country']}
            />

            {isTeam ? (
              <>
                <div className="flex flex-col gap-5 xl:flex-row">
                  <div className="flex flex-col w-full xl:w-1/2">
                    <DataDisplay
                      title="Driver Two Name"
                      text={formData['Driver Two Name']}
                    />
                  </div>

                  <div className="flex flex-col w-full xl:w-1/2">
                    <DataDisplay
                      title="Driver Two License"
                      text={formData['Driver License']}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-5 xl:flex-row">
                  <div className="flex flex-col w-full xl:w-1/2">
                    <DataDisplay
                      title="Driver Two Telephone"
                      text={formData['Driver Telephone']}
                    />
                  </div>

                  <div className="flex flex-col w-full xl:w-1/2">
                    <DataDisplay
                      title="Driver Two Email"
                      text={formData['Driver Email']}
                    />
                  </div>
                </div>

                <div className="flex flex-col self-center w-full">
                  <AddressDisplay
                    title="Driver Two Address"
                    addressLine1={formData['Driver Address']}
                    city={formData['Driver City']}
                    state={formData['Driver State']}
                    zip={formData['Driver Zip']}
                    country={formData['Driver Country']}
                  />
                </div>
              </>
            ) : null}

            <DataDisplay title="Notes" text={formData['Notes']} />
          </div>
        </div>

        <div className="py-3.5 gap-2 border-t border-grey-300 dark:border-grey-700 flex justify-between sticky bottom-0 bg-white dark:bg-grey-900 z-10">
          <Button
            id="cancel"
            type="button"
            disabled={isSubmitting}
            onClick={() => {
              const cancel = confirm('Cancel this entry?');
              if (cancel) {
                saveFormValues({}, true); // clears context values
                router.push('/drivers');
              } else return;
            }}
            variant="outline"
            intent="default"
          >
            Cancel
          </Button>

          {error && (
            <div className="min-h-5 mr-2 self-center">
              <p className="caption mb-1 text-error-dark">{error}</p>
            </div>
          )}
          {errorState && ( // errors coming from redux toolkit
            <div className="min-h-5 mr-2 self-center">
              <p className="caption mb-1 text-error-dark">{errorState}</p>
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
                onSubmit(formData as DriverFormData);
                saveFormValues({}, true); // Reset form data after submission
                router.push('/drivers');
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

export default DriverReviewForm;
