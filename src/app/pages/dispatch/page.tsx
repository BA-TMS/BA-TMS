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
];

const Dispatch = () => {
  // Variables
  const cargo: CargoLoads = placeholderCargo;

  const [filteredMembers, setFilteredMembers] = useState<CargoLoads>(cargo);
  const [filterText, setFilterText] = useState('');

  return (
    <>
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
          placeholder="Find"
          className="datatable-input"
          onChange={(e) => {
            const value = e.target.value;
            setFilterText(value);
            {
              /* updateFilteredMembers(value); */
            }
          }}
        />
        <button
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            backgroundColor: 'rgb(60 80 224 / var(--tw-bg-opacity))',
            color: 'white',
            marginLeft: '10px',
            cursor: 'pointer',
          }}
        >
          Search
        </button>
        <button
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            backgroundColor: 'rgb(60 80 224 / var(--tw-bg-opacity))',
            color: 'white',
            marginLeft: '10px',
            cursor: 'pointer',
          }}
        >
          Show All
        </button>
      </div>

      {/* Dispatch Table */}
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
              {filteredMembers.map((lead, key) => (
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
                      className={`inline-block rounded  py-0.5 px-2.5 text-sm font-medium ${
                        lead.status === 'lost'
                          ? 'bg-red/[0.08] text-red'
                          : 'text-meta-3 bg-meta-3/[0.08]'
                      } `}
                    >
                      {lead.status === 'lost' ? 'Lost Lead' : 'Active'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dispatch;
