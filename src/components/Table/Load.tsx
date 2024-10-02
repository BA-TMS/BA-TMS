'use client';

import { useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalContext } from '@/Context/modalContext';
import Table from '../UI_Elements/Table/Table';
import TableSkeleton from '../UI_Elements/Table/TableSkeleton';
import Button from '../UI_Elements/buttons/Button';
import { CustomTabs, TabData } from '../UI_Elements/Table/TableHeaderTabs';
import { TableSearch } from '../UI_Elements/Table/TableSearch';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { fetchLoads } from '@/store/slices/loadSlice';
import { AppDispatch, RootState } from '@/store/store';
import { getLoad } from '@/lib/dbActions';
import { deleteLoad } from '@/store/slices/loadSlice';
import { LoadData, loadFieldMap } from '@/types/loadTypes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

dayjs.extend(customParseFormat);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

interface StatusColors {
  OPEN: 'error';
  COVERED: 'warning';
  DISPATCHED: 'secondary';
  LOADING: 'default';
  ON_ROUTE: 'warning';
  UNLOADING: 'default';
  DELIVERED: 'primary';
  NEEDS_REVIEW: 'error';
  CLAIM: 'warning';
}

// Define status colors
const statusColors: StatusColors = {
  OPEN: 'error',
  COVERED: 'warning',
  DISPATCHED: 'secondary',
  LOADING: 'default',
  ON_ROUTE: 'warning',
  UNLOADING: 'default',
  DELIVERED: 'primary',
  NEEDS_REVIEW: 'error',
  CLAIM: 'warning',
};

// display status
const displayStatus: { [key: string]: string } = {
  OPEN: 'Open',
  COVERED: 'Covered',
  DISPATCHED: 'Dispatched',
  LOADING: 'Loading',
  ON_ROUTE: 'On Route',
  UNLOADING: 'Unloading',
  DELIVERED: 'Delivered',
  NEEDS_REVIEW: 'Needs Review',
  CLAIM: 'Claim',
};

// Function to get color by status
const getColorByStatus = (status: string) => {
  return (
    statusColors[status as keyof StatusColors] ||
    'text-grey-600 dark:text-white'
  );
};

// Define columns for the table

type LoadColumn = {
  field: string;
  headerName: string;
  cellRenderer?: (value: string) => JSX.Element;
};

const columns: LoadColumn[] = [
  { field: 'loadNum', headerName: 'Load Number' },
  { field: 'payOrderNum', headerName: 'PO Number' },
  { field: 'customer', headerName: 'Customer' },
  { field: 'shipDate', headerName: 'Date Shipped' },
  { field: 'deliveryDate', headerName: 'Date Delivered' },
  { field: 'carrier', headerName: 'Carrier' },
  { field: 'driver', headerName: 'Driver' },
  { field: 'shipper', headerName: 'Shipper' },
  { field: 'consignee', headerName: 'Consignee' },
  {
    field: 'status',
    headerName: 'Status',
    cellRenderer: (status: string) => {
      const textColor = getColorByStatus(status);
      const showStatus = displayStatus[status];
      return (
        <span
          className={`inline-block px-2 py-1 rounded-md text-text-xsm font-public font-bold text-${textColor}-dark bg-${textColor} bg-opacity-16`}
        >
          {showStatus}
        </span>
      );
    },
  },
];

// Options for seach dropdown - can only be values from header name
// this will need to be updated as we add more to load details
const dropdownOptions: string[] = [
  'All',
  'Load Number',
  'Customer',
  'Date Shipped',
  'Date Delivered',
  'Carrier',
  'Driver',
  'Shipper',
  'Consignee',
];

// Define tabs data
const tabsData: TabData[] = [
  { color: 'primary', value: 'All' },
  { color: 'error', value: 'Open' },
  { color: 'warning', value: 'Covered' },
  { color: 'secondary', value: 'Dispatched' },
  { color: 'default', value: 'Loading' },
  { color: 'warning', value: 'On Route' },
  { color: 'default', value: 'Unloading' },
  { color: 'primary', value: 'Delivered' },
  { color: 'error', value: 'Needs Review' },
  { color: 'warning', value: 'Claim' },
];

// pass this to table
function rowClass(row: Record<string, string>) {
  return row.status === 'NEEDS_REVIEW'
    ? '!text-bold bg-error-dark bg-opacity-16'
    : '';
}

