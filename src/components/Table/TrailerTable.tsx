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
import { TrailerData } from '@/types/trailerTypes';

// this is passed to Table
const columns = [
  { field: 'type', headerName: 'Trailer Type' },
  { field: 'licensePlate', headerName: 'License Plate' },
  { field: 'plateExpiry', headerName: 'Plate Expiry' },
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
    // status to uppercase and remove spaces in case of 'Not Available'
    const trailerStatus = status?.toUpperCase().replaceAll(' ', '');

    let filteredTrailers = trailers;

    if (
      trailerStatus === 'ACTIVE' ||
      trailerStatus === 'INACTIVE' ||
      trailerStatus === 'NOTAVAILABLE'
    ) {
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
  const updateTrailer = async (id: string) => {
    const data = trailers.find((trailer) => trailer.id === id);

    if (data) {
      saveFormValues(data);
      router.push('/trailers/update-trailer/details');
    } else {
      console.error('Trailer not found with ID:', id);
    }
  };

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
          <Link href="/trailers/add-trailer/details">
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
          update={updateTrailer}
          view={'/trailers/view/'}
        />
      )}
    </>
  );
}
