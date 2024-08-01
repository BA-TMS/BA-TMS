// components/Load.tsx
import { useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalContext } from '@/Context/modalContext';
import FormModal from '../Modals/FormModal';
import LoadForm from '../Forms/LoadForm';
import Table from '../UI_Elements/Table/Table';
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

dayjs.extend(customParseFormat);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

// Define Load type
type Load = {
  id: string;
  ownerId: string;
  loadNum: string;
  payOrderNum: string;
  shipDate: string;
  deliveryDate: string;
  carrierId: string;
  driverId: string | null;
  customerId: string;
  originId: string | null;
  destId: string | null;
  status: string;
  carrier: string;
  driver: string | null;
  customer: string;
  shipper: string | null;
  consignee: string | null;
};

// Define status colors
const statusColors = {
  ON_ROUTE: 'warning',
  COVERED: 'warning',
  OPEN: 'primary',
  REFUSED: 'secondary',
  PENDING: 'error',
};

// Function to get color by status
const getColorByStatus = (status: string) => {
  return statusColors[status] || 'text-grey-600 dark:text-white';
};

// Define columns for the table
const columns = [
  { field: 'loadNum', headerName: 'Load Number' },
  { field: 'payOrderNum', headerName: 'PO Number' },
  { field: 'customer', headerName: 'Customer' },
  { field: 'shipDate', headerName: 'Date Shipped' },
  { field: 'deliveryDate', headerName: 'Date Delivered' },
  { field: 'carrier', headerName: 'Carrier' },
  { field: 'shipper', headerName: 'Shipper' },
  { field: 'consignee', headerName: 'Consignee' },
  {
    field: 'status',
    headerName: 'Status',
    cellRenderer: (status: string) => {
      const textColor = getColorByStatus(status);
      return (
        <span
          className={`inline-block px-2 py-1 rounded-md text-text-xsm font-public font-bold text-${textColor}-dark bg-${textColor} bg-opacity-16`}
        >
          {status}
        </span>
      );
    },
  },
];

// Define tabs data
const tabsData: TabData[] = [
  { color: 'info', value: 'All' },
  { color: 'warning', value: 'On Route' },
  { color: 'primary', value: 'Open' },
  { color: 'secondary', value: 'Refused' },
  { color: 'warning', value: 'Covered' },
  { color: 'error', value: 'Pending' },
  { color: 'default', value: 'Dispatched' },
  { color: 'default', value: '(Un)Loading' },
];

const Load = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { toggleOpen } = useContext(ModalContext);

  const {
    items: loads,
    status,
    error,
  } = useSelector((state: RootState) => state.loads);

  const [filteredLoads, setFilteredLoads] = useState<Load[]>([]);
  const [searchByDateRangeStart, setSearchByDateRangeStart] =
    useState<dayjs.Dayjs | null>(null);
  const [searchByDateRangeEnd, setSearchByDateRangeEnd] =
    useState<dayjs.Dayjs | null>(null);
  const [handleSearchValue, setHandleSearchValue] = useState<string>('');
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
    updatedLoads = handleSearchFilter(updatedLoads, handleSearchValue);
    updatedLoads = searchByStatusFilter(updatedLoads, statusValue);
    setFilteredLoads(updatedLoads);
  }, [
    loads,
    searchByDateRangeStart,
    searchByDateRangeEnd,
    handleSearchValue,
    statusValue,
  ]);

  // Function to filter by date range
  function searchByDateRangeFilter(
    incLoads: Load[],
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

  // Function to handle search filter
  function handleSearchFilter(incLoads: Load[], value: string) {
    if (!value) return incLoads;

    return incLoads.filter((load) =>
      Object.values(load).some((field) =>
        field?.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
  }

  // Function to filter by status
  function searchByStatusFilter(incLoads: Load[], value: string) {
    if (value === 'All') return incLoads;

    const statusMapping: { [key: string]: string } = {
      'On Route': 'ON_ROUTE',
      Open: 'OPEN',
      Refused: 'REFUSED',
      Covered: 'COVERED',
      Pending: 'PENDING',
      Dispatched: 'DISPATCHED',
      '(Un)Loading': 'LOADING_UNLOADING',
    };

    return incLoads.filter((load) => load.status === statusMapping[value]);
  }

  // Function to get the count of loads by status
  const getCount = (value: string) => {
    if (value === 'All') return loads.length;

    const statusMapping: { [key: string]: string } = {
      'On Route': 'ON_ROUTE',
      Open: 'OPEN',
      Refused: 'REFUSED',
      Covered: 'COVERED',
      Pending: 'PENDING',
      Dispatched: 'DISPATCHED',
      '(Un)Loading': 'LOADING_UNLOADING',
    };

    return loads.filter((load) => load.status === statusMapping[value]).length;
  };

  // function to update load
  const updateLoad = async (id: string) => {
    // fetch entry
    const data = await getLoad(id);
    // open modal with this data
    toggleOpen(data);
  };

  // delete a load
  const loadDelete = async (id: string) => {
    try {
      await dispatch(deleteLoad(id)).unwrap();
    } catch (error) {
      console.error('Error deleting load:', error);
    }
  };

  return (
    <>
      <div className="relative flex justify-end mb-6">
        <div className="absolute right-4 bottom-2">
          <Button onClick={toggleOpen}>Add Load</Button>
        </div>
        <FormModal>
          <LoadForm />
        </FormModal>
      </div>
      <CustomTabs tabs={tabsData} sort={setStatusValue} count={getCount} />
      <TableSearch
        search={setHandleSearchValue}
        dateSearch={(startDate, endDate) => {
          setSearchByDateRangeStart(startDate);
          setSearchByDateRangeEnd(endDate);
        }}
        placeholder={'Search client or invoice number...'}
      />
      <Table
        columns={columns}
        data={filteredLoads}
        update={updateLoad}
        deleter={loadDelete}
      />
    </>
  );
};

export default Load;
