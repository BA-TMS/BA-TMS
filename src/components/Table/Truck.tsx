'use client';

import { useContext, useState, useEffect } from 'react';
import { ModalContext } from '@/Context/modalContext';
import FormModal from '../Modals/FormModal';
import TruckForm from '../Forms/TruckForm';
import Table from '../UI_Elements/Table';
import { getTrucks } from '@/lib/dbActions';

type Truck = {
  truckNum: string;
  licensePlate: string;
  plateExpiry: Date;
  inspectionExpiry: Date;
  type: string;
  iftaLicensed: boolean;
};

// this is passed to Table
const columns = [
  { field: 'truckNum', headerName: 'Truck Number' },
  { field: 'licensePlate', headerName: 'License Plate' },
  { field: 'type', headerName: 'Truck Type' },
  { field: 'plateExpiry', headerName: 'Plate Expiry' },
  { field: 'inspectionExpiry', headerName: 'Inspection Expiry' },
  { field: 'iftaLicensed', headerName: 'IFTA Licensed?' },
];

export default function Truck() {
  const [trucks, setTrucks] = useState<Truck[]>([]);

  const { toggleOpen } = useContext(ModalContext);

  const handleClick = () => {
    toggleOpen();
  };

  // data fetched and passed to Table
  useEffect(() => {
    const fetchTrucks = async () => {
      const data = await getTrucks();
      console.log('trucks', data);
      setTrucks(data);
    };

    fetchTrucks();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <button
        onClick={handleClick}
        className="float-right rounded-md bg-primary py-3 px-9 font-medium text-white hover:bg-opacity-80"
      >
        Add Truck
      </button>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base leading-6 text-gray-900">Trucks</h1>
          <p className="mt-2 text-md text-gray-700">
            A list of all the truck information.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <FormModal>
            <TruckForm />
          </FormModal>
        </div>
      </div>
      <Table columns={columns} data={trucks}></Table>
    </div>
  );
}
