'use client';

import { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Table from '@ui/Table/Table';
import TableSkeleton from '@ui/Table/TableSkeleton';
import TableHeaderBlank from '@ui/Table/TableHeaderBlank';
import Searchbar from '@/components/UI_Elements/Searchbar';
import Dropdown from '@/components/UI_Elements/Input/Dropdown';
import Button from '@ui/buttons/Button';

// this page will need some sort of protections
// made with parts of other components

const columns = [
  { field: 'firstName', headerName: 'First Name' },
  { field: 'lastName', headerName: 'Last Name' },
  { field: 'email', headerName: 'Email Address' },
  {
    field: 'role',
    headerName: 'Role',
  },
];

export default function SettingsPage() {
  const [status, setStatus] = useState('Not Loading'); // replace with redux status

  const [searchValue, setSearchValue] = useState<string>(''); // search value
  const [searchField, setSearchField] = useState<string>('All'); // specific field if any
  const [filteredValue, setFilteredValue] = useState([]); // add type with redux

  return (
    <>
      <TableHeaderBlank />
      <div className="h-26 px-5 py-6 flex gap-4 bg-white dark:bg-grey-900 border-x border-t border-grey-300 dark:border-grey-700">
        <Searchbar
          placeholder={'Search...'}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            // const value = e.target.value;
            // search(value); // update the search value
          }}
        />
        <Dropdown
          label={'Sort By'}
          options={['Name']}
          searchField={() => {}} // update the field to search
        />

        <div className="relative flex items-center w-50">
          <Link href="">
            <Button>Add Member</Button>
          </Link>
        </div>
      </div>

      {status === 'loading' ? (
        <TableSkeleton columns={columns} />
      ) : (
        <Table
          columns={columns}
          data={filteredValue}
          update={() => null}
          view={''}
        />
      )}
    </>
  );
}
