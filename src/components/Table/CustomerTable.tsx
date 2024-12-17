'use client';

import { useContext, useState, useEffect } from 'react';
import { ModalContext } from '@/context/modalContext';
import Button from '../UI_Elements/Buttons/Button';
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
import { useRouter } from 'next/navigation';

// columns for the table
const columns = [
  { field: 'id', headerName: 'Customer Id' },
  { field: 'companyName', headerName: 'Customer Name' },
  { field: 'salesRepName', headerName: 'Broker/ Rep' },
  { field: 'contactCity', headerName: 'City' },
  { field: 'contactState', headerName: 'State' },
  { field: 'paymentTerms', headerName: 'Payment Terms' },
  { field: 'creditBalance', headerName: 'Current Credit Balance' },
  { field: 'creditLimit', headerName: 'Credit Limit' },

  // { field: 'status', headerName: 'Status' },
  // { field: 'contactName', headerName: 'Contact Name' },
  // { field: 'secondaryContactName', headerName: 'Secondary Contact Name' },
  // { field: 'salesRepName', headerName: 'Sales Rep' },
  // { field: 'contactEmail', headerName: 'Contact Email' },
  // { field: 'contactTelephone', headerName: 'Contact Telephone' },
  // { field: 'contactTollFree', headerName: 'Toll Free' },
  // { field: 'contactFax', headerName: 'Contact Fax' },
  // { field: 'contactCountry', headerName: 'Contact Country' },
  // { field: 'contactAddress', headerName: 'Contact Address' },
  // { field: 'contactAddressField2', headerName: 'Contact Address 2' },
  // { field: 'contactAddressField3', headerName: 'Contact Address 3' },
  // { field: 'contactCity', headerName: 'Contact City' },
  // { field: 'contactState', headerName: 'Contact State' },
  // { field: 'contactPostCode', headerName: 'Contact Post Code/ Zip' },

  // { field: 'billingEmail', headerName: 'Billing Email' },
  // { field: 'billingTelephone', headerName: 'Billing Telephone' },
  // { field: 'billingCountry', headerName: 'Billing Country' },
  // { field: 'billingAddress', headerName: 'Billing Address' },
  // { field: 'billingAddressField2', headerName: 'Billing Address 2' },
  // { field: 'billingAddressField3', headerName: 'Billing Address 3' },
  // { field: 'billingCity', headerName: 'Billing City' },
  // { field: 'billingState', headerName: 'Billing State' },
  // { field: 'billingPostCode', headerName: 'Billing Post Code/ Zip' },

  // { field: 'currency', headerName: 'Currency' },
  // { field: 'paymentTerms', headerName: 'Payment Terms' },
  // { field: 'creditLimit', headerName: 'Credit Limit' },
  // { field: 'federalID', headerName: 'Federal ID' },
  // { field: 'factor', headerName: 'Factoring Company' },
];

const CustomerTable = (): JSX.Element => {
  const [searchValue, setSearchValue] = useState<string>(''); // search value
  const [searchField, setSearchField] = useState<string>('All'); // specific field if any
  const [filteredValue, setFilteredValue] = useState<CustomerData[]>([]);

  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  const {
    items: customers,
    status,
    // error, // are we going to handle errors?
  } = useSelector((state: RootState) => state.customers);

  const { saveFormValues } = useContext(ModalContext);

  // search
  function handleSearch(
    customers: CustomerData[],
    value: string,
    status: string
  ) {
    // status to uppercase
    const customerStatus = status?.toUpperCase();

    // Filter by status (if it's "Active" or "Inactive")
    let filteredCustomers = customers;
    if (customerStatus === 'ACTIVE' || customerStatus === 'INACTIVE') {
      filteredCustomers = customers.filter(
        (customer) => customer.status === customerStatus
      );
    }

    // If no search value, return the filtered list by status
    if (!value) {
      return filteredCustomers;
    }

    // search across all fields with the given value
    if (status === 'All') {
      return filteredCustomers.filter((customer) =>
        Object.values(customer).some((customerField) =>
          customerField?.toString().toLowerCase().includes(value.toLowerCase())
        )
      );
    }

    // If status is specific (like "Active"), apply search value filtering
    return filteredCustomers.filter((customer) =>
      Object.values(customer).some((customerField) =>
        customerField?.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
  }

  // update specific field to search
  // passing this to TableSearch
  function updateField(field: string) {
    setSearchField(field);
  }

  // update customer
  // clicking this will send data to the context
  // open update route and populate form with values
  const updateCustomer = async (id: string) => {
    const data = await getCustomer(id);
    if (data !== null) {
      saveFormValues(data);
      router.push('/customers/update-customer/details');
    }
  };

  // Fetch customers from db
  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  // Update filtered customers when customer or searchValue changes
  useEffect(() => {
    let updatedCustomers = [...customers];
    updatedCustomers = handleSearch(updatedCustomers, searchValue, searchField);
    setFilteredValue(updatedCustomers);
  }, [customers, searchValue, searchField]);

  return (
    <>
      <div className="relative flex justify-end mb-6">
        <div className="absolute right-4 bottom-2">
          <Link href="/customers/add-customer/details">
            <Button>Add Customer</Button>
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
          update={updateCustomer}
          view={'/customers/view/'}
        />
      )}
    </>
  );
};

export default CustomerTable;
