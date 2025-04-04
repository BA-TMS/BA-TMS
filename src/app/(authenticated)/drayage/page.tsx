'use client';
import ToggleButton from '@/components/UI_Elements/Controls/ToggleButton';
import React, { useState } from 'react';

// DATE IMPORTS
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(customParseFormat);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';

import 'react-datepicker/dist/react-datepicker.css';
import Table from '@/components/UI_Elements/Table/Table';

type DrayageData = {
  steamShipping: string;
  containerType: string;
  terminal: string;
  startDate: Date;
  endDate: Date;
  isFavorite: boolean;
};

const placeholder: DrayageData[] = [
  {
    steamShipping: 'CMDU',
    containerType: '20',
    terminal: 'APM',
    startDate: new Date('2024-05-12'),
    endDate: new Date('2024-08-14'),
    isFavorite: true,
  },
  {
    steamShipping: 'COSU',
    containerType: '40 ST',
    terminal: 'PIERA',
    startDate: new Date('2024-05-23'),
    endDate: new Date('2024-08-07'),
    isFavorite: false,
  },
];

const columns = [
  { field: 'steamShipping', headerName: 'Steam Shipping' },
  { field: 'containerType', headerName: 'Container Type' },
  { field: 'terminal', headerName: 'Terminal' },
  { field: 'startDate', headerName: 'Start Date', type: 'date' },
  { field: 'endDate', headerName: 'End Date', type: 'date' },
];

export default function Drayage() {
  const [startDateFilter, setStartDateFilter] = useState<Dayjs | null>(null);
  const [endDateFilter, setEndDateFilter] = useState<Dayjs | null>(null);
  const [containerFilter, setContainerFilter] = useState('');
  const [steamShippingFilter, setSteamShippingFilter] = useState('');
  const [terminalFilter, setTerminalFilter] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);

  const filteredData = placeholder.filter(
    (item) =>
      (containerFilter ? item.containerType === containerFilter : true) &&
      (steamShippingFilter
        ? item.steamShipping === steamShippingFilter
        : true) &&
      (terminalFilter ? item.terminal === terminalFilter : true) &&
      (!startDateFilter ||
        dayjs(item.startDate).isSameOrAfter(startDateFilter, 'day')) &&
      (!endDateFilter ||
        dayjs(item.endDate).isSameOrBefore(endDateFilter, 'day')) &&
      (!showFavorites || item.isFavorite)
  );

  return (
    <div>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold' }}>Filters</h1>
      <div className="mb-4.5" style={{ float: 'left', marginRight: '1rem' }}>
        <label className="mb-2.5 block text-sm font-medium text-black dark:text-white">
          Show favorites
        </label>
        <div
          className="relative z-20 w-32 rounded-sm border border-stroke bg-transparent py-2.5 px-5 outline-hidden transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          style={{ float: 'left', marginRight: '1rem' }}
        >
          <ToggleButton
            labelText="Favorites"
            descriptionText="Toggle to show only favorites"
            checked={showFavorites}
            onChange={() => setShowFavorites(!showFavorites)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-black dark:text-white">
            Steam Shipping Line
          </label>
          <select
            className="relative z-20 w-48 rounded-sm border border-stroke bg-transparent py-3 px-5 outline-hidden transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            value={steamShippingFilter}
            onChange={(e) => setSteamShippingFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="COSU">COSU</option>
            <option value="CMDU">CMDU</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-black dark:text-white">
            Container Type
          </label>
          <select
            className="relative z-20 w-48 rounded-sm border border-stroke bg-transparent py-3 px-5 outline-hidden transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            value={containerFilter}
            onChange={(e) => setContainerFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="20">20</option>
            <option value="40 ST">40 ST</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-black dark:text-white">
            Terminal
          </label>
          <select
            className="relative z-20 w-48 rounded-sm border border-stroke bg-transparent py-3 px-5 outline-hidden transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            value={terminalFilter}
            onChange={(e) => setTerminalFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="APM">APM</option>
            <option value="PIERA">PIERA</option>
          </select>
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div>
            <label className="block text-sm font-medium text-black dark:text-white">
              Start Date
            </label>
            <DatePicker
              value={startDateFilter}
              onChange={(newValue) => setStartDateFilter(newValue)}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black dark:text-white">
              End Date
            </label>
            <DatePicker
              value={endDateFilter}
              onChange={(newValue) => setEndDateFilter(newValue)}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </div>
        </LocalizationProvider>
      </div>
      <Table columns={columns} data={filteredData} update={() => {}} />
    </div>
  );
}
