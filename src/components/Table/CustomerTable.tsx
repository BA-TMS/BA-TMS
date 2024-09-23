'use client';

import { useContext, useState, useEffect } from 'react';
import { ModalContext } from '@/Context/modalContext';
import Button from '../UI_Elements/buttons/Button';
import FormModal from '../Modals/FormModal';
import CustomerForm from '../Forms/Customer/CustomerForm';
import Table from '../UI_Elements/Table/Table';
import TableSkeleton from '../UI_Elements/Table/TableSkeleton';
import { TableSearch } from '../UI_Elements/Table/TableSearch';
import TableHeaderBlank from '../UI_Elements/Table/TableHeaderBlank';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { fetchCustomers } from '@/store/slices/customerSlice';
import { getCustomer } from '@/lib/dbActions';
import { CustomerData } from '@/types/customerTypes';
import Link from 'next/link';

// columns for the table
const columns = [
  { field: 'companyName', headerName: 'Company Name' },
  { field: 'status', headerName: 'Status' },
  { field: 'contactName', headerName: 'Contact Name' },
  { field: 'secondaryContactName', headerName: 'Secondary Contact Name' },
  { field: 'salesRepName', headerName: 'Sales Rep' },
  { field: 'contactEmail', headerName: 'Contact Email' },
  { field: 'contactTelephone', headerName: 'Contact Telephone' },
  { field: 'contactTollFree', headerName: 'Toll Free' },
  { field: 'contactFax', headerName: 'Contact Fax' },
  { field: 'contactCountry', headerName: 'Contact Country' },
  { field: 'contactAddress', headerName: 'Contact Address' },
  { field: 'contactAddressField2', headerName: 'Contact Address 2' },
  { field: 'contactAddressField3', headerName: 'Contact Address 3' },
  { field: 'contactCity', headerName: 'Contact City' },
  { field: 'contactState', headerName: 'Contact State' },
  { field: 'contactPostCode', headerName: 'Contact Post Code/ Zip' },

  { field: 'billingEmail', headerName: 'Billing Email' },
  { field: 'billingTelephone', headerName: 'Billing Telephone' },
  { field: 'billingCountry', headerName: 'Billing Country' },
  { field: 'billingAddress', headerName: 'Billing Address' },
  { field: 'billingAddressField2', headerName: 'Billing Address 2' },
  { field: 'billingAddressField3', headerName: 'Billing Address 3' },
  { field: 'billingCity', headerName: 'Billing City' },
  { field: 'billingState', headerName: 'Billing State' },
  { field: 'billingPostCode', headerName: 'Billing Post Code/ Zip' },

  { field: 'currency', headerName: 'Currency' },
  { field: 'paymentTerms', headerName: 'Payment Terms' },
  { field: 'creditLimit', headerName: 'Credit Limit' },
  { field: 'federalID', headerName: 'Federal ID' },
  {
    field: 'factor',
    headerName: 'Factoring Company',
  },
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

  const { toggleOpen, saveFormValues } = useContext(ModalContext);

  // search
  function handleSearchFilter(customers: CustomerData[], value: string) {
    if (!value) return customers;

    if (value === 'All') return customers;

    // handle sorting by specific value
    if (value === 'Active' || value === 'Inactive') {
      return customers.filter(
        (customer) => customer.status === value.toUpperCase()
      );
    }

    return customers.filter((customer) =>
      Object.values(customer).some((field) =>
        field?.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
  }

  // update customer
  const updateCustomer = async (id: string) => {
    const data = await getCustomer(id);
    // toggleOpen(data);
    if (data !== null) {
      saveFormValues(data);
      toggleOpen();
    }
  };

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
          <Link href="/customers/add-customer/details">
            <Button>Add Customer</Button>
          </Link>
        </div>
        <FormModal formTitle="Add Customer">
          <CustomerForm />
        </FormModal>
      </div>
      <TableHeaderBlank />
      <TableSearch
        placeholder={'Search...'}
        dropdownLabel="Status"
        dropdownOptions={['Active', 'Inactive', 'All']}
        search={setSearchValue}
      />

      {status === 'loading' ? (
        <TableSkeleton columns={columns} />
      ) : (
        <Table columns={columns} data={filteredValue} update={updateCustomer} />
      )}
    </>
  );
};

export default CustomerTable;
