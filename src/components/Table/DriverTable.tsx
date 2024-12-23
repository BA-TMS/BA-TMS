'use client';

import { useState, useEffect } from 'react';
// import { ModalContext } from '@/context/modalContext';
import Table from '../UI_Elements/Table/Table';
import TableSkeleton from '../UI_Elements/Table/TableSkeleton';
import TableHeaderBlank from '../UI_Elements/Table/TableHeaderBlank';
import { TableSearch } from '../UI_Elements/Table/TableSearch';
import Button from '../UI_Elements/Buttons/Button';
import Link from 'next/link';
// import { useRouter } from 'next/navigation';
import { getDrivers } from '@/lib/dbActions';

type Driver = {
  name: string;
  license: string;
  telCountry: string;
  telephone: string;
  employerId: string;
};

// this is passed to Table
const columns = [
  { field: 'name', headerName: 'Name' },
  { field: 'telCountry', headerName: 'Country Code' },
  { field: 'telephone', headerName: 'Phone Number' },
  { field: 'license', headerName: 'License Number' },
  { field: 'employerId', headerName: 'Employer ID' },
];

export default function Drivers() {
  const [searchValue, setSearchValue] = useState<string>(''); // search value
  const [searchField, setSearchField] = useState<string>('All'); // specific field if any
  const [filteredValue, setFilteredValue] = useState<Driver[]>([]);

  // replace with redux
  const [status, setStatus] = useState('loading');

  // data fetched and passed to Table
  useEffect(() => {
    const fetchDrivers = async () => {
      const data = await getDrivers();
      console.log('drivers', data);
      setFilteredValue(data);
    };

    fetchDrivers();
    setStatus('');
  }, []);

  return (
    <>
      <div className="relative flex justify-end mb-6">
        <div className="absolute right-4 bottom-2">
          <Link href="">
            <Button>Add Driver</Button>
          </Link>
        </div>
      </div>
      <TableHeaderBlank />
      <TableSearch
        placeholder={'Search...'}
        dropdownLabel="Status"
        dropdownOptions={['Active', 'Inactive', 'All']}
        search={setSearchValue}
        updateField={() => null}
      />

      {status === 'loading' ? (
        <TableSkeleton columns={columns} />
      ) : (
        <Table
          columns={columns}
          data={filteredValue}
          update={() => null}
          // view={'/carriers/view/'}
        />
      )}
    </>
  );
}
