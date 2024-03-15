'use client';

import { useContext, useState, useEffect } from 'react';
import { ModalContext } from '@/Context/modalContext';
import FormModal from '../Modals/FormModal';
import DriverForm from '../Forms/DriverForm';
import Table from './Table';
import { getLoads } from '@/lib/dbActions';

type Load = {
  id: string;
  ownerId: string;
  loadNum: string;
  carrierId: string;
  driverId: string | null;
  customerId: string;
  originId: string | null;
  destId: string | null;
  status: string;
  // carrier: {name: string};
  carrier: string;
  driver: { name: string } | null;
  // customer: {name: string};
  customer: string;
  // shipper: {name: string} | null;
  shipper: string | null;
  // consignee: { name: string } | null;
  consignee: string | null;
};

// this is passed to Table
const columns = [
  { field: 'loadNum', headerName: 'Load Number' },
  { field: 'carrier', headerName: 'Carrier' },
  { field: 'shipper', headerName: 'Shipper' },
  { field: 'consignee', headerName: 'Consignee'},
  { field: 'status', headerName: 'Status'}
];

export default function Load() {
  const [loads, setLoads] = useState<Load[]>([]);
  const { toggleOpen } = useContext(ModalContext);

  const handleClick = () => {
    toggleOpen();
  };

  // data fetched and passed to Table
  useEffect(() => {
    const fetchLoads = async () => {
      const data = await getLoads();
      for (const load of data) {
        load.carrier = load.carrier.name;
        load.customer = load.customer.name;
        if (load.shipper) load.shipper = load.shipper.name;
        if (load.consignee) load.consignee = load.consignee.name;
      }
      console.log('loads', data);
      setLoads(data);
    };

    fetchLoads();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <button
        onClick={handleClick}
        className="float-right rounded-md bg-primary py-3 px-9 font-medium text-white hover:bg-opacity-80"
      >
        Add Driver
      </button>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base leading-6 text-gray-900">Drivers</h1>
          <p className="mt-2 text-md text-gray-700">
            A list of all the driver information.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <FormModal>
            <DriverForm />
          </FormModal>
        </div>
      </div>
      <Table columns={columns} data={loads}></Table>
    </div>
  );
}
