'use client';

import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { ModalContext } from '@/context/modalContext';
import { UserContext } from '@/context/userContextProvider';
import DataDisplay from '@/components/UI_Elements/Display/DataDisplay';
import Button from '@/components/UI_Elements/Buttons/Button';
import { useRouter } from 'next/navigation';
import { TruckData, TruckFormData } from '@/types/truckTypes';
import { createTruck, updateTruck } from '@/store/slices/truckSlice';

// this component submits form data from the context to database using redux

export const TruckReview: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const errorState = useSelector((state: RootState) => state.trucks.error);

  const router = useRouter();

  const { formData, saveFormValues } = useContext(ModalContext);

  // adds organization information to broker
  const { organization } = useContext(UserContext);
  formData.orgName = organization;

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  const onSubmit = async (truck: TruckFormData) => {
    setIsSubmitting(true);
    setError(''); // clear previous errors

    // if not an update
    if (!isUpdate) {
      try {
        await dispatch(createTruck(truck)).unwrap();
      } catch (error) {
        setError(`Error creating truck: ${error}`);
      }
    } else {
      try {
        await dispatch(
          updateTruck({
            id: formData['id'],
            updatedTruck: truck as Partial<TruckData>,
          })
        ).unwrap();
      } catch (error) {
        setError(`Error updating truck: ${error}`);
      }
    }
    setIsSubmitting(false);
  };

  useEffect(() => {
    if (formData !== null && formData['id']) {
      setIsUpdate(true);
    }
  }, [formData]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col justify-between flex-grow">
        <p className="my-3.5 body2 text-grey-800 dark:text-white">
          Confirm Truck Details
        </p>

        <div className="flex-grow">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="w-full md:w-1/3">
              <DataDisplay
                title="Truck Number"
                text={formData['Truck Number']}
              />
            </div>
            <div className="w-full md:w-1/3">
              <DataDisplay
                title="License Plate"
                text={formData['License Plate']}
              />
            </div>
            <div className="w-full md:w-1/3">
              <DataDisplay title="Status" text={formData['Status']} />
            </div>
          </div>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="w-full md:w-1/3">
              <DataDisplay
                title="Plate Expiry"
                text={
                  formData['Plate Expiry']
                    ? formData['Plate Expiry'].toDateString()
                    : ''
                }
              />
            </div>
            <div className="w-full md:w-1/3">
              <DataDisplay
                title="Inspection Expiry"
                text={
                  formData['Inspection Expiry']
                    ? formData['Inspection Expiry'].toDateString()
                    : ''
                }
              />
            </div>
            <div className="w-full md:w-1/3">
              <DataDisplay title="Ownership" text={formData['Ownership']} />
            </div>
          </div>

          <div className="flex flex-col gap-4 md:flex-row">
            <div className="w-full md:w-1/4">
              <DataDisplay title="Mileage" text={formData['Mileage']} />
            </div>
            <div className="w-full md:w-1/4">
              <DataDisplay title="Axels" text={formData['Axels']} />
            </div>
            <div className="w-full md:w-1/4">
              <DataDisplay title="Year" text={formData['Year']} />
            </div>
            <div className="w-full md:w-1/4">
              <DataDisplay title="Fuel Type" text={formData['Fuel Type']} />
            </div>
          </div>

          <div className="flex flex-col gap-4 md:flex-row">
            <div className="w-full md:w-1/2">
              <DataDisplay
                title="Start Date"
                text={
                  formData['Start Date']
                    ? formData['Start Date'].toDateString()
                    : ''
                }
              />
            </div>
            <div className="w-full md:w-1/2">
              <DataDisplay
                title="Deactivation Date"
                text={
                  formData['Deactivation Date']
                    ? formData['Deactivation Date'].toDateString()
                    : ''
                }
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 md:flex-row">
            <div className="w-full md:w-1/4">
              <DataDisplay
                title="Registered State"
                text={formData['Registered State']}
              />
            </div>
            <div className="w-full md:w-1/4">
              <DataDisplay title="Weight" text={formData['Weight']} />
            </div>
            <div className="w-full md:w-1/4">
              <DataDisplay title="VIN" text={formData['VIN']} />
            </div>
            <div className="w-full md:w-1/4">
              <DataDisplay
                title="DOT Expiry"
                text={
                  formData['DOT Expiry']
                    ? formData['DOT Expiry'].toDateString()
                    : ''
                }
              />
            </div>
          </div>

          <DataDisplay title="Notes" text={formData['Notes']} />
        </div>

        <div className="py-3.5 gap-2 border-t border-grey-300 dark:border-grey-700 flex justify-between sticky bottom-0 bg-white dark:bg-grey-900 z-10">
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

          <Button
            id="cancel"
            type="button"
            disabled={isSubmitting}
            onClick={() => {
              const cancel = confirm('Cancel this entry?');
              if (cancel) {
                saveFormValues({}, true); // clears context values
                router.push('/trucks');
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
                onSubmit(formData as TruckFormData);
                saveFormValues({}, true); // Reset form data after submission
                router.push('/trucks');
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

export default TruckReview;
