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

  // search
  function handleSearch(
    carriers: CarrierData[],
    value: string,
    status: string
  ) {
    // status to uppercase
    // const customerStatus = status?.toUpperCase();

    // // Filter by status (if it's "Active" or "Inactive")
    const filteredCarriers = carriers;

    // if (customerStatus === 'ACTIVE' || customerStatus === 'INACTIVE') {
    //   filteredCustomers = customers.filter(
    //     (customer) => customer.status === customerStatus
    //   );
    // }

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
          data={filteredValue}
          update={updateCarrier}
          view={'/customers/view/'}
        />
      )}
    </>
  );
}
