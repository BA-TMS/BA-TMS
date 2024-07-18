'use client';

import { useContext, useState, useEffect } from 'react';
import { ModalContext } from '@/Context/modalContext';
import FormModal from '../Modals/FormModal';
import LoadForm from '../Forms/LoadForm';
import Table from '../UI_Elements/Table/Table';
import { getLoads } from '@/lib/dbActions';
import Button from '@ui/buttons/Button';
import { CustomTabs, TabData } from '../UI_Elements/Table/TableHeaderTabs';
import { TableSearch } from '../UI_Elements/Table/TableSearch';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { useDispatch, useSelector } from 'react-redux';

dayjs.extend(customParseFormat);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

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

// colors to be used for status on the table
const statusColors = {
  ON_ROUTE: 'warning',
  COVERED: 'warning',
  OPEN: 'primary',
  REFUSED: 'secondary',
  PENDING: 'error',
};

const getColorByStatus = (status: string) => {
  return statusColors[status] || 'text-grey-600 dark:text-white';
};

// columns passed to table
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

// info passed to tabs
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

export default function Load() {
  const dispatch = useDispatch();
  const loads = useSelector((state) => state.loads);
  const setLoads = (data) => dispatch({ type: 'SET_LOADS', payload: data });
  const [filteredLoads, setFilteredLoads] = useState<Load[]>([]);
  const [searchByDateRangeStart, setSearchByDateRangeStart] = useState();
  const [searchByDateRangeEnd, setSearchByDateRangeEnd] = useState();
  const [handleSearchValue, setHandleSearchValue] = useState();
  const [statusValue, setStatusValue] = useState();
  const { toggleOpen } = useContext(ModalContext);

  const handleClick = () => {
    toggleOpen();
  };

  function searchByDateRangeFilter(incLoads, startDate, endDate) {
    if (!startDate && !endDate) {
      return incLoads;
    }

    const filtered = incLoads.filter((item) => {
      const shippedDate = dayjs(item.shipDate);
      const deliveryDate = dayjs(item.deliveryDate);

      // Check if the shipped date is after the start date (if provided)
      const isAfterStart = startDate
        ? shippedDate.isSameOrAfter(startDate, 'day')
        : true;

      // Check if the delivery date is before the end date (if provided)
      const isBeforeEnd = endDate
        ? deliveryDate.isSameOrBefore(endDate, 'day')
        : true;

      return isAfterStart && isBeforeEnd;
    });

    return filtered;
  }

  // specifically handling date range search
  // shipped date is "start date" datepicker
  // delivery date is "end date" datepicker
  const searchByDateRange = (
    startDate: dayjs.Dayjs | null = null,
    endDate: dayjs.Dayjs | null = null
  ) => {
    setSearchByDateRangeStart(startDate);
    setSearchByDateRangeEnd(endDate);
    setFilteredLoads(searchByDateRangeFilter(loads, startDate, endDate));
  };

  function handleSearchFilter(incLoads, value) {
    if (!handleSearchValue) {
      return incLoads;
    }

    const filteredData = incLoads.filter(
      (load) =>
        load.id?.toLowerCase().includes(value.toLowerCase()) ||
        load.ownerId?.toLowerCase().includes(value.toLowerCase()) ||
        load.loadNum?.toLowerCase().includes(value.toLowerCase()) ||
        load.payOrderNum?.toLowerCase().includes(value.toLowerCase()) ||
        load.shipDate?.toLowerCase().includes(value.toLowerCase()) ||
        load.deliveryDate?.toLowerCase().includes(value.toLowerCase()) ||
        load.carrierId?.toLowerCase().includes(value.toLowerCase()) ||
        load.driverId?.toLowerCase().includes(value.toLowerCase()) ||
        load.customerId?.toLowerCase().includes(value.toLowerCase()) ||
        load.originId?.toLowerCase().includes(value.toLowerCase()) ||
        load.destId?.toLowerCase().includes(value.toLowerCase()) ||
        load.status?.toLowerCase().includes(value.toLowerCase()) ||
        load.carrier?.toLowerCase().includes(value.toLowerCase()) ||
        load.driver?.toLowerCase().includes(value.toLowerCase()) ||
        load.customer?.toLowerCase().includes(value.toLowerCase()) ||
        load.shipper?.toLowerCase().includes(value.toLowerCase()) ||
        load.consignee?.toLowerCase().includes(value.toLowerCase())
    );
    return filteredData;
  }

  // handling other search
  const handleSearch = (value: string) => {
    setHandleSearchValue(value);
    const filteredData = handleSearchFilter(loads, value);
    setFilteredLoads(filteredData);
  };

  function searchByStatusFilter(incLoads, value) {
    if (!value) {
      return incLoads;
    }

    if (value === 'All') {
      return incLoads;
    }

    const statusMapping: { [key: string]: string } = {
      'On Route': 'ON_ROUTE',
      Open: 'OPEN',
      Refused: 'REFUSED',
      Covered: 'COVERED',
      Pending: 'PENDING',
      Dispatched: 'DISPATCHED',
      '(Un)Loading': 'LOADING_UNLOADING',
      'In Yard': 'IN_YARD',
    };

    const status = statusMapping[value];

    const filtered = incLoads.filter((load: { status: string }) => {
      return load.status === status;
    });
    return filtered;
  }

  // handling status search
  const searchByStatus = (value: string) => {
    setStatusValue(value);
    setFilteredLoads(searchByStatusFilter(loads, value));
  };

  // count how many loads per status
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
      'In Yard': 'IN_YARD',
    };

    const status = statusMapping[value];

    const filtered = loads.filter((load: { status: string }) => {
      return load.status === status;
    });

    return filtered.length;
  };

  useEffect(() => {
    const fetchLoads = async () => {
      const data = await getLoads();
      for (const load of data) {
        // Pull strings out of relations and format dates.
        if (load.shipDate) load.shipDate = load.shipDate.toDateString();
        if (load.deliveryDate)
          load.deliveryDate = load.deliveryDate.toDateString();
        load.carrier = load.carrier.name;
        if (load.driver) load.driver = load.driver.name;
        load.customer = load.customer.name;
        if (load.shipper) load.shipper = load.shipper.name;
        if (load.consignee) load.consignee = load.consignee.name;
      }

      setLoads(data);
      setFilteredLoads(
        searchByStatusFilter(
          handleSearchFilter(
            searchByDateRangeFilter(
              data,
              searchByDateRangeStart,
              searchByDateRangeEnd
            ),
            handleSearchValue
          ),
          statusValue
        )
      );
    };

    fetchLoads();
  }, []);

  return (
    <>
      <div className="relative flex justify-end mb-6">
        <div className="absolute right-4 bottom-2">
          <Button onClick={handleClick}>Add Load</Button>
        </div>
        <FormModal>
          <LoadForm />
        </FormModal>
      </div>
      <CustomTabs tabs={tabsData} sort={searchByStatus} count={getCount} />
      <TableSearch
        search={handleSearch}
        dateSearch={searchByDateRange}
        placeholder={'Search client or invoice number...'}
      />
      <Table columns={columns} data={filteredLoads}></Table>
    </>
  );
}
