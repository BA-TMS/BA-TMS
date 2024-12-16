'use client';

import { useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalContext } from '@/context/modalContext';
import Table from '../UI_Elements/Table/Table';
import TableSkeleton from '../UI_Elements/Table/TableSkeleton';
import { TableSearch } from '../UI_Elements/Table/TableSearch';
import TableHeaderBlank from '../UI_Elements/Table/TableHeaderBlank';
import Button from '../UI_Elements/Buttons/Button';
import { fetchCarriers } from '@/store/slices/carrierSlice';
import { CarrierData } from '@/types/carrierTypes';
import { AppDispatch, RootState } from '@/store/store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getCarrier } from '@/lib/dbActions';

// what fields do we want in the table?
const columns = [
  { field: 'carrierName', headerName: 'Carrier Name' },
  { field: 'contactName', headerName: 'Contact Name' },
  { field: 'contactTelephone', headerName: 'Telephone' },
  { field: 'city', headerName: 'City' },
  { field: 'state', headerName: 'State' },
];

export default function Carriers() {
  const [searchValue, setSearchValue] = useState<string>(''); // search value
  const [searchField, setSearchField] = useState<string>('All'); // specific field if any
  const [filteredValue, setFilteredValue] = useState<CarrierData[]>([]);

  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  const {
    items: carriers,
    status,
    // error,
  } = useSelector((state: RootState) => state.carriers);

  const { saveFormValues } = useContext(ModalContext);

  // search
  function handleSearch(
    carriers: CarrierData[],
    value: string,
    status: string
  ) {
    // status to uppercase
    const carrierStatus = status?.toUpperCase();

    // // Filter by status (if it's "Active" or "Inactive")
    let filteredCarriers = carriers;

    if (carrierStatus === 'ACTIVE' || carrierStatus === 'INACTIVE') {
      filteredCarriers = carriers.filter(
        (carrier) => carrier.status === carrierStatus
      );
    }

    // If no search value, return the filtered list by status
    if (!value) {
      return filteredCarriers;
    }

    // search across all fields with the given value
    if (status === 'All') {
      return filteredCarriers.filter((carrier) =>
        Object.values(carrier).some((carrierField) =>
          carrierField?.toString().toLowerCase().includes(value.toLowerCase())
        )
      );
    }

    // If status is specific (like "Active"), apply search value filtering
    return filteredCarriers.filter((carrier) =>
      Object.values(carrier).some((carrierField) =>
        carrierField?.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
  }

  // update specific field to search
  function updateField(field: string) {
    setSearchField(field);
  }

  // update carrier
  // would it actually be easier to pull this info from redux?
  const updateCarrier = async (id: string) => {
    const data = await getCarrier(id);
    if (data !== null) {
      saveFormValues(data);
      router.push('/carriers/update-carrier/details');
    }
  };

  useEffect(() => {
    dispatch(fetchCarriers());
  }, [dispatch]);

  // Update filtered carriers when carrier or searchValue changes
  useEffect(() => {
    let updatedCarriers = [...carriers];
    updatedCarriers = handleSearch(updatedCarriers, searchValue, searchField);
    setFilteredValue(updatedCarriers);
  }, [carriers, searchValue, searchField]);

  return (
    <>
      <div className="relative flex justify-end mb-6">
        <div className="absolute right-4 bottom-2">
          <Link href="/carriers/add-carrier/details">
            <Button>Add Carrier</Button>
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
          update={updateCarrier}
          view={'/carriers/view/'}
        />
      )}
    </>
  );
}
