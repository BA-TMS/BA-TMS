'use client';

import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
// import { ModalContext } from '@/context/modalContext';
import { UserContext } from '@/context/userContextProvider';
import Table from '../UI_Elements/Table/Table';
import TableSkeleton from '../UI_Elements/Table/TableSkeleton';
import TableHeaderBlank from '../UI_Elements/Table/TableHeaderBlank';
import { TableSearch } from '../UI_Elements/Table/TableSearch';
import Button from '../UI_Elements/Buttons/Button';
import Link from 'next/link';
// import { useRouter } from 'next/navigation';
import { fetchDrivers } from '@/store/slices/driverSlice';
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

  const dispatch = useDispatch<AppDispatch>();

  // const router = useRouter();

  const { user } = useContext(UserContext);

  const orgName = user?.user_metadata.org_name;

  const {
    items: drivers,
    status,
    // error,
  } = useSelector((state: RootState) => state.drivers);

  // const { saveFormValues } = useContext(ModalContext);

  // search
  function handleSearch(drivers: DriverData[], value: string, status: string) {
    // status to uppercase
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

    // search across all fields with the given value
    if (status === 'All') {
      return filteredDrivers.filter((driver) =>
        Object.values(driver).some((carrierField) =>
          carrierField?.toString().toLowerCase().includes(value.toLowerCase())
        )
      );
    }

    // If status is specific (like "Active"), apply search value filtering
    return filteredDrivers.filter((driver) =>
      Object.values(driver).some((driverField) =>
        driverField?.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
  }

  // update specific field to search
  function updateField(field: string) {
    setSearchField(field);
  }

  useEffect(() => {
    dispatch(fetchDrivers(orgName));
  }, [dispatch, orgName]);

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
          update={() => null}
          // view={'/carriers/view/'}
        />
      )}
    </>
  );
}
