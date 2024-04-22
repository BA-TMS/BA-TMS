'use client';

import { useContext, useState, useEffect } from 'react';
import { ModalContext } from '@/Context/modalContext';
import FormModal from '../Modals/FormModal';
import LoadForm from '../Forms/LoadForm';
import Table from '../UI_Elements/Table';
import { getBrokers, getLoads } from '@/lib/dbActions';
import Link from 'next/link';

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

type Broker = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  crossing: string;
  address: string;
  addressAddOn: string | null;
  city: string;
  state: string;
  postCountry: string;
  postCode: string;
  telCountry: string;
  telephone: string;
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

const brokerColumns = [
  { field: 'name', headerName: 'Name' },
  { field: 'crossing', headerName: 'Crossing' },
  { field: 'address', headerName: 'Address' },
  { field: 'city', headerName: 'City' },
  { field: 'state', headerName: 'State' },
  { field: 'postCountry', headerName: 'Post Country' },
  { field: 'postCode', headerName: 'Post Code' },
  { field: 'telCountry', headerName: 'Tel Country' },
  { field: 'telephone', headerName: 'Telephone' },
];

export default function Load() {
  const [loads, setLoads] = useState<Load[]>([]);
  const [filteredLoads, setFilteredLoads] = useState<Load[]>([]);
  const { toggleOpen } = useContext(ModalContext);

  // UseStates for tabs
  const [openTab, setOpenTab] = useState(1);
  const [data, setData] = useState<Load[]>([]); // State to hold Dispatch (Load) and Brokerage
  const [brokerData, setBrokerData] = useState<Broker[]>([]);
  const [filteredBrokers, setFilteredBrokers] = useState<Broker[]>([]);

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

    const filteredBrokers = brokerData.filter(
      (broker) =>
        broker.id?.toLowerCase().includes(value.toLowerCase()) ||
        broker.name?.toLowerCase().includes(value.toLowerCase()) ||
        broker.crossing?.toLowerCase().includes(value.toLowerCase()) ||
        broker.address?.toLowerCase().includes(value.toLowerCase()) ||
        broker.city?.toLowerCase().includes(value.toLowerCase()) ||
        broker.state?.toLowerCase().includes(value.toLowerCase()) ||
        broker.postCountry?.toLowerCase().includes(value.toLowerCase()) ||
        broker.postCode?.toLowerCase().includes(value.toLowerCase()) ||
        broker.telCountry?.toLowerCase().includes(value.toLowerCase()) ||
        broker.telephone?.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredBrokers(filteredBrokers);
  };

  // useEffect for setting Loads table data and filtering.
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

    const fetchBrokers = async () => {
      const brokerageData = await getBrokers(); // Fetch brokerage data

      setBrokerData(brokerageData);
    };

    fetchBrokers();
    fetchLoads();
  }, []);

  // UseEffect for different tabs.
  useEffect(() => {
    const fetchData = async () => {
      if (openTab === 1) {
        const loadData = await getLoads();
        setData(loadData);
      } else if (openTab === 2) {
        const brokerageData = await getBrokers(); // Brokerage needed

        // Transform the data into the expected Load type before
        // setting it using setData.

        setBrokerData(brokerageData);
      }
    };

    fetchData();
  }, [openTab]); // Added openTab to the dependency array to refetch data when it changes

  const activeClasses = 'text-primary border-primary';
  const inactiveClasses = 'border-transparent';

  return (
    <>
      {/* HEADER & SEARCH BAR */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <h1 style={{ fontSize: '30px', fontWeight: 'bold' }}>DISPATCH BOARD</h1>

        <div>
          <input
            style={{
              width: '300px',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              background: 'rgba(0,0,0,0)',
              fontWeight: 'bold',
            }}
            type="search"
            placeholder="Search..."
            className="datatable-input"
            onChange={(e) => {
              const value = e.target.value;
              handleSearch(value);
            }}
          />
          <button
            className={'custom-button effect1'}
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              marginLeft: '10px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Search
          </button>
          <button
            className={'custom-button effect1'}
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              marginLeft: '10px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
            onClick={() => {
              setFilteredLoads(loads);
              setFilteredBrokers(brokerData);
            }}
          >
            Show All
          </button>
        </div>
      </div>
      <br />
      {/* END HEADER & SEARCH BAR */}

      {/* ADD LOAD BUTTONS */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '15px',
          marginBottom: '20px',
        }}
      >
        {/*<AddButton modalOpen={modalOpen} setModalOpen={setModalOpen} />{' '}*/}
        <button
          onClick={handleClick}
          className={'custom-button effect1'}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            marginLeft: '10px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Add Load
        </button>
        <FormModal>
          <LoadForm />
        </FormModal>
        {/* Updated line */}
        <button
          className={'custom-button effect1'}
          style={{
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontWeight: 'bold',
          }}
          //onClick={() => setModalOpen(true)} // Added line
        >
          Open Loads
        </button>
        <button
          className={'custom-button effect1'}
          style={{
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontWeight: 'bold',
          }}
        >
          Delivered/Completed Loads
        </button>
      </div>
      <br />
      {/* END ADD LOAD BUTTONS*/}

      {/* STATUS COLORS */}
      <div style={{ display: 'flex', position: 'absolute' }}>
        <div>
          <div className="box yellow"></div>
          Pending
        </div>

        <div style={{ paddingLeft: '20px' }}>
          <div className="box red"></div>
          Open
        </div>

        <div style={{ paddingLeft: '20px' }}>
          <div className="box purple"></div>
          Refused
        </div>

        <div style={{ paddingLeft: '20px' }}>
          <div className="box blue"></div>
          Covered
        </div>

        <div style={{ paddingLeft: '20px' }}>
          <div className="box wine"></div>
          Dispatched
        </div>

        <div style={{ paddingLeft: '20px' }}>
          <div className="box green"></div>
          On Route
        </div>

        <div style={{ paddingLeft: '20px' }}>
          <div className="box gray"></div>
          (Un)Loading
        </div>

        <div style={{ paddingLeft: '20px' }}>
          <div className="box hotpink"></div>
          In Yard
        </div>
      </div>
      <br />

      <div className="rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="mb-6 flex flex-wrap gap-5 border-b border-stroke dark:border-strokedark sm:gap-10">
          <Link
            href="#"
            className={`border-b-2 py-4 text-sm font-medium hover:text-primary md:text-base ${
              openTab === 1 ? activeClasses : inactiveClasses
            }`}
            onClick={() => setOpenTab(1)}
          >
            Drayage
          </Link>
          <Link
            href="#"
            className={`border-b-2 py-4 text-sm font-medium hover:text-primary md:text-base ${
              openTab === 2 ? activeClasses : inactiveClasses
            }`}
            onClick={() => setOpenTab(2)}
          >
            Brokerage
          </Link>
        </div>
        <Table
          columns={openTab === 1 ? columns : brokerColumns}
          data={openTab === 1 ? filteredLoads : filteredBrokers}
        ></Table>
      </div>
    </>
  );
}
