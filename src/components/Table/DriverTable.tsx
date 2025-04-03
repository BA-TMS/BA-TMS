'use client';

import { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { ModalContext } from '@/context/modalContext';
import Table from '../UI_Elements/Table/Table';
import TableSkeleton from '../UI_Elements/Table/TableSkeleton';
import TableHeaderBlank from '../UI_Elements/Table/TableHeaderBlank';
import { TableSearch } from '../UI_Elements/Table/TableSearch';
import Button from '../UI_Elements/buttons/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DriverData } from '@/types/driverTypes';

// this is passed to Table
const columns = [
  { field: 'name', headerName: 'Name' },
  { field: 'driverTwo.name', headerName: 'Driver Two Name' },
  { field: 'telephone', headerName: 'Phone Number' },
  { field: 'employer', headerName: 'Employer' },
];

export default function Drivers() {
  const [searchValue, setSearchValue] = useState<string>(''); // search value
  const [searchField, setSearchField] = useState<string>('All'); // specific field if any
  const [filteredValue, setFilteredValue] = useState<DriverData[]>([]);

  const router = useRouter();

  const {
    items: drivers,
    status,
    // error,
  } = useSelector((state: RootState) => state.drivers);

  const { saveFormValues } = useContext(ModalContext);

  // search
  function handleSearch(drivers: DriverData[], value: string, status: string) {
    // Convert status to uppercase for consistency
    const driverStatus = status?.toUpperCase();

    // Filter by status (if it's "Active" or "Inactive")
    let filteredDrivers = drivers;

    if (driverStatus === 'ACTIVE' || driverStatus === 'INACTIVE') {
      filteredDrivers = drivers.filter(
        (driver) => driver.status === driverStatus
      );
    }

    // If no search value, return the filtered list by status
    if (!value) {
      return filteredDrivers;
    }

    // recursive function
    function deepSearch(object: unknown, searchValue: string): boolean {
      if (object === null || object === undefined) {
        return false;
      }

      if (typeof object === 'object') {
        // recursively search nested objectects or arrays
        return Object.values(object).some((value) =>
          deepSearch(value, searchValue)
        );
      }

      return object
        .toString()
        .toLowerCase()
        .includes(searchValue.toLowerCase());
    }

    return filteredDrivers.filter((driver) => deepSearch(driver, value));
  }

  // update specific field to search
  function updateField(field: string) {
    setSearchField(field);
  }

  // update driver
  // this could probably be refactored more
  const updateDriver = (id: string) => {
    const data = drivers.find((driver) => driver.id === id); // select from redux

    if (data) {
      saveFormValues(data);
      router.push('/drivers/update-driver/details');
    } else {
      console.error('Driver not found with ID:', id);
    }
  };

  // Update filtered drivers when driver or searchValue changes
  useEffect(() => {
    let updatedDrivers = [...drivers];
    updatedDrivers = handleSearch(updatedDrivers, searchValue, searchField);
    setFilteredValue(updatedDrivers);
  }, [drivers, searchValue, searchField]);

  return (
    <>
      <div className="relative flex justify-end mb-6">
        <div className="absolute right-4 bottom-2">
          <Link href="/drivers/add-driver/details">
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
        updateField={updateField}
      />

      {status === 'loading' ? (
        <TableSkeleton columns={columns} />
      ) : (
        <Table
          columns={columns}
          data={filteredValue}
          update={updateDriver}
          view={'/drivers/view/'}
        />
      )}
    </>
  );
}
