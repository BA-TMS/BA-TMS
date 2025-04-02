'use client';

import { useContext, useState, useEffect } from 'react';
import { ModalContext } from '@/context/modalContext';
import FormModal from '../Modals/FormModal';
import ThirdPartyForm from '../Forms/ThirdPartyForm';
import Table from '../UI_Elements/Table/Table';
import { getThirdParty } from '@/lib/dbActions';

type Billee = {
  name: string;
  address: string;
  addressAddOn: string | null;
  city: string;
  state: string;
  postCountry: string;
  postCode: string;
  telCountry: string;
  telephone: string;
};

const columns = [
  { field: 'name', headerName: 'Name' },
  { field: 'address', headerName: 'Address' },
  { field: 'addressAddOn', headerName: 'Address Line 2' },
  { field: 'city', headerName: 'City' },
  { field: 'state', headerName: 'State' },
  { field: 'postCountry', headerName: 'Country' },
  { field: 'postCode', headerName: 'Postal Code/ Zip' },
  { field: 'telCountry', headerName: 'Country Code' },
  { field: 'telephone', headerName: 'Phone Number' },
];

export default function ThirdParty() {
  const [billee, setBillee] = useState<Billee[]>([]);
  const { toggleOpen } = useContext(ModalContext);

  const handleClick = () => {
    toggleOpen();
  };

  useEffect(() => {
    const fetchBillee = async () => {
      const data = await getThirdParty();
      setBillee(data);
    };

    fetchBillee();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <button
        onClick={handleClick}
        className="float-right rounded-md bg-primary py-3 px-9 font-medium text-white hover:bg-opacity-80"
      >
        Add Billee
      </button>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base leading-6 text-gray-900">
            Third Party Billing
          </h1>
          <p className="mt-2 text-md text-gray-700">
            Third party billing information.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <FormModal formTitle="Add Third Party Billee">
            <ThirdPartyForm />
          </FormModal>
        </div>
      </div>
      <Table
        columns={columns}
        data={billee}
        update={(id: string) =>
          console.log(`Update function called for ID: ${id}`)
        }
      ></Table>
    </div>
  );
}
