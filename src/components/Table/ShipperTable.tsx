'use client';

import { useContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { ModalContext } from '@/context/modalContext';
import TableHeaderBlank from '../UI_Elements/Table/TableHeaderBlank';
import Table from '../UI_Elements/Table/Table';
import TableSkeleton from '../UI_Elements/Table/TableSkeleton';
import { TableSearch } from '../UI_Elements/Table/TableSearch';
import Button from '@/components/UI_Elements/Buttons/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShipperData } from '@/types/shipperTypes';

// this is passed to Table
const columns = [
  { field: 'name', headerName: 'Name' },
  { field: 'address', headerName: 'Address' },
  { field: 'city', headerName: 'City' },
  { field: 'state', headerName: 'State' },
  { field: 'postCode', headerName: 'Zip' },
  { field: 'telephone', headerName: 'Phone Number' },
];

export default function ShipperTable() {
  const [searchValue, setSearchValue] = useState<string>(''); // search value
  const [searchField, setSearchField] = useState<string>('All'); // specific field if any
  const [filteredValue, setFilteredValue] = useState<ShipperData[]>([]);

  const router = useRouter();

  const {
    items: shippers,
    status,
    // error,
  } = useSelector((state: RootState) => state.shippers);

  const { saveFormValues } = useContext(ModalContext);

  // search
  function handleSearch(
    shippers: ShipperData[],
    value: string,
    status: string
  ) {
    // status to uppercase
    const shipperStatus = status?.toUpperCase();

    // Filter by status (if it's "Active" or "Inactive")
    let filteredShippers = shippers;

    if (shipperStatus === 'ACTIVE' || shipperStatus === 'INACTIVE') {
      filteredShippers = shippers.filter(
        (shipper) => shipper.status === shipperStatus
      );
    }

    // If no search value, return the filtered list by status
    if (!value) {
      return filteredShippers;
    }

    // search across all fields with the given value
    if (status === 'All') {
      return filteredShippers.filter((shipper) =>
        Object.values(shipper).some((shipperField) =>
          shipperField?.toString().toLowerCase().includes(value.toLowerCase())
        )
      );
    }

    // If status is specific (like "Active"), apply search value filtering
    return filteredShippers.filter((shipper) =>
      Object.values(shipper).some((shipperField) =>
        shipperField?.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
  }

  // update specific field to search
  function updateField(field: string) {
    setSearchField(field);
  }

  // update by selecting from redux and pass to form values
  const updateShipper = async (id: string) => {
    const data = shippers.find((shipper) => shipper.id === id);

    if (data) {
      saveFormValues(data);
      router.push('/shippers/update-shipper/details');
    } else {
      console.error('Shipper not found with ID:', id);
    }
  };

  // Update filtered shippers
  useEffect(() => {
    let updatedShippers = [...shippers];
    updatedShippers = handleSearch(updatedShippers, searchValue, searchField);
    setFilteredValue(updatedShippers);
  }, [shippers, searchValue, searchField]);

  return (
    <>
      <div className="relative flex justify-end mb-6">
        <div className="absolute right-4 bottom-2">
          <Link href="/shippers/add-shipper/details">
            <Button>Add Shipper</Button>
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
          update={updateShipper}
          view={'/shippers/view/'}
        />
      )}
    </>
  );
}
