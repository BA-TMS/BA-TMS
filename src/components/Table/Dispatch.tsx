'use client';
import { useState } from 'react';
//import AddButton from '@/components/Modals/AddButton';

type CargoLoad = {
  id: string;
  ownerId: string;
  loadNum: string;
  carrierId: string;
  driverId: string | null;
  customerId: string;
  originId: string | null;
  destId: string | null;
  status: string
  carrier: {name: string};
  driver: {name: string} | null;
  customer: {name: string};
  shipper: {name: string} | null;
  consignee: {name: string} | null;
};

type CargoLoads = {
  cargo: CargoLoad[];
}

const Dispatch = ({cargo}: CargoLoads) => {
  // Use-State variables
  // const [filteredCargo, setFilteredCargo] = useState<CargoLoads>(cargo);
  const [filterText, setFilterText] = useState('');
  const [modalOpen, setModalOpen] = useState(false); // Added line

  // function updateFilteredCargo(filter: string) {
  //   const filteredCargo = cargo.filter(
  //     (obj) =>
  //       obj.loadNum?.toLowerCase().includes(filter.toLowerCase()) ||
  //       obj.PONum?.toLowerCase().includes(filter.toLowerCase()) ||
  //       obj.carrier?.toLowerCase().includes(filter.toLowerCase()) ||
  //       obj.shipDate?.toLowerCase().includes(filter.toLowerCase()) ||
  //       obj.delDate?.toLowerCase().includes(filter.toLowerCase()) ||
  //       obj.customer?.toLowerCase().includes(filter.toLowerCase()) ||
  //       obj.origin?.toLowerCase().includes(filter.toLowerCase()) ||
  //       obj.destination?.toLowerCase().includes(filter.toLowerCase()) ||
  //       obj.status?.toLowerCase().includes(filter.toLowerCase())
  //   );
  //   // Update cargo list with filtered results.
  //   setFilteredCargo(filteredCargo);
  // }

  function updateCargoStatus(cargoStatus: string) {
    // Set cargo color based on current status.
    switch (cargoStatus) {
      case 'Pending':
        return <div className="box yellow"></div>;
      case 'Open':
        return <div className="box red"></div>;
      case 'Refused':
        return <div className="box purple"></div>;
      case 'Covered':
        return <div className="box blue"></div>;
      case 'Dispatched':
        return <div className="box wine"></div>;
      case 'On Route':
        return <div className="box green"></div>;
      case '(Un)Loading':
        return <div className="box gray"></div>;
      case 'In Yard':
        return <div className="box hotpink"></div>;
      default:
        break;
    }
  }

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
              setFilterText(value);
              updateFilteredCargo(value);
            }}
          />
          <button
            className={`custom-button effect1`}
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
            className={`custom-button effect1`}
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              marginLeft: '10px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
            onClick={() => updateFilteredCargo('')}
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
        {/* Updated line */}
        <button
          className={`custom-button effect1`}
          style={{
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontWeight: 'bold',
          }}
          onClick={() => setModalOpen(true)} // Added line
        >
          Open Loads
        </button>
        <button
          className={`custom-button effect1`}
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
      {/* END STATUS COLORS */}

      {/* DISPATCH TABLE */}
      <div className="col-span-12">
        <div className="rounded-xs border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-4 md:p-6 xl:p-7.5">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-title-sm2 font-bold text-black dark:text-white">
                  Cargo Report
                </h2>
              </div>
            </div>
          </div>

          <div className="border-b border-stroke px-4 pb-5 dark:border-strokedark md:px-6 xl:px-7.5">
            <div className="flex items-center gap-3">
              <div className="w-4/12 2xsm:w-3/12 md:w-2/12 xl:w-1/12">
                <span className="font-medium">Load #</span>
              </div>
              <div className="w-4/12 2xsm:w-3/12 md:w-2/12 xl:w-1/12">
                <span className="font-medium  ">PO #</span>
              </div>
              <div className="hidden w-4/12 md:block xl:w-3/12">
                <span className="font-medium">Driver/Carrier</span>
              </div>
              <div className="w-4/12 2xsm:w-3/12 md:w-2/12 xl:w-1/12">
                <span className="font-medium">Ship Date</span>
              </div>
              <div className="w-4/12 2xsm:w-3/12 md:w-2/12 xl:w-1/12">
                <span className="font-medium">Del Date</span>
              </div>
              <div className="hidden w-2/12 text-center 2xsm:block md:w-1/12">
                <span className="font-medium">Customer</span>
              </div>
              <div className="hidden w-2/12 text-center 2xsm:block md:w-1/12">
                <span className="font-medium">Origin</span>
              </div>
              <div className="hidden w-2/12 text-center 2xsm:block md:w-1/12">
                <span className="font-medium">Destination</span>
              </div>
              <div className="hidden w-2/12 text-center 2xsm:block md:w-1/12">
                <span className="font-medium">Load Status</span>
              </div>
            </div>
          </div>

          <div className="p-4 md:p-6 xl:p-7.5">
            <div className="flex flex-col gap-7">
              {cargo.map((load) => (
                <div className="flex items-center gap-3" key={load.loadNum}>
                  <div className="w-4/12 2xsm:w-3/12 md:w-2/12 xl:w-1/12">
                    <div className="flex items-center gap-4">
                      <span className="hidden font-medium xl:block">
                        {load.loadNum}
                      </span>
                    </div>
                  </div>
                  <div className="w-4/12 2xsm:w-3/12 md:w-2/12 xl:w-1/12">
                    <span className="font-medium">ADD TO SCHEMA</span>
                  </div>
                  <div className="hidden w-4/12 md:block xl:w-3/12">
                    <span className="font-medium">{load.carrierId}</span>
                  </div>
                  <div className="w-4/12 2xsm:w-3/12 md:w-2/12 xl:w-1/12">
                    <span className="font-medium">ADD TO SCHEMA</span>
                  </div>
                  <div className="w-4/12 2xsm:w-3/12 md:w-2/12 xl:w-1/12">
                    <span className="font-medium">ADD TO SCHEMA</span>
                  </div>
                  <div className="hidden w-2/12 text-center 2xsm:block md:w-1/12">
                    <span className="font-medium">{load.customerId}</span>
                  </div>
                  <div className="hidden w-2/12 text-center 2xsm:block md:w-1/12">
                    <span className="font-medium">ADD TO SCHEMA</span>
                  </div>
                  <div className="hidden w-2/12 text-center 2xsm:block md:w-1/12">
                    <span className="font-medium">ADD TO SCHEMA</span>
                  </div>
                  <div className="hidden w-2/12 text-center 2xsm:block md:w-1/12">
                    <span
                      style={{
                        display: 'table',
                        margin: 'auto',
                        paddingTop: '15px',
                      }}
                    >
                      {updateCargoStatus(load.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* END DISPATCH TABLE */}
    </>
  );
};

export default Dispatch;
