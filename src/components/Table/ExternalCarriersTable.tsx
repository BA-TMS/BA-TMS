'use client';

import { useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalContext } from '@/Context/modalContext';
import Table from '../UI_Elements/Table/Table';
import TableSkeleton from '../UI_Elements/Table/TableSkeleton';
import { TableSearch } from '../UI_Elements/Table/TableSearch';
import TableHeaderBlank from '../UI_Elements/Table/TableHeaderBlank';
import Button from '../UI_Elements/buttons/Button';
import { fetchCarriers } from '@/store/slices/carrierSlice';
import { CarrierData } from '@/types/carrierTypes';
import { AppDispatch, RootState } from '@/store/store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getCarrier } from '@/lib/dbActions';

const columns = [
  { field: 'name', headerName: 'Name' },
  { field: 'address', headerName: 'Address' },
  { field: 'addressAddOn', headerName: 'Address Line 2' },
  { field: 'city', headerName: 'City' },
  { field: 'state', headerName: 'State' },
  { field: 'postCountry', headerName: 'Country' },
  { field: 'postCode', headerName: 'Postal Code/ Zip' },
  { field: 'telCountry', headerName: 'Country Code' },
  { field: 'telephone', headerName: 'Phone Number' },
  { field: 'dotId', headerName: 'DOT ID' },
  { field: 'factorId', headerName: 'Factor ID' },
  { field: 'taxId', headerName: 'Tax ID' },
];

const dropdownOptions: string[] = ['All', 'Name'];

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

  // update specific field to search
  // passing this to TableSearch
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
        dropdownLabel="Sort By"
        dropdownOptions={dropdownOptions}
        search={setSearchValue}
        updateField={updateField}
      />

      {status === 'loading' ? (
        <TableSkeleton columns={columns} />
      ) : (
        <Table
          columns={columns}
          // data={filteredValue}
          data={carriers}
          update={updateCarrier}
          view={'/customers/view/'}
        />
      )}
    </>
  );
}
