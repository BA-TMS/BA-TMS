'use client';

import { useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { ModalContext } from '@/context/modalContext';
import TableHeaderBlank from '../UI_Elements/Table/TableHeaderBlank';
import Table from '../UI_Elements/Table/Table';
import TableSkeleton from '../UI_Elements/Table/TableSkeleton';
import { TableSearch } from '../UI_Elements/Table/TableSearch';
import Button from '@ui/Buttons/Button';
import { BrokerData } from '@/types/brokerTypes';
import { getBrokers } from '@/lib/dbActions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// this is passed to Table
const columns = [
  { field: 'name', headerName: 'Broker Name' },
  { field: 'crossing', headerName: 'Crossing' },
  { field: 'telephone', headerName: 'Phone Number' },
  { field: 'tollFree', headerName: 'Toll Free' },
];

export default function Broker() {
  const [searchValue, setSearchValue] = useState<string>(''); // search value
  const [searchField, setSearchField] = useState<string>('All'); // specific field if any
  const [filteredValue, setFilteredValue] = useState<BrokerData[]>([]);

  // delete when redux
  const [status, setStatus] = useState('loading');

  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  const { saveFormValues } = useContext(ModalContext);

  // data fetched and passed to Table
  // TODO: Switch to redux
  useEffect(() => {
    const fetchBrokers = async () => {
      const data = await getBrokers();
      console.log('brokers', data);
      setStatus('fulfilled');
      setFilteredValue(data);
    };

    fetchBrokers();
  }, []);

  return (
    <>
      <div className="relative flex justify-end mb-6">
        <div className="absolute right-4 bottom-2">
          <Link href="/brokers/add-broker/details">
            <Button>Add Broker</Button>
          </Link>
        </div>
      </div>

      <TableHeaderBlank />
      <TableSearch
        placeholder={'Search...'}
        dropdownLabel="Status"
        dropdownOptions={['Active', 'Inactive', 'All']}
        search={() => null}
        updateField={() => null}
      />

      {status === 'loading' ? (
        <TableSkeleton columns={columns} />
      ) : (
        <Table
          columns={columns}
          data={filteredValue}
          update={() => null}
          view={'/brokers/view/'}
        />
      )}
    </>
  );
}
