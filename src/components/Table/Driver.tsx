'use client';

import { useContext } from 'react';
import { ModalContext } from '@/Context/modalContext';
import FormModal from '../Modals/FormModal';
import DriverForm from '../Forms/DriverForm';
import Table from './Table';

type Driver = {
  name: string;
  license: string;
  telCountry: string;
  telephone: string;
  employerId: string;
};

const data = [
  {
    id: 'b636897e-6878-4e4d-b9a8-fb9c72aae52d',
    createdAt: '2024-03-06T20:21:37.490Z',
    updatedAt: '2024-03-06T20:21:37.490Z',
    name: 'Carrier1',
    address: '70 Wall St',
    addressAddOn: null,
    city: 'Wethersfield',
    state: 'CT',
    postCountry: 'USA',
    postCode: '06109',
    telCountry: '1',
    telephone: '9987654321',
    dotId: '42',
    taxId: '42',
    factorId: null,
  },
  {
    id: '1da2d9af-18dc-4e65-a54e-7fbf1fe16769',
    createdAt: '2024-03-06T20:21:37.495Z',
    updatedAt: '2024-03-06T20:21:37.495Z',
    name: 'Carrier2',
    address: '79 Mayflower St',
    addressAddOn: null,
    city: 'Smyrna',
    state: 'GA',
    postCountry: 'USA',
    postCode: '30080',
    telCountry: '1',
    telephone: '1112223333',
    dotId: '7',
    taxId: '7',
    factorId: null,
  },
  {
    id: 'cd229a64-b92f-4f16-bd96-1c3facee9c51',
    createdAt: '2024-03-06T21:34:09.869Z',
    updatedAt: '2024-03-06T21:34:09.869Z',
    name: 'Best Carrier',
    address: '555 Best Carrier Way',
    addressAddOn: null,
    city: 'Los Angeles',
    state: 'California',
    postCountry: 'USA',
    postCode: '91607',
    telCountry: '1',
    telephone: '5555555555',
    dotId: '12345678',
    taxId: '',
    factorId: '692f3189-f8e2-4dce-b4c5-c8d24168b7b5',
  },
  {
    id: 'b542a2e3-27f4-408d-a5e7-e3059378fd55',
    createdAt: '2024-03-07T19:26:52.907Z',
    updatedAt: '2024-03-07T19:26:52.907Z',
    name: 'Carrier New',
    address: '5555 address Road',
    addressAddOn: null,
    city: 'Long Beach',
    state: 'California',
    postCountry: 'USA',
    postCode: '55555',
    telCountry: '1',
    telephone: '5555555555',
    dotId: '14235645',
    taxId: '',
    factorId: '692f3189-f8e2-4dce-b4c5-c8d24168b7b5',
  },
  {
    id: 'b6733658-ce29-4bd1-aedb-92458ad731ba',
    createdAt: '2024-03-07T19:30:46.353Z',
    updatedAt: '2024-03-07T19:30:46.353Z',
    name: 'Also a Carrier',
    address: '5555 address lane',
    addressAddOn: 'Ste 14',
    city: 'Calabasas',
    state: 'California',
    postCountry: 'USA',
    postCode: '55555',
    telCountry: '1',
    telephone: '5555555555',
    dotId: '45671234',
    taxId: '',
    factorId: '692f3189-f8e2-4dce-b4c5-c8d24168b7b5',
  },
  {
    id: '515dd52e-b2a7-47c1-8d75-198ae1da58ba',
    createdAt: '2024-03-07T19:37:22.878Z',
    updatedAt: '2024-03-07T19:37:22.878Z',
    name: 'Swift',
    address: '5555 Karma Way',
    addressAddOn: null,
    city: 'New York',
    state: 'New York',
    postCountry: 'USA',
    postCode: '55555',
    telCountry: '1',
    telephone: '5555555555',
    dotId: '09175695',
    taxId: '',
    factorId: '423780df-9d28-48bd-a9e8-5b86b4d4d9fe',
  },
  {
    id: '182cfbd0-700e-4663-b68d-e7a4ce901f07',
    createdAt: '2024-03-07T19:41:36.585Z',
    updatedAt: '2024-03-07T19:41:36.585Z',
    name: 'Kelce',
    address: '5555 Chiefs Rd',
    addressAddOn: 'Ste 87',
    city: 'Kansas City',
    state: 'Missouri',
    postCountry: 'USA',
    postCode: '55555',
    telCountry: '1',
    telephone: '5555555555',
    dotId: '87878787',
    taxId: '',
    factorId: '423780df-9d28-48bd-a9e8-5b86b4d4d9fe',
  },
];

const tableHeaders = ['Name', 'Tel Country', 'Telephone', 'Employer'];

export default function Driver() {
  const { isOpen, toggleOpen } = useContext(ModalContext);

  const handleClick = () => {
    toggleOpen();
  };

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
      <Table columns={tableHeaders} data={data}></Table>
    </div>
  );
}
