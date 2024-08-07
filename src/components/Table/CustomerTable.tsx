'use client';

import { useContext, useState, useEffect } from 'react';
import { getCustomers } from '@/lib/dbActions';
import { ModalContext } from '@/Context/modalContext';
import Button from '../UI_Elements/buttons/Button';
import FormModal from '../Modals/FormModal';
import CustomerForm from '../Forms/CustomerForm';
import Table from '../UI_Elements/Table/Table';
import TableSkeleton from '../UI_Elements/Table/TableSkeleton';
import { TableSearch } from '../UI_Elements/Table/TableSearch';
import TableHeaderBlank from '../UI_Elements/Table/TableHeaderBlank';

// Define customer type
type CustomerData = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  address: string;
  addressAddOn: string | null;
  city: string;
  state: string;
  postCountry: string;
  postCode: string;
  telCountry: string;
  telephone: string;
};

// columns for the table
const columns = [
  { field: 'name', headerName: 'Company Name' },
  { field: 'address', headerName: 'Address' },
  { field: 'city', headerName: 'City' },
  { field: 'postCode', headerName: 'Postal/Zip' },
  { field: 'state', headerName: 'State' },
  { field: 'telephone', headerName: 'Telephone' },
];

const CustomerTable = (): JSX.Element => {
  const [customers, setCustomers] = useState<CustomerData[]>([]);
  const [status, setStatus] = useState<'loading' | 'fulfilled'>('loading'); // replace with redux
  const [searchValue, setSearchValue] = useState<string>(''); // search
  const [filteredValue, setFilteredValue] = useState<CustomerData[]>([]);

  const { toggleOpen } = useContext(ModalContext);

  // search
  function handleSearchFilter(customers: CustomerData[], value: string) {
    if (!value) return customers;

    return customers.filter((customer) =>
      Object.values(customer).some((field) =>
        field?.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
  }

  // Fetch customers from db
  // non-redux version
  useEffect(() => {
    const fetchCustomers = async () => {
      const data = await getCustomers();
      console.log('customers', data);
      setCustomers(data);
    };
    fetchCustomers();
    setStatus('fulfilled'); // replace with redux
  }, []);

  // Update filtered customers when customer or searchValue changes
  useEffect(() => {
    let updatedCustomers = [...customers];
    updatedCustomers = handleSearchFilter(updatedCustomers, searchValue);
    setFilteredValue(updatedCustomers);
  }, [customers, searchValue]);

  return (
    <>
      <div className="relative flex justify-end mb-6">
        <div className="absolute right-4 bottom-2">
          <Button onClick={toggleOpen}>Add Customer</Button>
        </div>
        <FormModal>
          <CustomerForm />
        </FormModal>
      </div>
      <TableHeaderBlank />
      <TableSearch
        placeholder={'Search...'}
        search={setSearchValue}
        // handle the dropdowns
      />

      {status === 'loading' ? (
        <TableSkeleton columns={columns} />
      ) : (
        // will have to add delete to this when that's merged
        <Table columns={columns} data={filteredValue} update={null} />
      )}
    </>
  );
};

export default CustomerTable;
