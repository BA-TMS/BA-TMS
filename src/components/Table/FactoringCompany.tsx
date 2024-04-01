'use client';

import { useState, useEffect, useContext } from 'react';
import { ModalContext } from '@/Context/modalContext';
import FormModal from '../Modals/FormModal';
import FactoringCompanyForm from '../Forms/FactoringCompaniesForm';
import { getFactor } from '@/lib/dbActions';
import Table from './UI_Elements/Table';

type Factor = {
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

// this is passed to Table
const columns = [
  { field: 'name', headerName: 'Name' },
  { field: 'address', headerName: 'Name' },
  { field: 'addressAddOn', headerName: 'Name' },
  { field: 'city', headerName: 'Name' },
  { field: 'state', headerName: 'Name' },
  { field: 'postCountry', headerName: 'Name' },
  { field: 'postCode', headerName: 'Name' },
  { field: 'telCountry', headerName: 'Country Code' },
  { field: 'telephone', headerName: 'Phone Number' },
];

export default function FactoringCompany() {
  const [factor, setFactor] = useState<Factor[]>([]);
  const { toggleOpen } = useContext(ModalContext);

  const handleClick = () => {
    toggleOpen();
  };

  // data fetched and passed to Table
  useEffect(() => {
    const fetchFactor = async () => {
      const data = await getFactor();
      setFactor(data);
    };

    fetchFactor();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <button
        onClick={handleClick}
        className="float-right rounded-md bg-primary py-3 px-9 font-medium text-white hover:bg-opacity-80"
      >
        Add Factoring Company
      </button>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base leading-6 text-gray-900">
            Factoring Companies
          </h1>
          <p className="mt-2 text-md text-gray-700">
            A list of Factoring Companies
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <FormModal>
            <FactoringCompanyForm />
          </FormModal>
        </div>
      </div>
      <Table columns={columns} data={factor}></Table>
    </div>
  );
}
