'use client';

import { useContext } from 'react';
import { ModalContext } from '@/Context/modalContext';
import { CustomerData } from '@/types/customerTypes';
import Button from '@/components/UI_Elements/buttons/Button';
import { useRouter } from 'next/navigation';

// component will need to take in a customer to map data in a way to display it

interface ViewCustomerProps {
  data: CustomerData;
}

const ViewCustomer = ({ data }: ViewCustomerProps) => {
  const router = useRouter();

  console.log('VIEW DATA', data);

  const { saveFormValues } = useContext(ModalContext);

  return (
    <div className="flex flex-col justify-between">
      <div className="">
        <div className="flex flex-col gap-5 xl:flex-row">
          <div className="flex flex-col w-full xl:w-1/2">
            <p> one column </p>
          </div>
          <div className="flex flex-col w-full xl:w-1/2">
            <p>another column</p>
          </div>
        </div>

        <p> more </p>

        <div className="flex flex-col gap-5 xl:flex-row">
          <div className="flex flex-col w-full xl:w-1/2">
            <p>ahh</p>
          </div>
          <div className="flex flex-col w-full xl:w-1/2">
            <p>ahh</p>
          </div>
        </div>
      </div>

      {/* <div className="min-h-5">
          {errors.root && (
            <p className="caption mb-1 text-error-dark">
              {errors.root.message}
            </p>
          )}
        </div> */}
      <div className="py-3.5 gap-2 border-t border-grey-300 dark:border-grey-700 flex justify-between sticky bottom-0 bg-white dark:bg-grey-900 z-10">
        <Button
          type="button"
          variant="outline"
          intent="default"
          onClick={() => {
            // send data to context
            saveFormValues(data);
            router.push('/customers/update-customer/details');
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
  );
};

export default ViewCustomer;
