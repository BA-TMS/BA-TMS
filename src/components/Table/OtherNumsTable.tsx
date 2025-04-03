'use client';

import { useContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { ModalContext } from '@/context/modalContext';
import TableHeaderBlank from '../UI_Elements/Table/TableHeaderBlank';
import Table from '../UI_Elements/Table/Table';
import TableSkeleton from '../UI_Elements/Table/TableSkeleton';
import { TableSearch } from '../UI_Elements/Table/TableSearch';
import Button from '@/components/UI_Elements/buttons/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { NumData } from '@/types/otherNumTypes';

// this is passed to Table
const columns = [
  { field: 'name', headerName: 'Other Name' },
  { field: 'dispatch', headerName: 'On Dispatch Board' },
];

export default function OtherNumsTable() {
  const [searchValue, setSearchValue] = useState<string>(''); // search value
  const [searchField, setSearchField] = useState<string>('All'); // specific field if any
  const [filteredValue, setFilteredValue] = useState<NumData[]>([]);

  const router = useRouter();

  const {
    items: otherNumbers,
    status,
    // error,
  } = useSelector((state: RootState) => state.otherNumbers);

  const { saveFormValues } = useContext(ModalContext);

  // search
  function handleSearch(numbers: NumData[], value: string, status: string) {
    // status to uppercase
    const numStatus = status?.toUpperCase();

    // Filter by status (if it's "Active" or "Inactive")
    let filteredNums = numbers;

    if (numStatus === 'ACTIVE' || numStatus === 'INACTIVE') {
      filteredNums = numbers.filter((numbers) => numbers.status === numStatus);
    }

    // If no search value, return the filtered list by status
    if (!value) {
      return filteredNums;
    }

    // search across all fields with the given value
    if (status === 'All') {
      return filteredNums.filter((numbers) =>
        Object.values(numbers).some((numField) =>
          numField?.toString().toLowerCase().includes(value.toLowerCase())
        )
      );
    }

    // If status is specific (like "Active"), apply search value filtering
    return filteredNums.filter((numbers) =>
      Object.values(numbers).some((numField) =>
        numField?.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
  }

  // update specific field to search
  function updateField(field: string) {
    setSearchField(field);
  }

  // update by selecting from redux and pass to form values
  const updateNumber = async (id: string) => {
    const data = otherNumbers.find((otherNum) => otherNum.id === id);

    if (data) {
      saveFormValues(data);
      router.push('/other-numbers/update-number/details');
    } else {
      console.error('Other Number not found with ID:', id);
    }
  };

  useEffect(() => {
    let updatedNums = [...otherNumbers];
    updatedNums = handleSearch(updatedNums, searchValue, searchField);
    setFilteredValue(updatedNums);
  }, [otherNumbers, searchValue, searchField]);

  return (
    <>
      <div className="relative flex justify-end mb-6">
        <div className="absolute right-4 bottom-2">
          <Link href="/other-numbers/add-number/details">
            <Button>Add Other Number</Button>
          </Link>
        </div>
      </div>

      <TableHeaderBlank />
      <TableSearch
        placeholder={'Search...'}
        dropdownLabel="Status"
        dropdownOptions={['Active', 'Inactive', 'All']}
        search={setSearchValue}
        updateField={updateField}
      />

      {status === 'loading' ? (
        <TableSkeleton columns={columns} />
      ) : (
        <Table
          columns={columns}
          data={filteredValue}
          update={updateNumber}
          view={'/other-numbers/view/'}
        />
      )}
    </>
  );
}
