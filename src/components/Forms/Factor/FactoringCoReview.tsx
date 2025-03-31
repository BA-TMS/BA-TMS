'use client';

import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { ModalContext } from '@/context/modalContext';
import { UserContext } from '@/context/userContextProvider';
import DataDisplay from '@/components/UI_Elements/Display/DataDisplay';
import AddressDisplay from '@/components/UI_Elements/Display/AddressDisplay';
import Button from '@/components/UI_Elements/Buttons/Button';
import { useRouter } from 'next/navigation';
import { FactorData, FactorFormData } from '@/types/factorTypes';
import { createFactor, updateFactor } from '@/store/slices/factorSlice';

export const FactoringCompanyReview: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const errorState = useSelector((state: RootState) => state.factors.error);

  const router = useRouter();

  const { formData, saveFormValues } = useContext(ModalContext);

  // adds organization information to factor
  const { organization } = useContext(UserContext);
  formData.orgName = organization;

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  const onSubmit = async (factor: FactorFormData) => {
    setIsSubmitting(true);
    setError(''); // clear previous errors

    // if not an update
    if (!isUpdate) {
      try {
        await dispatch(createFactor(factor)).unwrap();
      } catch (error) {
        setError(`Error creating factor: ${error}`);
      }
    } else {
      try {
        await dispatch(
          updateFactor({
            id: formData['id'],
            updatedFactor: factor as Partial<FactorData>,
          })
        ).unwrap();
      } catch (error) {
        setError(`Error updating factoring company: ${error}`);
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
    <div>
      <div className="flex flex-col justify-between grow">
        <p className="my-3.5 body2 text-grey-800 dark:text-white">
          Confirm Factoring Company Details
        </p>

        <div className="grow">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="w-full md:w-1/4">
              <DataDisplay title="Status" text={formData['Status']} />
            </div>

            <div className="flex flex-col w-full">
              <DataDisplay title="Factor Name" text={formData['Factor Name']} />
            </div>
          </div>

          <div className="w-full">
            <AddressDisplay
              title="Address"
              addressLine1={formData['Address']}
              addressLine2={formData['Address Line 2']}
              city={formData['City']}
              state={formData['State']}
              zip={formData['Zip']}
              country={formData['Country']}
            />
          </div>

          <div className="flex flex-col gap-5 xl:flex-row">
            <div className="flex flex-col w-full xl:w-1/2">
              <DataDisplay
                title="Primary Contact"
                text={formData['Primary Contact']}
              />
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
            <div className="flex flex-col w-full xl:w-1/2">
              <DataDisplay
                title="Secondary Contact"
                text={formData['Secondary Contact']}
              />
            </div>

            <div className="flex flex-col w-full xl:w-1/2">
              <DataDisplay
                title="Secondary Telephone"
                text={formData['Secondary Telephone']}
              />
            </div>
          </div>

          <div className="flex flex-col gap-5 xl:flex-row">
            <div className="flex flex-col w-full xl:w-1/3">
              <DataDisplay title="Currency" text={formData['Currency']} />
            </div>

            <div className="flex flex-col w-full xl:w-1/3">
              <DataDisplay
                title="Payment Terms"
                text={formData['Payment Terms']}
              />
            </div>

            <div className="flex flex-col w-full xl:w-1/3">
              <DataDisplay title="Tax ID#" text={formData['Tax ID#']} />
            </div>
          </div>

          <div className="flex flex-col w-full">
            <DataDisplay title="Notes" text={formData['Notes']} />
          </div>
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
                router.push('/factors');
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
                onSubmit(formData as FactorFormData);
                saveFormValues({}, true); // Reset form data after submission
                router.push('/factors');
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

export default FactoringCompanyReview;
