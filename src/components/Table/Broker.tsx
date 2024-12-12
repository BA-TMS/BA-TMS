'use client';

import { useContext, useState, useEffect } from 'react';
import { ModalContext } from '@/context/modalContext';
import FormModal from '../Modals/FormModal';
import Table from '../UI_Elements/Table/Table';
import { getBrokers } from '@/lib/dbActions';
import CustomsBrokerForm from '../Forms/CustomsBrokerForm';

type Broker = {
  name: string;
  crossing: string;
  address: string;
  addressAddOn: string | null;
  city: string;
  state: string;
  postCountry: string;
  postCode: string;
  telCountry: string;
  telephone: string;
};

// this is passed to Table
const columns = [
  { field: 'name', headerName: 'Broker Name' },
  { field: 'crossing', headerName: 'Crossing' },
  { field: 'address', headerName: 'Address' },
  { field: 'addressAddOn', headerName: 'Address Line 2' },
  { field: 'city', headerName: 'City' },
  { field: 'state', headerName: 'State' },
  { field: 'postCountry', headerName: 'Country' },
  { field: 'postCode', headerName: 'Postal Code/ Zip' },
  { field: 'telCountry', headerName: 'Country Code' },
  { field: 'telephone', headerName: 'Phone Number' },
];

export default function Broker() {
  const [brokers, setBrokers] = useState<Broker[]>([]);
  const { toggleOpen } = useContext(ModalContext);

  const handleClick = () => {
    toggleOpen();
  };

  // data fetched and passed to Table
  useEffect(() => {
    const fetchBrokers = async () => {
      const data = await getBrokers();
      console.log('brokers', data);
      setBrokers(data);
    };

    fetchBrokers();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <button
        onClick={handleClick}
        className="float-right rounded-md bg-primary py-3 px-9 font-medium text-white hover:bg-opacity-80"
      >
        Add Broker
      </button>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base leading-6 text-gray-900">Customs Brokers</h1>
          <p className="mt-2 text-md text-gray-700">
            A list of all Customs Broker information.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <FormModal>
            <CustomsBrokerForm />
          </FormModal>
        </div>
      </div>
      <Table columns={columns} data={brokers}></Table>
    </div>
  );
}
