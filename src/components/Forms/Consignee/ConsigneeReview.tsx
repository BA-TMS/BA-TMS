'use client';

import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { ModalContext } from '@/context/modalContext';
import { UserContext } from '@/context/userContextProvider';
import DataDisplay from '@/components/UI_Elements/Display/DataDisplay';
import AddressDisplay from '@/components/UI_Elements/Display/AddressDisplay';
import Button from '@/components/UI_Elements/buttons/Button';
import { useRouter } from 'next/navigation';
import { ConsigneeData, ConsigneeFormData } from '@/types/consigneeTypes';
import {
  createConsignee,
  updateConsignee,
} from '@/store/slices/consigneeSlice';
import { fetchShippers } from '@/store/slices/shipperSlice';

const ConsigneeReviewForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const errorState = useSelector((state: RootState) => state.consignees.error);

  const router = useRouter();

  const { formData, saveFormValues } = useContext(ModalContext);

  // adds organization information to consignee
  const { organization } = useContext(UserContext);
  formData.orgName = organization;

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  const onSubmit = async (consignee: ConsigneeFormData) => {
    setIsSubmitting(true);
    setError(''); // clear previous errors

    // if not an update
    if (!isUpdate) {
      try {
        await dispatch(createConsignee(consignee))
          .unwrap()
          // dispatch fetchShippers if this consignee is also a shipper
          .then(() => {
            if (formData.shipper === true)
              dispatch(fetchShippers(organization));
          });
      } catch (error) {
        setError(`Error creating consignee: ${error}`);
      }
    } else {
      try {
        await dispatch(
          updateConsignee({
            id: formData['id'],
            updatedConsignee: consignee as Partial<ConsigneeData>,
          })
        )
          .unwrap()
          // dispatch fetchShippers if this consignee is also a shipper
          .then(() => {
            if (formData.shipper === true)
              dispatch(fetchShippers(organization));
          });
      } catch (error) {
        setError(`Error updating consignee: ${error}`);
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
      <div className="flex flex-col justify-between grow">
        <p className="mt-3.5 mb-5 body2 text-grey-800 dark:text-white">
          Confirm Consignee Details
        </p>

        <div className="grow overflow-auto">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="w-full md:w-1/4">
              <DataDisplay title="Status" text={formData['Status']} />
            </div>

            <div className="flex flex-col w-full">
              <DataDisplay
                title="consignee Name"
                text={formData['Consignee Name']}
              />
            </div>
          </div>

          <div className="w-full">
            <AddressDisplay
              title="Address"
              addressLine1={formData['Address']}
              addressLine2={formData['Address Line 2']}
              addressLine3={formData['Address Line 3']}
              city={formData['City']}
              state={formData['State']}
              zip={formData['Zip']}
              country={formData['Country']}
            />
          </div>

          <div className="flex flex-col gap-5 xl:flex-row">
            <div className="flex flex-col w-full xl:w-1/2">
              <DataDisplay title="Contact" text={formData['Contact']} />
            </div>

            <div className="flex flex-col w-full xl:w-1/2">
              <DataDisplay title="Telephone" text={formData['Telephone']} />
            </div>
          </div>

          <div className="flex flex-col gap-5 xl:flex-row">
            <div className="flex flex-col w-full xl:w-1/2">
              <DataDisplay title="Toll Free" text={formData['Toll Free']} />
            </div>

            <div className="flex flex-col w-full xl:w-1/2">
              <DataDisplay title="Email" text={formData['Email']} />
            </div>
          </div>

          <div className="flex flex-col gap-5 xl:flex-row">
            <div className="flex flex-col w-full xl:w-1/3">
              <DataDisplay
                title="Recieving Hours"
                text={formData['Recieving Hours']}
              />
            </div>

            <div className="flex flex-col w-full xl:w-1/3">
              <DataDisplay
                title="Appointments"
                text={formData['Appointments']}
              />
            </div>

            <div className="flex flex-col w-full xl:w-1/3">
              <DataDisplay
                title="Intersections"
                text={formData['Intersections']}
              />
            </div>
          </div>

          <div className="flex flex-col w-full">
            <DataDisplay title="Notes" text={formData['Notes']} />
          </div>
        </div>

        <div className="py-3.5 gap-2 border-t border-grey-300 dark:border-grey-700 flex justify-between bg-white dark:bg-grey-900">
          <Button
            id="cancel"
            type="button"
            disabled={isSubmitting}
            onClick={() => {
              const cancel = confirm('Cancel this entry?');
              if (cancel) {
                saveFormValues({}, true); // clears context values
                router.push('/consignees');
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
                onSubmit(formData as ConsigneeFormData);
                saveFormValues({}, true); // Reset form DataDisplay after submission
                router.push('/consignees');
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

export default ConsigneeReviewForm;
