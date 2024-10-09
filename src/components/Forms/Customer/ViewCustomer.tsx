'use client';

import { useContext } from 'react';
import { ModalContext } from '@/Context/modalContext';
import { CustomerData, customerFieldMap } from '@/types/customerTypes';
import Button from '@/components/UI_Elements/buttons/Button';
import DataDisplay from '@/components/UI_Elements/Display/DataDisplay';
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
    <div className="flex flex-col">
      <div className="flex flex-col self-center w-3/4">
        {/* map */}

        {Object.keys(customerFieldMap).map((value) => {
          const customerFieldKey = customerFieldMap[value];

          return (
            <DataDisplay
              title={value}
              text={data[customerFieldKey] || ''}
              key={customerFieldKey}
            />
          );
        })}
      </div>

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
