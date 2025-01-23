'use client';

import { useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { fetchBrokers } from '@/store/slices/brokerSlice';
import { ModalContext } from '@/context/modalContext';
import TableHeaderBlank from '../UI_Elements/Table/TableHeaderBlank';
import Table from '../UI_Elements/Table/Table';
import TableSkeleton from '../UI_Elements/Table/TableSkeleton';
import { TableSearch } from '../UI_Elements/Table/TableSearch';
import Button from '@ui/Buttons/Button';
import { BrokerData } from '@/types/brokerTypes';
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

  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  const {
    items: brokers,
    status,
    // error,
  } = useSelector((state: RootState) => state.brokers);

  const { saveFormValues } = useContext(ModalContext);

  // search
  function handleSearch(brokers: BrokerData[], value: string, status: string) {
    // status to uppercase
    const brokerStatus = status?.toUpperCase();

    // // Filter by status (if it's "Active" or "Inactive")
    let filteredBrokers = brokers;

    if (brokerStatus === 'ACTIVE' || brokerStatus === 'INACTIVE') {
      filteredBrokers = brokers.filter(
        (broker) => broker.status === brokerStatus
      );
    }

    // If no search value, return the filtered list by status
    if (!value) {
      return filteredBrokers;
    }

    // search across all fields with the given value
    if (status === 'All') {
      return filteredBrokers.filter((broker) =>
        Object.values(broker).some((brokerField) =>
          brokerField?.toString().toLowerCase().includes(value.toLowerCase())
        )
      );
    }

    // If status is specific (like "Active"), apply search value filtering
    return filteredBrokers.filter((broker) =>
      Object.values(broker).some((brokerField) =>
        brokerField?.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
  }

  // update specific field to search
  function updateField(field: string) {
    setSearchField(field);
  }

  // update broker
  // would it actually be easier to pull this info from redux?
  const updateBroker = async (id: string) => {
    // const data = await getBroker(id);
    // if (data !== null) {
    //   saveFormValues(data);
    //   router.push('/carriers/update-carrier/details');
    // }
  };

  useEffect(() => {
    dispatch(fetchBrokers());
  }, [dispatch]);

  // Update filtered brokers when broker or searchValue changes
  useEffect(() => {
    let updatedBrokers = [...brokers];
    updatedBrokers = handleSearch(updatedBrokers, searchValue, searchField);
    setFilteredValue(updatedBrokers);
  }, [brokers, searchValue, searchField]);

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
        search={setSearchValue}
        updateField={updateField}
      />

      {status === 'loading' ? (
        <TableSkeleton columns={columns} />
      ) : (
        <Table
          columns={columns}
          data={filteredValue}
          update={updateBroker}
          view={'/brokers/view/'}
        />
      )}
    </>
  );
}
