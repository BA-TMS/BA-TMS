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
import { ConsigneeData } from '@/types/consigneeTypes';

const columns = [
  { field: 'name', headerName: 'Name' },
  { field: 'address', headerName: 'Address' },
  { field: 'city', headerName: 'City' },
  { field: 'state', headerName: 'State' },
  { field: 'postCode', headerName: 'Zip' },
  { field: 'telephone', headerName: 'Phone Number' },
];

export default function ConsigneeTable() {
  const [searchValue, setSearchValue] = useState<string>(''); // search value
  const [searchField, setSearchField] = useState<string>('All'); // specific field if any
  const [filteredValue, setFilteredValue] = useState<ConsigneeData[]>([]);

  const router = useRouter();

  const {
    items: consignees,
    status,
    // error,
  } = useSelector((state: RootState) => state.consignees);

  const { saveFormValues } = useContext(ModalContext);

  // search
  function handleSearch(
    consignees: ConsigneeData[],
    value: string,
    status: string
  ) {
    // status to uppercase
    const consigneeStatus = status?.toUpperCase();

    // Filter by status (if it's "Active" or "Inactive")
    let filteredConsignees = consignees;

    if (consigneeStatus === 'ACTIVE' || consigneeStatus === 'INACTIVE') {
      filteredConsignees = consignees.filter(
        (consignee) => consignee.status === consigneeStatus
      );
    }

    // If no search value, return the filtered list by status
    if (!value) {
      return filteredConsignees;
    }

    // search across all fields with the given value
    if (status === 'All') {
      return filteredConsignees.filter((consignee) =>
        Object.values(consignee).some((consigneeField) =>
          consigneeField?.toString().toLowerCase().includes(value.toLowerCase())
        )
      );
    }

    // If status is specific (like "Active"), apply search value filtering
    return filteredConsignees.filter((consignee) =>
      Object.values(consignee).some((consigneeField) =>
        consigneeField?.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
  }

  // update specific field to search
  function updateField(field: string) {
    setSearchField(field);
  }

  // update by selecting from redux and pass to form values
  const updateConsignee = async (id: string) => {
    const data = consignees.find((consignee) => consignee.id === id);

    if (data) {
      saveFormValues(data);
      router.push('/consignees/update-consignee/details');
    } else {
      console.error('Consignee not found with ID:', id);
    }
  };

  // Update filtered consignees
  useEffect(() => {
    let updatedconsignees = [...consignees];
    updatedconsignees = handleSearch(
      updatedconsignees,
      searchValue,
      searchField
    );
    setFilteredValue(updatedconsignees);
  }, [consignees, searchValue, searchField]);

  return (
    <>
      <div className="relative flex justify-end mb-6">
        <div className="absolute right-4 bottom-2">
          <Link href="/consignees/add-consignee/details">
            <Button>Add Consignee</Button>
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
          update={updateConsignee}
          view={'/consignees/view/'}
        />
      )}
    </>
  );
}
