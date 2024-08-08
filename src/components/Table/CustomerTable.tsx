'use client';

import { useContext, useState, useEffect } from 'react';
import { ModalContext } from '@/Context/modalContext';
import Button from '../UI_Elements/buttons/Button';
import FormModal from '../Modals/FormModal';
import CustomerForm from '../Forms/CustomerForm';
import Table from '../UI_Elements/Table/Table';
import TableSkeleton from '../UI_Elements/Table/TableSkeleton';
import { TableSearch } from '../UI_Elements/Table/TableSearch';
import TableHeaderBlank from '../UI_Elements/Table/TableHeaderBlank';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { fetchCustomers } from '@/store/slices/customerSlice';

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
  const [searchValue, setSearchValue] = useState<string>(''); // search
  const [filteredValue, setFilteredValue] = useState<CustomerData[]>([]);

  const dispatch = useDispatch<AppDispatch>();

  const {
    items: customers,
    status,
    // error, // are we going to handle errors?
  } = useSelector((state: RootState) => state.customers);

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
  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

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
        <FormModal formTitle="Add Customer">
          <CustomerForm />
        </FormModal>
      </div>
      <TableHeaderBlank />
      <TableSearch
        placeholder={'Search...'}
        dropdownLabel="Status"
        dropdownOptions={['Active', 'Inactive']}
        search={setSearchValue}
      />

      {status === 'loading' ? (
        <TableSkeleton columns={columns} />
      ) : (
        <Table
          columns={columns}
          data={filteredValue}
          update={null} // update w/ redux
          deleter={() => {}} // update component, don't delete customers
        />
      )}
    </>
  );
};

export default CustomerTable;
