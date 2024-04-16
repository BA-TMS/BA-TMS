'use client';

import { useContext, useState, useEffect } from 'react';
import { ModalContext } from '@/Context/modalContext';
import FormModal from '../Modals/FormModal';
import TrailerForm from '../Forms/TrailerForm';
import Table from '../UI_Elements/Table';
import { getTrailers } from '@/lib/dbActions';

type Trailer = {
  type: string;
  licensePlate: string;
  plateExpiry: Date;
  inspectionExpiry: Date;
  status: string;
};

// this is passed to Table
const columns = [
  { field: 'licensePlate', headerName: 'License Plate' },
  { field: 'type', headerName: 'Trailer Type' },
  { field: 'plateExpiry', headerName: 'Plate Expiry' },
  { field: 'inspectionExpiry', headerName: 'Inspection Expiry' },
  { field: 'status', headerName: 'Status' },
];

export default function Trailer() {
  const [trailers, setTrailers] = useState<Trailer[]>([]);
  const { toggleOpen } = useContext(ModalContext);

  const handleClick = () => {
    toggleOpen();
  };

  // data fetched and passed to Table
  useEffect(() => {
    const fetchTrailers = async () => {
      const data = await getTrailers();
      console.log('trailer', data);
      setTrailers(data);
    };

    fetchTrailers();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <button
        onClick={handleClick}
        className="float-right rounded-md bg-primary py-3 px-9 font-medium text-white hover:bg-opacity-80"
      >
        Add Trailer
      </button>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base leading-6 text-gray-900">Trailers</h1>
          <p className="mt-2 text-md text-gray-700">
            A list of all the trailer information.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <FormModal>
            <TrailerForm />
          </FormModal>
        </div>
      </div>
      <Table columns={columns} data={trailers}></Table>
    </div>
  );
}