const Load = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { saveFormValues } = useContext(ModalContext);

  const router = useRouter();

  const {
    items: loads,
    status,
    // error, // are we going to handle errors?
  } = useSelector((state: RootState) => state.loads);

  const [filteredLoads, setFilteredLoads] = useState<LoadData[]>([]);

  const [searchByDateRangeStart, setSearchByDateRangeStart] =
    useState<dayjs.Dayjs | null>(null);

  const [searchByDateRangeEnd, setSearchByDateRangeEnd] =
    useState<dayjs.Dayjs | null>(null);

  // value to search for
  const [searchValue, setSearchValue] = useState<string>('');

  // specific field to search if any
  const [searchField, setSearchField] = useState<string>('All');

  // status of load
  const [statusValue, setStatusValue] = useState<string>('All');

  // Fetch loads from the API
  useEffect(() => {
    dispatch(fetchLoads());
  }, [dispatch]);

  // Update filtered loads when loads or filters change
  useEffect(() => {
    let updatedLoads = [...loads];
    updatedLoads = searchByDateRangeFilter(
      updatedLoads,
      searchByDateRangeStart,
      searchByDateRangeEnd
    );
    updatedLoads = handleSearch(updatedLoads, searchValue, searchField); // narrow down focus with searchField
    updatedLoads = searchByStatusFilter(updatedLoads, statusValue);
    setFilteredLoads(updatedLoads);
  }, [
    loads,
    searchByDateRangeStart,
    searchByDateRangeEnd,
    searchValue,
    statusValue,
    searchField,
  ]);

  // Function to filter by date range
  function searchByDateRangeFilter(
    incLoads: LoadData[],
    startDate: dayjs.Dayjs | null,
    endDate: dayjs.Dayjs | null
  ) {
    if (!startDate && !endDate) return incLoads;

    return incLoads.filter((item) => {
      const shippedDate = dayjs(item.shipDate);
      const deliveryDate = dayjs(item.deliveryDate);
      const isAfterStart = startDate
        ? shippedDate.isSameOrAfter(startDate, 'day')
        : true;
      const isBeforeEnd = endDate
        ? deliveryDate.isSameOrBefore(endDate, 'day')
        : true;
      return isAfterStart && isBeforeEnd;
    });
  }

  // update specific field to search
  // passing this to TableSearch
  function updateField(field: string) {
    setSearchField(field);
  }

  // Function to handle search filter
  function handleSearch(incLoads: LoadData[], value: string, field: string) {
    if (!value) return incLoads;

    // map the user-friendly field name to the actual data field name
    const fieldKey = loadFieldMap[field];

    if (field === 'All') {
      // Search across all fields
      return incLoads.filter((load) =>
        Object.values(load).some((field) => {
          return field?.toString().toLowerCase().includes(value.toLowerCase());
        })
      );
    } else {
      // search specific field - map it to get correct key name

      return incLoads.filter((load) => {
        return load[fieldKey]
          ?.toString()
          .toLowerCase()
          .includes(value.toLowerCase());
      });
    }
  }

  // Function to filter by status
  function searchByStatusFilter(incLoads: LoadData[], value: string) {
    if (value === 'All') return incLoads;

    const statusMapping: { [key: string]: string } = {
      Open: 'OPEN',
      Covered: 'COVERED',
      Dispatched: 'DISPATCHED',
      Loading: 'LOADING',
      'On Route': 'ON_ROUTE',
      Unloading: 'UNLOADING',
      Delivered: 'DELIVERED',
      'Needs Review': 'NEEDS_REVIEW',
      Claim: 'CLAIM',
    };

    return incLoads.filter((load) => load.status === statusMapping[value]);
  }

  // Function to get the count of loads by status
  const getCount = (value: string) => {
    if (value === 'All') return loads.length;

    const statusMapping: { [key: string]: string } = {
      Open: 'OPEN',
      Covered: 'COVERED',
      Dispatched: 'DISPATCHED',
      Loading: 'LOADING',
      'On Route': 'ON_ROUTE',
      Unloading: 'UNLOADING',
      Delivered: 'DELIVERED',
      'Needs Review': 'NEEDS_REVIEW',
      Claim: 'CLAIM',
    };

    return loads.filter((load) => load.status === statusMapping[value]).length;
  };

  // open update-load and populate form with values
  const updateLoad = async (id: string) => {
    const data = await getLoad(id);
    if (data !== null) {
      saveFormValues(data);
      router.push('/dispatch/update-load/details');
    }
  };

  // delete a load
  const loadDelete = async (id: string) => {
    try {
      await dispatch(deleteLoad(id as unknown as number)).unwrap();
    } catch (error) {
      console.error('Error deleting load:', error);
    }
  };

  return (
    <>
      <div className="relative flex justify-end mb-6">
        <div className="absolute right-4 bottom-2">
          <Link href="/dispatch/add-load/details">
            <Button>Add Load</Button>
          </Link>
        </div>
      </div>
      <CustomTabs tabs={tabsData} sort={setStatusValue} count={getCount} />
      <TableSearch
        dropdownOptions={dropdownOptions}
        updateField={updateField}
        search={setSearchValue} // set the value to search for
        dateSearch={(startDate, endDate) => {
          setSearchByDateRangeStart(startDate);
          setSearchByDateRangeEnd(endDate);
        }}
        placeholder={'Search client or invoice number...'}
      />

      {status === 'loading' ? (
        <TableSkeleton columns={columns} />
      ) : (
        <Table
          columns={columns}
          data={filteredLoads}
          update={updateLoad}
          deleter={loadDelete}
          extraRowClass={rowClass}
        />
      )}
    </>
  );
};

export default Load;
