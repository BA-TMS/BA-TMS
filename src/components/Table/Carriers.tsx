'use client';

import { useState, useEffect, useContext } from 'react';
import { ModalContext } from '@/Context/modalContext';
import { getCarriers } from '@/lib/dbActions';
import CarrierForm from '../Forms/CarrierForm';
import FormModal from '@/components/Modals/FormModal';
import Table from './UI_Elements/Table';

type Carrier = {
  name: string;
  address: string;
  addressAddOn: string | null;
  city: string;
  state: string;
  postCountry: string;
  postCode: string;
  telCountry: string;
  telephone: string;
  dotId: string;
  factorId: string | null;
  taxId: string;
};

// this is passed to Table
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
  { field: 'dotId', headerName: 'DOT ID' },
  { field: 'factorId', headerName: 'Factor ID' },
  { field: 'taxId', headerName: 'Tax ID' },
];

export default function Carriers() {
  const [carriers, setCarriers] = useState<Carrier[]>([]);

  const { toggleOpen } = useContext(ModalContext);

  const handleClick = () => {
    toggleOpen();
  };

  // data fetched and passed to Table
  useEffect(() => {
    const fetchDrivers = async () => {
      const data = await getCarriers();
      setCarriers(data);
    };

    fetchDrivers();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <button
        onClick={handleClick}
        className="float-right rounded-md bg-primary py-3 px-9 font-medium text-white hover:bg-opacity-80"
      >
        Add Carrier
      </button>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base leading-6 text-gray-900">
            External Carriers
          </h1>
          <p className="mt-2 text-md text-gray-700">
            A list of all External Carrier information.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <FormModal>
            <CarrierForm />
          </FormModal>
        </div>
      </div>
      <Table columns={columns} data={carriers}></Table>
    </div>
  );
}
