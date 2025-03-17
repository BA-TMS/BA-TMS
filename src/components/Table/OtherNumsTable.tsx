'use client';

import { useContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { ModalContext } from '@/context/modalContext';
import TableHeaderBlank from '../UI_Elements/Table/TableHeaderBlank';
import Table from '../UI_Elements/Table/Table';
import TableSkeleton from '../UI_Elements/Table/TableSkeleton';
import { TableSearch } from '../UI_Elements/Table/TableSearch';
import Button from '@ui/Buttons/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { TruckData } from '@/types/truckTypes';

// this is passed to Table
const columns = [
  { field: 'truckNum', headerName: 'Truck Number' },
  { field: 'type', headerName: 'Truck Type' },
  { field: 'licensePlate', headerName: 'License Plate' },
];

export default function OtherNumsTable() {
  const [searchValue, setSearchValue] = useState<string>(''); // search value
  const [searchField, setSearchField] = useState<string>('All'); // specific field if any
  const [filteredValue, setFilteredValue] = useState<TruckData[]>([]);

  const router = useRouter();

  const {
    items: trucks,
    status,
    // error,
  } = useSelector((state: RootState) => state.trucks);

  const { saveFormValues } = useContext(ModalContext);

  // search
  function handleSearch(trucks: TruckData[], value: string, status: string) {
    // status to uppercase
    const truckStatus = status?.toUpperCase();

    // Filter by status (if it's "Active" or "Inactive")
    let filteredTrucks = trucks;

    if (truckStatus === 'ACTIVE' || truckStatus === 'INACTIVE') {
      filteredTrucks = trucks.filter((trucks) => trucks.status === truckStatus);
    }

    // If no search value, return the filtered list by status
    if (!value) {
      return filteredTrucks;
    }

    // search across all fields with the given value
    if (status === 'All') {
      return filteredTrucks.filter((trucks) =>
        Object.values(trucks).some((truckField) =>
          truckField?.toString().toLowerCase().includes(value.toLowerCase())
        )
      );
    }

    // If status is specific (like "Active"), apply search value filtering
    return filteredTrucks.filter((trucks) =>
      Object.values(trucks).some((truckField) =>
        truckField?.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
  }

  // update specific field to search
  function updateField(field: string) {
    setSearchField(field);
  }

  // update by selecting from redux and pass to form values
  const updateTruck = async (id: string) => {
    const data = trucks.find((truck) => truck.id === id);

    if (data) {
      saveFormValues(data);
      router.push('/trucks/update-truck/details');
    } else {
      console.error('Truck not found with ID:', id);
    }
  };

  // Update filtered trucks
  useEffect(() => {
    let updatedTrucks = [...trucks];
    updatedTrucks = handleSearch(updatedTrucks, searchValue, searchField);
    setFilteredValue(updatedTrucks);
  }, [trucks, searchValue, searchField]);

  return (
    <>
      <div className="relative flex justify-end mb-6">
        <div className="absolute right-4 bottom-2">
          <Link href="/trucks/add-truck/details">
            <Button>Add Truck</Button>
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
          update={updateTruck}
          view={'/trucks/view/'}
        />
      )}
    </>
  );
}
