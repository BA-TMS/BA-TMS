'use client';
import ToggleButton from '@/components/Controls/ToggleButton';
import React, { useState } from 'react';

// DATE IMPORTS
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';

import 'react-datepicker/dist/react-datepicker.css';
import Table from '@/components/UI_Elements/Table';

type dummyData = {
  steamShipping: string;
  containerType: string;
  terminal: string;
  startDate: Date;
  endDate: Date;
};

type dummyTest = dummyData[];
const placeholder = [
  {
    steamShipping: 'CMDU',
    containerType: '20',
    terminal: 'APM',
    startDate: new Date('2024-05-12'),
    endDate: new Date('2024-08-14'),
  },
  {
    steamShipping: 'COSU',
    containerType: '40 ST',
    terminal: 'PIERA',
    startDate: new Date('2024-05-23'),
    endDate: new Date('2024-08-07'),
  },
];

const columns = [
  { field: 'steamShipping', headerName: 'Steam Shipping' },
  { field: 'containerType', headerName: 'Container Type' },
  { field: 'terminal', headerName: 'Terminal' },
  { field: 'startDate', headerName: 'Start Date' },
  { field: 'endDate', headerName: 'End Date' },
];

export default function Drayage() {
  const [value, setValue] = React.useState<DateRange<Dayjs>>([
    dayjs('2022-04-17'),
    dayjs('2022-04-21'),
  ]);
  const [containerFilter, setContainerFilter] = useState('');
  const [steamShippingFilter, setSteamShippingFilter] = useState('');
  const [terminalFilter, setTerminalFilter] = useState('');

  const filteredData = placeholder.filter(
    (item) =>
      (containerFilter ? item.containerType === containerFilter : true) &&
      (steamShippingFilter
        ? item.steamShipping === steamShippingFilter
        : true) &&
      (terminalFilter ? item.terminal === terminalFilter : true)
  );

  return (
    <div>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold' }}>Filters</h1>
      <div className="mb-4.5" style={{ float: 'left', marginRight: '1rem' }}>
        <label className="mb-2.5 block text-sm font-medium text-black dark:text-white">
          Show favorites
        </label>
        <div
          className="relative z-20 w-32 rounded border border-stroke bg-transparent py-2.5 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          style={{ float: 'left', marginRight: '1rem' }}
        >
          <ToggleButton labelText="" descriptionText="" />
        </div>
      </div>

      <div className="mb-4.5" style={{ float: 'left', marginRight: '1rem' }}>
        <label className="mb-2.5 block text-sm font-medium text-black dark:text-white">
          Steam Shipping Line
        </label>
        <div className="relative z-20 bg-white dark:bg-form-input">
          <select
            className="relative z-20 w-48 rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            value={steamShippingFilter}
            onChange={(e) => setSteamShippingFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="CMDU">CMDU</option>
            <option value="COSU">COSU</option>
          </select>
        </div>
      </div>

      <div className="mb-4.5" style={{ float: 'left', marginRight: '1rem' }}>
        <label className="mb-2.5 block text-sm font-medium text-black dark:text-white">
          Container Type
        </label>
        <div>
          <select
            className="relative z-20 w-48 rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            value={containerFilter}
            onChange={(e) => setContainerFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="20">20</option>
            <option value="40 ST">40 ST</option>
          </select>
        </div>
      </div>

      <div className="mb-4.5" style={{ float: 'left', marginRight: '1rem' }}>
        <label className="mb-2.5 block text-sm font-medium text-black dark:text-white">
          Shipping
        </label>
        <div>
          <select
            className="relative z-20 w-48 rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            value={terminalFilter}
            onChange={(e) => setTerminalFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="APM">APM</option>
            <option value="PIERA">PIERA</option>
            <option value="PCT">PCT</option>
            <option value="LBCT">LBCT</option>
            <option value="FENIX">FENIX</option>
            <option value="TRAPAC">TRAPAC</option>
            <option value="ITS">ITS</option>
            <option value="WBCT">WBCT</option>
            <option value="TTI">TTI</option>
            <option value="ETS">ETS</option>
            <option value="YTI">YTI</option>
            <option value="PIERS">PIERS</option>
            <option value="MATSON">MATSON</option>
            <option value="STL">STL</option>
          </select>
        </div>
      </div>

      {/* CALENDAR DATES */}
      <div className="mb-4.5" style={{ float: 'left', marginRight: '1rem' }}>
        <label className="mb-2.5 block text-sm font-medium text-black dark:text-white">
          Start Date
        </label>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker className="relative z-20 w-48 rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
          </LocalizationProvider>
        </div>
      </div>
      <div className="mb-4.5">
        <label className="mb-2.5 block text-sm font-medium text-black dark:text-white">
          End Date
        </label>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker className="relative z-20 w-48 rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
          </LocalizationProvider>
        </div>
      </div>

      <Table columns={columns} data={filteredData}></Table>
    </div>
  );
}
