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

  const { toggleOpen } = useContext(ModalContext);

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

      <TableSearch
        placeholder={'Search client or invoice number...'}
        search={() => {}} // add search function
      />

      {status === 'loading' ? (
        <TableSkeleton columns={columns} />
      ) : (
        // will have to add delete to this when that's merged
        <Table columns={columns} data={customers} update={null} />
      )}
    </>
  );
};

export default CustomerTable;
