'use client';

/* Eventually use SWR to keep everything real time */

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ConsigneeTable from '@/components/Table/ConsigneeTable';
import CustomerTable from '@/components/Table/CustomerTable';
import ShipperTable from '@/components/Table/ShipperTable';
import CustomerModal from '@/components/Modals/CustomerModal';
import ConsigneeModal from '@/components/Modals/ConsigneeModal'; // Corrected import for ConsigneeModal
import ShipperModal from '@/components/Modals/ShipperModal';
import { getConsignees, getCustomers, getShippers } from '@/lib/dbActions';

interface DataItem {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  address: string;
  addressAddOn: string | null;
  city: string;
  state: string;
  postCountry: string;
  postCode: string;
  telCountry: number;
  telephone: string;
}

const SORT_OPTIONS = [
  'Name',
  'Load Number',
  'Customer',
  'Dispatcher',
  'Carrier',
  'Driver',
  'Truck',
  'Trailer',
  'Work Order #',
  'Shipper',
  'Sales Rep',
  'Origin City',
  'Origin State',
  'P.O. Numbers',
  'Consignee',
  'Destination City',
  'Destination State',
  'PO#',
];

const TabGroupOne: React.FC = () => {
  const [openTab, setOpenTab] = useState(1);
  const [data, setData] = useState<DataItem[]>([]); // State to hold customer, consignee and shipper data
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (openTab === 1) {
        const customersData = await getCustomers();
        setData(customersData);
      } else if (openTab === 2) {
        const consigneesData = await getConsignees();
        setData(consigneesData);
      } else if (openTab === 3) {
        const shipperData = await getShippers(); // Fetch shipper data
        setData(shipperData); // Update state with shipper data
      }
    };

    fetchData();
  }, [openTab]); // Added openTab to the dependency array to refetch data when it changes

  const activeClasses = 'text-primary border-primary';
  const inactiveClasses = 'border-transparent';

  return (
    <>
      <div className="flex justify-end mb-4">
        <button
          className="rounded-md bg-primary py-3 px-9 font-medium text-white"
          onClick={() => {
            if (openTab === 1) {
              setIsModalOpen(true);
            } else if (openTab === 2) {
              setIsModalOpen(true); // Set modal open for Consignee as well
            } else if (openTab === 3) {
              setIsModalOpen(true); // Set modal open for Shipper as well
            }
          }}
        >
          Add
        </button>
      </div>

      <div className="rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="mb-6 flex flex-wrap gap-5 border-b border-stroke dark:border-strokedark sm:gap-10">
          <Link
            href="#"
            className={`border-b-2 py-4 text-sm font-medium hover:text-primary md:text-base ${
              openTab === 1 ? activeClasses : inactiveClasses
            }`}
            onClick={() => setOpenTab(1)}
          >
            Customer
          </Link>
          <Link
            href="#"
            className={`border-b-2 py-4 text-sm font-medium hover:text-primary md:text-base ${
              openTab === 2 ? activeClasses : inactiveClasses
            }`}
            onClick={() => setOpenTab(2)}
          >
            Consignee
          </Link>
          <Link
            href="#"
            className={`border-b-2 py-4 text-sm font-medium hover:text-primary md:text-base ${
              openTab === 3 ? activeClasses : inactiveClasses
            }`}
            onClick={() => setOpenTab(3)}
          >
            Shipper
          </Link>
        </div>

        {/* Search bar and sort */}
        <div className="flex justify-between w-full">
          <input
            type="text"
            className="border border-stroke focus:border-primary outline-none rounded-md flex-grow px-5 py-2.5 mr-4"
            placeholder="Search..."
          />

          {/* Sort bar */}
          <select
            defaultValue="" // Adjusted line for controlled component
            className="border border-stroke focus:border-primary outline-none rounded-md px-3 py-2.5 flex-shrink"
          >
            <option value="" disabled>
              Sort By:
            </option>
            {SORT_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Tabs */}
        <div>
          {/* Customer tab */}
          <div
            className={`leading-relaxed ${openTab === 1 ? 'block' : 'hidden'}`}
          >
            <CustomerTable data={data} />
          </div>
          {/* Consignee tab */}
          <div
            className={`leading-relaxed ${openTab === 2 ? 'block' : 'hidden'}`}
          >
            <ConsigneeTable data={data} />
          </div>
          {/* Shipper tab */}
          <div
            className={`leading-relaxed ${openTab === 3 ? 'block' : 'hidden'}`}
          >
            <ShipperTable data={data} />
          </div>
        </div>
      </div>
      {/* Include CustomerModal and pass isModalOpen and setIsModalOpen as props */}
      <CustomerModal
        isModalOpen={isModalOpen && openTab === 1}
        setIsModalOpen={setIsModalOpen}
      />
      {/* Include ConsigneeModal and pass isModalOpen and setIsModalOpen as props for Consignee */}
      <ConsigneeModal
        isModalOpen={isModalOpen && openTab === 2}
        setIsModalOpen={setIsModalOpen}
      />
      {/* Include ShipperModal and pass isModalOpen and setIsModalOpen as props for Shipper */}
      <ShipperModal
        isModalOpen={isModalOpen && openTab === 3}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

export default TabGroupOne;
