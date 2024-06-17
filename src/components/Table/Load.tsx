'use client';

import { useContext, useState, useEffect } from 'react';
import { ModalContext } from '@/Context/modalContext';
import FormModal from '../Modals/FormModal';
import LoadForm from '../Forms/LoadForm';
import Table from '../UI_Elements/Table/Table';
import { getLoads } from '@/lib/dbActions';
import Button from '@ui/buttons/Button';
import Searchbar from '@ui/Searchbar';
import { CustomTabs, TabData } from '../UI_Elements/Table/TableHeaderTabs';

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

const columns = [
  { field: 'loadNum', headerName: 'Load Number' },
  { field: 'payOrderNum', headerName: 'PO Number' },
  { field: 'customer', headerName: 'Customer' },
  { field: 'shipDate', headerName: 'Date Shipped' },
  { field: 'deliveryDate', headerName: 'Date Delivered' },
  { field: 'carrier', headerName: 'Carrier' },
  { field: 'shipper', headerName: 'Shipper' },
  { field: 'consignee', headerName: 'Consignee' },
  { field: 'status', headerName: 'Status' },
];

// need a function/ sort to determine content
const tabsData: TabData[] = [
  { color: 'default', content: 24, text: 'All' },
  { color: 'info', content: 12 + 12, text: 'On Route' },
  { color: 'primary', content: 5, text: 'Open' },
  { color: 'primary', content: 5, text: 'Refused' },
  { color: 'primary', content: 5, text: 'Covered' },
  { color: 'primary', content: 5, text: 'Pending' },
  { color: 'primary', content: 5, text: 'Dispatched' },
  { color: 'default', content: 5, text: '(Un)Loading' },
];

export default function Load() {
  const [loads, setLoads] = useState<Load[]>([]);
  const [filteredLoads, setFilteredLoads] = useState<Load[]>([]);
  const { toggleOpen } = useContext(ModalContext);

  const handleClick = () => {
    toggleOpen();
  };

  const handleSearch = (value: string) => {
    const filteredData = loads.filter(
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
    setFilteredLoads(filteredData);
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
      console.log('loads', data);

      setLoads(data);
      setFilteredLoads(data);
    };

    fetchLoads();
  }, []);

  return (
    <>
      <div className="flex justify-end">
        <Button onClick={handleClick}>Add Load</Button>
        <FormModal>
          <LoadForm />
        </FormModal>
      </div>

      {/* SEARCH BAR */}
      <CustomTabs tabs={tabsData} />
      <div className="h-26 p-4 bg-white dark:bg-grey-900 border-x border-grey-300 dark:border-grey-700">
        <Searchbar
          placeholder="Search client or invoice number..."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            handleSearch(value);
          }}
        />
      </div>
      <Table columns={columns} data={filteredLoads}></Table>
    </>
  );
}
