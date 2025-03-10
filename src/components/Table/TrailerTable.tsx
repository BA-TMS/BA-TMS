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
import { TrailerData } from '@/types/trailerTypes';

// this is passed to Table
const columns = [
  { field: 'type', headerName: 'Trailer Type' },
  { field: 'licensePlate', headerName: 'License Plate' },
];

export default function TrailerTable() {
  const [searchValue, setSearchValue] = useState<string>(''); // search value
  const [searchField, setSearchField] = useState<string>('All'); // specific field if any
  const [filteredValue, setFilteredValue] = useState<TrailerData[]>([]);

  const router = useRouter();

  const {
    items: trailers,
    status,
    // error,
  } = useSelector((state: RootState) => state.trailers);

  const { saveFormValues } = useContext(ModalContext);

  // search
  function handleSearch(
    trailers: TrailerData[],
    value: string,
    status: string
  ) {
    // status to uppercase
    const trailerStatus = status?.toUpperCase();

    // Filter by status (if it's "Active" or "Inactive")
    let filteredTrailers = trailers;

    if (trailerStatus === 'ACTIVE' || trailerStatus === 'INACTIVE') {
      filteredTrailers = trailers.filter(
        (trailers) => trailers.status === trailerStatus
      );
    }

    // If no search value, return the filtered list by status
    if (!value) {
      return filteredTrailers;
    }

    // search across all fields with the given value
    if (status === 'All') {
      return filteredTrailers.filter((trailers) =>
        Object.values(trailers).some((trailerField) =>
          trailerField?.toString().toLowerCase().includes(value.toLowerCase())
        )
      );
    }

    // If status is specific (like "Active"), apply search value filtering
    return filteredTrailers.filter((trailers) =>
      Object.values(trailers).some((trailerField) =>
        trailerField?.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
  }

  // update specific field to search
  function updateField(field: string) {
    setSearchField(field);
  }

  // update by selecting from redux and pass to form values
  // const updateTruck = async (id: string) => {
  //   const data = trailers.find((truck) => truck.id === id);

  //   if (data) {
  //     saveFormValues(data);
  //     router.push('/trailers/update-truck/details');
  //   } else {
  //     console.error('Truck not found with ID:', id);
  //   }
  // };

  // Update filtered trailers
  useEffect(() => {
    let updatedTrailers = [...trailers];
    updatedTrailers = handleSearch(updatedTrailers, searchValue, searchField);
    setFilteredValue(updatedTrailers);
  }, [trailers, searchValue, searchField]);

  return (
    <>
      <div className="relative flex justify-end mb-6">
        <div className="absolute right-4 bottom-2">
          <Link href="/trailer/add-trailer/details">
            <Button>Add Trailer</Button>
          </Link>
        </div>
      </div>

      <TableHeaderBlank />
      <TableSearch
        placeholder={'Search...'}
        dropdownLabel="Status"
        dropdownOptions={['Active', 'Inactive', 'Not Available', 'All']}
        search={setSearchValue}
        updateField={updateField}
      />

      {status === 'loading' ? (
        <TableSkeleton columns={columns} />
      ) : (
        <Table
          columns={columns}
          data={filteredValue}
          update={() => {}}
          view={'/trailers/view/'}
        />
      )}
    </>
  );
}
