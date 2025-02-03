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
import { FactorData } from '@/types/factorTypes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// this is passed to Table
const columns = [
  { field: 'name', headerName: 'Name' },
  { field: 'address', headerName: 'Address' },
  { field: 'city', headerName: 'City' },
  { field: 'state', headerName: 'State' },
  { field: 'postCode', headerName: 'Zip' },
  { field: 'telephone', headerName: 'Phone Number' },
];

export default function FactoringCompany() {
  const [searchValue, setSearchValue] = useState<string>(''); // search value
  const [searchField, setSearchField] = useState<string>('All'); // specific field if any
  const [filteredValue, setFilteredValue] = useState<FactorData[]>([]);

  const router = useRouter();

  const {
    items: factors,
    status,
    // error,
  } = useSelector((state: RootState) => state.factors);

  const { saveFormValues } = useContext(ModalContext);

  // search
  function handleSearch(factors: FactorData[], value: string, status: string) {
    // status to uppercase
    const factorStatus = status?.toUpperCase();

    // Filter by status (if it's "Active" or "Inactive")
    let filteredFactors = factors;

    if (factorStatus === 'ACTIVE' || factorStatus === 'INACTIVE') {
      filteredFactors = factors.filter(
        (factor) => factor.status === factorStatus
      );
    }

    // If no search value, return the filtered list by status
    if (!value) {
      return filteredFactors;
    }

    // search across all fields with the given value
    if (status === 'All') {
      return filteredFactors.filter((factor) =>
        Object.values(factor).some((factorField) =>
          factorField?.toString().toLowerCase().includes(value.toLowerCase())
        )
      );
    }

    // If status is specific (like "Active"), apply search value filtering
    return filteredFactors.filter((factor) =>
      Object.values(factor).some((factorField) =>
        factorField?.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
  }

  // update specific field to search
  function updateField(field: string) {
    setSearchField(field);
  }

  // update broker
  // select from redux and pass to form values
  // const updateBroker = async (id: string) => {
  //   const data = brokers.find((broker) => broker.id === id);

  //   if (data) {
  //     saveFormValues(data);
  //     router.push('/brokers/update-broker/details');
  //   } else {
  //     console.error('Customs Broker not found with ID:', id);
  //   }
  // };

  // Update filtered factors
  useEffect(() => {
    let updatedFactors = [...factors];
    updatedFactors = handleSearch(updatedFactors, searchValue, searchField);
    setFilteredValue(updatedFactors);
  }, [factors, searchValue, searchField]);

  return (
    <>
      <div className="relative flex justify-end mb-6">
        <div className="absolute right-4 bottom-2">
          <Link href="/factors/add-factor/details">
            <Button>Add Factoring Co</Button>
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
          // update={updateBroker}
          view={'/factors/view/'}
        />
      )}
    </>
  );
}
