'use client';
import React from 'react';
import DataStatsThree from '../DataStats/DataStatsThree';
import CRMAreaChart from '../Charts/CRMAreaChart';
import DonutChart from '../Charts/DonutChart';
// import ChartNine from "../Charts/ChartNine";
// import LeadsReport from "../LeadsReport";
// import ToDoList from "../Todo/ToDoList";

const CRM: React.FC = () => {
  return (
    <>
      <DataStatsThree />

      <div className="mt-7.5 grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-7">
          <CRMAreaChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <DonutChart />
        </div>

        {/* <LeadsReport />

        <div className="col-span-12 xl:col-span-5">
          <ChartNine />
        </div>

        <ToDoList /> */}
      </div>
    </>
  );
};

export default CRM;
