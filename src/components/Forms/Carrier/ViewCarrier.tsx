'use Client';

import { useContext } from 'react';
import { ModalContext } from '@/Context/modalContext';
import { useRouter } from 'next/navigation';
import { CarrierData } from '@/types/carrierTypes';
import Button from '@/components/UI_Elements/buttons/Button';
import DataDisplay from '@/components/UI_Elements/Display/DataDisplay';
import AddressDisplay from '@/components/UI_Elements/Display/AddressDisplay';

// this component displays information about a specific carrier

interface ViewCarrierProps {
  data: CarrierData | undefined;
}

const ViewCarrier = ({ data }: ViewCarrierProps) => {
  const router = useRouter();

  const { saveFormValues } = useContext(ModalContext);

  console.log('VIEW', data);

  if (!data) {
    return (
      <div className="flex flex-col h-full">
        <div className="py-5 flex-grow">
          <p className="body2 text-error-dark text-center">
            Oops! Something went wrong- Could not find External Carrier.
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

  return (
    <div className="py-4 flex flex-col">
      <div className="flex flex-col gap-5 xl:flex-row">
        <div className=" w-full">
          <DataDisplay title="Carrier Name" text={data['carrierName']} />
        </div>
        <div className="w-full md:w-1/3">
          <DataDisplay title="Status" text={data['status']} />
        </div>
      </div>

      <div className="flex flex-col gap-5 xl:flex-row">
        <div className="flex flex-col w-full xl:w-1/2">
          <DataDisplay title="Contact Name" text={data['contactName']} />
        </div>

        <div className="flex flex-col w-full xl:w-1/2">
          <DataDisplay title="Contact Email" text={data['contactEmail']} />
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="w-full md:w-1/3">
          <DataDisplay title="Telephone" text={data['contactTelephone']} />
        </div>
        <div className="w-full md:w-1/3">
          <DataDisplay title="Toll Free" text={data['contactTollFree']} />
        </div>
        <div className="w-full md:w-1/3">
          <DataDisplay title="Fax" text={data['contactFax']} />
        </div>
      </div>

      <div className="flex flex-col gap-5 xl:flex-row">
        <div className="flex flex-col self-center w-full">
          <DataDisplay title="Payment Terms" text={data['paymentTerms']} />
          <DataDisplay
            title="Docket Number"
            text={
              data['docketNumType']
                ? data['docketNumType'] + ' ' + data['docketNumber']
                : ''
            }
          />
          <DataDisplay title="DOT ID#" text={data['dotId']} />
        </div>

        <div className="flex flex-col self-center w-full">
          <DataDisplay title="URS #" text={data['ursNumber']} />
          <DataDisplay title="Tax ID#" text={data['taxId']} />

          <DataDisplay title="Factoring Company" text={data['factor']} />
        </div>
      </div>

      <div className="flex flex-col self-center w-full">
        <AddressDisplay
          title={'Address'}
          addressLine1={data['address']}
          addressLine2={data['addressField2']}
          addressLine3={data['addressField3']}
          city={data['city']}
          state={data['state']}
          zip={data['postCode']}
          country={data['postCountry']}
        />
      </div>

      <div className="flex flex-col gap-5 xl:flex-row">
        <div className="flex flex-col w-full xl:w-1/2">
          <DataDisplay
            title="FMCSA Insurance Company"
            text={data['CarrierInsurance']?.fmcsaInsCompany}
          />
        </div>

        <div className="flex flex-col w-full xl:w-1/2">
          <DataDisplay
            title="FMCSA Policy #"
            text={data['CarrierInsurance']?.fmcsaInsPolicy}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="w-full md:w-1/3">
          <DataDisplay
            title="FMCSA Type"
            text={data['CarrierInsurance']?.fmcsaType}
          />
        </div>
        <div className="w-full md:w-1/3">
          <DataDisplay
            title="FMCSA Coverage $"
            text={data['CarrierInsurance']?.fmcsaCoverage}
          />
        </div>
        <div className="w-full md:w-1/3">
          <DataDisplay
            title="FMCSA Telephone"
            text={data['CarrierInsurance']?.fmcsaTelephone}
          />
        </div>
        <div className="w-full md:w-1/3">
          <DataDisplay
            title="FMCSA Expiration"
            text={data['CarrierInsurance']?.fmcsaInsExpiration}
          />
        </div>
      </div>

      {/* Liability Insurance */}
      <div className="mt-5 flex flex-col gap-5 xl:flex-row">
        <div className="flex flex-col w-full xl:w-1/2">
          <DataDisplay
            title="Liability Insurance Company"
            text={data['CarrierInsurance']?.liabilityCompany}
          />
        </div>

        <div className="flex flex-col w-full xl:w-1/2">
          <DataDisplay
            title="Liability Policy #"
            text={data['CarrierInsurance']?.liabilityPolicy}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="w-full md:w-1/3">
          <DataDisplay
            title="Liability Contact"
            text={data['CarrierInsurance']?.liabilityContact}
          />
        </div>
        <div className="w-full md:w-1/3">
          <DataDisplay
            title="Liability Telephone"
            text={data['CarrierInsurance']?.liabilityTelephone}
          />
        </div>
        <div className="w-full md:w-1/3">
          <DataDisplay
            title="Liability Expiration Date"
            text={data['CarrierInsurance']?.liabilityExpiration}
          />
        </div>
      </div>

      {/* Auto Insurance */}
      <div className="mt-5 flex flex-col gap-5 xl:flex-row">
        <div className="flex flex-col w-full xl:w-1/2">
          <DataDisplay
            title="Auto Insurance Company"
            text={data['CarrierInsurance']?.autoInsCompany}
          />
        </div>

        <div className="flex flex-col w-full xl:w-1/2">
          <DataDisplay
            title="Auto Policy #"
            text={data['CarrierInsurance']?.autoInsPolicy}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="w-full md:w-1/3">
          <DataDisplay
            title="Auto Contact"
            text={data['CarrierInsurance']?.autoInsContact}
          />
        </div>
        <div className="w-full md:w-1/3">
          <DataDisplay
            title="Auto Telephone"
            text={data['CarrierInsurance']?.autoInsTelephone}
          />
        </div>
        <div className="w-full md:w-1/3">
          <DataDisplay
            title="Auto Expiration Date"
            text={data['CarrierInsurance']?.autoInsExpiration}
          />
        </div>
      </div>

      {/* Cargo Company */}
      <div className="mt-5 flex flex-col gap-5 xl:flex-row">
        <div className="flex flex-col w-full xl:w-1/2">
          <DataDisplay
            title="Cargo Company"
            text={data['CarrierInsurance']?.cargoCompany}
          />
        </div>

        <div className="flex flex-col w-full xl:w-1/2">
          <DataDisplay
            title="Cargo Policy #"
            text={data['CarrierInsurance']?.cargoPolicy}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="w-full md:w-1/3">
          <DataDisplay
            title="Cargo Contact"
            text={data['CarrierInsurance']?.cargoContact}
          />
        </div>
        <div className="w-full md:w-1/3">
          <DataDisplay
            title="Cargo Telephone"
            text={data['CarrierInsurance']?.cargoTelephone}
          />
        </div>
        <div className="w-full md:w-1/3">
          <DataDisplay
            title="Cargo WSIB #"
            text={data['CarrierInsurance']?.cargoWSIB}
          />
        </div>
        <div className="w-full md:w-1/3">
          <DataDisplay
            title="Cargo Expiration"
            text={data['CarrierInsurance']?.cargoExpiration}
          />
        </div>
      </div>

      <DataDisplay title="Notes" text={data['notes']} />

      <div className="py-3.5 gap-2 border-t border-grey-300 dark:border-grey-700 flex justify-between sticky bottom-0 bg-white dark:bg-grey-900 z-10">
        <Button
          type="button"
          variant="outline"
          intent="default"
          onClick={() => {
            // send data to context
            saveFormValues(data);
            router.push('/carriers/update-carrier/details');
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

export default ViewCarrier;
