'use client';

import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { ModalContext } from '@/context/modalContext';
import { UserContext } from '@/context/userContextProvider';
import DataDisplay from '@/components/UI_Elements/Display/DataDisplay';
import Button from '@/components/UI_Elements/Buttons/Button';
import { useRouter } from 'next/navigation';
import { NumData, NumFormData } from '@/types/otherNumTypes';
import {createNu}

// this component submits form data from the context to database using redux

export const OtherNumReview: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const errorState = useSelector(
    (state: RootState) => state.otherNumbers.error
  );

  const router = useRouter();

  const { formData, saveFormValues } = useContext(ModalContext);

  // adds organization information to broker
  const { organization } = useContext(UserContext);
  formData.orgName = organization;

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  const onSubmit = async (otherNum: NumFormData) => {
    setIsSubmitting(true);
    setError(''); // clear previous errors

    // if not an update
    // if (!isUpdate) {
    try {
      await dispatch(createTruck(otherNum)).unwrap();
    } catch (error) {
      setError(`Error creating other number: ${error}`);
    }
    // } else {
    //   try {
    //     await dispatch(
    //       updateTruck({
    //         id: formData['id'],
    //         updatedTruck: otherNum as Partial<NumData>,
    //       })
    //     ).unwrap();
    //   } catch (error) {
    //     setError(`Error updating truck: ${error}`);
    //   }
    // }
    // setIsSubmitting(false);
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
          Confirm Other Number
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
                router.push('/other-numbers');
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
                onSubmit(formData as NumFormData);
                saveFormValues({}, true); // Reset form data after submission
                router.push('/other-numbers');
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

export default OtherNumReview;
