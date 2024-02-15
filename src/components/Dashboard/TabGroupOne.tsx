'use client';

/* Eventually use SWR to keep everything real time */

import React, { useState, useEffect } from "react";
import Link from "next/link";
import ConsigneeTable from '@/components/Tables/ConsigneeTable';
import { getConsignees } from '@/lib/dbActions';

const TabGroupOne: React.FC = () => {
  const [openTab, setOpenTab] = useState(1);
  const [data, setData] = useState([]); // State to hold consignees data

  useEffect(() => {
    const fetchData = async () => {
      const consigneesData = await getConsignees();
      setData(consigneesData);
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount

  const activeClasses = "text-primary border-primary";
  const inactiveClasses = "border-transparent";

  return (
    <>
      <div className="flex justify-end mb-4">
        <button className="rounded-md bg-primary py-3 px-9 font-medium text-white">
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
            <option value="" disabled>Sort By:</option>
            {["Name", "Load Number", "Customer", "Dispatcher", "Carrier", "Driver", "Truck", "Trailer", "Work Order #", "Shipper", "Sales Rep", "Origin City", "Origin State", "P.O. Numbers", "Consignee", "Destination City", "Destination State", "PO#"].map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>


        {/* Tabs */}
        <div>
          {/* customer tab */}
          <div
            className={`leading-relaxed ${openTab === 1 ? "block" : "hidden"}`}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            luctus ligula nec dolor placerat, a consequat elit volutpat. Quisque
            nibh lacus, posuere et turpis in, pretium facilisis nisl. Proin congue
            sem vel sollicitudin sagittis. Class aptent taciti sociosqu ad litora
            torquent per conubia nostra, per
          </div>
          {/* consignee tab */}
          <div
            className={`leading-relaxed ${openTab === 2 ? "block" : "hidden"}`}
          >
            <ConsigneeTable data={data} />
          </div>
          {/* shipper tab */}
          <div
            className={`leading-relaxed ${openTab === 3 ? "block" : "hidden"}`}
          >
            Tab3 ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            luctus ligula nec dolor placerat, a consequat elit volutpat. Quisque
            nibh lacus, posuere et turpis in, pretium facilisis nisl. Proin congue
            sem vel sollicitudin sagittis. Class aptent taciti sociosqu ad litora
            torquent per conubia nostra, per

          </div>

        </div>
      </div>
    </>
  );
};

export default TabGroupOne;

