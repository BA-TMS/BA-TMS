'use client';

import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { ModalContext } from '@/context/modalContext';
import DataDisplay from '@/components/UI_Elements/Display/DataDisplay';
import Button from '@/components/UI_Elements/Buttons/Button';
import { useRouter } from 'next/navigation';
import { BrokerData, BrokerFormData } from '@/types/brokerTypes';
import { createBroker, updateBroker } from '@/store/slices/brokerSlice';

// this component submits form data from the context to database using redux

export const CustomsBrokerReview: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const errorState = useSelector((state: RootState) => state.brokers.error);

  const router = useRouter();

  const { formData, saveFormValues } = useContext(ModalContext);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  const onSubmit = async (broker: BrokerFormData) => {
    setIsSubmitting(true);
    setError(''); // clear previous errors

    console.log('BROKER', broker);

    // if not an update
    if (!isUpdate) {
      try {
        await dispatch(createBroker(broker)).unwrap();
      } catch (error) {
        setError(`Error creating broker: ${error}`);
      }
    } else {
      try {
        await dispatch(
          updateBroker({
            id: formData['id'],
            updatedBroker: broker as Partial<BrokerData>,
          })
        ).unwrap();
      } catch (error) {
        setError(`Error updating carrier: ${error}`);
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
          Confirm Customs Broker Details
        </p>

        <div className="flex-grow">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="w-full md:w-1/3">
              <DataDisplay title="Broker Name" text={formData['Broker Name']} />
            </div>
            <div className="w-full md:w-1/3">
              <DataDisplay title="Crossing" text={formData['Crossing']} />
            </div>
            <div className="w-full md:w-1/3">
              <DataDisplay title="Status" text={formData['Status']} />
            </div>
          </div>
          <DataDisplay title="Telephone" text={formData['Telephone']} />
          <DataDisplay title="Toll Free" text={formData['Toll Free']} />
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
                router.push('/brokers');
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
                onSubmit(formData as BrokerFormData);
                saveFormValues({}, true); // Reset form data after submission
                router.push('/brokers');
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

export default CustomsBrokerReview;
