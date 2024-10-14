'use client';

import { useContext } from 'react';
import { ModalContext } from '@/Context/modalContext';
import { CustomerData } from '@/types/customerTypes';
import Button from '@/components/UI_Elements/buttons/Button';
import DataDisplay from '@/components/UI_Elements/Display/DataDisplay';
import { useRouter } from 'next/navigation';
import AddressDisplay from '@/components/UI_Elements/Display/AddressDisplay';

// this component displays all information about a specific customer

interface ViewCustomerProps {
  data: CustomerData;
}

const ViewCustomer = ({ data }: ViewCustomerProps) => {
  const router = useRouter();

  const { saveFormValues } = useContext(ModalContext);

  return (
    <div className="px-4.5 py-4 flex flex-col">
      <div className="flex flex-col gap-5 xl:flex-row">
        <div className="flex flex-col self-center w-full">
          <DataDisplay title="Status" text={data['status']} />
          <DataDisplay title="Customer Name" text={data['companyName']} />
          <DataDisplay title="Broker/ Rep" text={data['salesRepName']} />
          <DataDisplay title="Payment Terms" text={data['paymentTerms']} />
          <DataDisplay
            title="Current Credit Balance"
            text={data['creditLimit']}
          />
          <DataDisplay title="Currency" text={data['currency']} />
          <DataDisplay title="Federal ID" text={data['federalID']} />
        </div>

        <div className="flex flex-col self-center w-full">
          <DataDisplay title="Contact Name" text={data['contactName']} />
          <DataDisplay
            title="Secondary Contact"
            text={data['secondaryContactName']}
          />
          <DataDisplay title="Contact Email" text={data['contactEmail']} />
          <DataDisplay title="Telephone" text={data['contactTelephone']} />
          <DataDisplay title="Toll Free" text={data['contactTollFree']} />
          <DataDisplay title="Fax" text={data['contactFax']} />
          <DataDisplay title="Factoring Company" text={data['factor']} />
        </div>
      </div>

      <div className="flex flex-col self-center w-full">
        <AddressDisplay
          title={'Contact Address'}
          addressLine1={data['contactAddress']}
          addressLine2={data['contactAddressField2']}
          addressLine3={data['contactAddressField3']}
          city={data['contactCity']}
          state={data['contactState']}
          zip={data['contactPostCode']}
          country={data['contactCountry']}
        />
      </div>

      <div className="flex flex-col self-center w-full">
        <AddressDisplay
          title={'Billing Address'}
          addressLine1={data['billingAddress']}
          addressLine2={data['billingAddressField2']}
          addressLine3={data['billingAddressField3']}
          city={data['billingCity']}
          state={data['billingState']}
          zip={data['billingPostCode']}
          country={data['billingCountry']}
        />
      </div>

      <div className="flex flex-col gap-5 xl:flex-row">
        <div className="flex flex-col self-center w-full">
          <DataDisplay title="Billing Email" text={data['billingEmail']} />
        </div>

        <div className="flex flex-col self-center w-full">
          <DataDisplay
            title="Billing Telephone"
            text={data['billingTelephone']}
          />
        </div>
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
