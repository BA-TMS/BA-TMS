'use client';
import { useState } from 'react';

type CargoLoad = {
  loadNum: string;
  PONum: string;
  carrier: string;
  shipDate: string;
  delDate: string;
  customer: string;
  origin: string;
  destination: string;
  status: string;
};

type CargoLoads = CargoLoad[];

const placeholderCargo = [
  {
    loadNum: '50380',
    PONum: 'G0765',
    carrier: 'Prolog International',
    shipDate: '02/05/24',
    delDate: '02/10/24',
    customer: 'BA Logistics Group LLC',
    origin: 'Sacramento, CA',
    destination: 'Brooklyn, NY',
    status: 'Dispatched',
  },
  {
    loadNum: '26554',
    PONum: 'K0392',
    carrier: 'Shibata Co. LTD',
    shipDate: '02/07/24',
    delDate: '02/13/24',
    customer: 'Amazon Prime',
    origin: 'Tokyo, JP',
    destination: 'Los Angeles, CA',
    status: 'Open',
  },
];

const Dispatch = () => {
  // Variables
  const cargo: CargoLoads = placeholderCargo;

  // Use-State variables
  const [filteredCargo, setFilteredCargo] = useState<CargoLoads>(cargo);
  const [filterText, setFilterText] = useState('');

  function updateFilteredCargo(filter: string) {
    const filteredCargo = cargo.filter(
      (obj) =>
        obj.loadNum?.toLowerCase().includes(filter.toLowerCase()) ||
        obj.PONum?.toLowerCase().includes(filter.toLowerCase()) ||
        obj.carrier?.toLowerCase().includes(filter.toLowerCase()) ||
        obj.shipDate?.toLowerCase().includes(filter.toLowerCase()) ||
        obj.delDate?.toLowerCase().includes(filter.toLowerCase()) ||
        obj.customer?.toLowerCase().includes(filter.toLowerCase()) ||
        obj.origin?.toLowerCase().includes(filter.toLowerCase()) ||
        obj.destination?.toLowerCase().includes(filter.toLowerCase()) ||
        obj.status?.toLowerCase().includes(filter.toLowerCase())
    );
    // Update cargo list with filtered results.
    setFilteredCargo(filteredCargo);
  }

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
      <div>
        <h1 style={{ float: 'left', fontSize: '30px', fontWeight: 'bold' }}>
          DISPATCH BOARD
        </h1>

        <input
          style={{
            width: '300px',
            display: 'inline',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            marginLeft: '600px',
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
        >
          Show All
        </button>
      </div>
      <br />
      {/* END HEADER & SEARCH BAR */}

      {/* ADD LOAD BUTTONS */}
      <div>
        <button
          className={`custom-button effect1`}
          style={{
            float: 'right',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontWeight: 'bold',
          }}
        >
          Delivered/Completed Loads
        </button>

        <button
          className={`custom-button effect1`}
          style={{
            float: 'right',
            marginRight: '15px',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontWeight: 'bold',
          }}
        >
          Open Loads
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
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
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
              {filteredCargo.map((lead, key) => (
                <div className="flex items-center gap-3" key={key}>
                  <div className="w-4/12 2xsm:w-3/12 md:w-2/12 xl:w-1/12">
                    <div className="flex items-center gap-4">
                      <span className="hidden font-medium xl:block">
                        {lead.loadNum}
                      </span>
                    </div>
                  </div>
                  <div className="w-4/12 2xsm:w-3/12 md:w-2/12 xl:w-1/12">
                    <span className="font-medium">{lead.PONum}</span>
                  </div>
                  <div className="hidden w-4/12 md:block xl:w-3/12">
                    <span className="font-medium">{lead.carrier}</span>
                  </div>
                  <div className="w-4/12 2xsm:w-3/12 md:w-2/12 xl:w-1/12">
                    <span className="font-medium">{lead.shipDate}</span>
                  </div>
                  <div className="w-4/12 2xsm:w-3/12 md:w-2/12 xl:w-1/12">
                    <span className="font-medium">{lead.delDate}</span>
                  </div>
                  <div className="hidden w-2/12 text-center 2xsm:block md:w-1/12">
                    <span className="font-medium">{lead.customer}</span>
                  </div>
                  <div className="hidden w-2/12 text-center 2xsm:block md:w-1/12">
                    <span className="font-medium">{lead.origin}</span>
                  </div>
                  <div className="hidden w-2/12 text-center 2xsm:block md:w-1/12">
                    <span className="font-medium">{lead.destination}</span>
                  </div>
                  <div className="hidden w-2/12 text-center 2xsm:block md:w-1/12">
                    <span
                      style={{
                        display: 'table',
                        margin: 'auto',
                        paddingTop: '15px',
                      }}
                    >
                      {updateCargoStatus(lead.status)}
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
