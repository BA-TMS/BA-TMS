'use client';
import SelectInput from '@/components/Forms/UI_Elements/SelectInput';
import { usStates } from '@/components/Forms/data/states';
import ToggleButton from '@/components/Controls/ToggleButton';
import React, { useState } from 'react';

// DATE IMPORTS
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRange } from '@mui/x-date-pickers-pro/models';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { DatePicker } from '@mui/x-date-pickers';
import StartDate from '@/components/Calendar/StartDate';
import EndDate from '@/components/Calendar/EndDate';

import 'react-datepicker/dist/react-datepicker.css';

/* CODE THAT CAN REPLACE THE CALENDAR HTML */
/* 
<LocalizationProvider dateAdapter={AdapterDayjs}>
  <DateRangePicker
    value={value}
    onChange={(newValue) => setValue(newValue)}
  />
</LocalizationProvider>
*/

export default function Drayage() {
  const [value, setValue] = React.useState<DateRange<Dayjs>>([
    dayjs('2022-04-17'),
    dayjs('2022-04-21'),
  ]);

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
        <div
          x-data="{ isOptionSelected: false }"
          className="relative z-20 bg-white dark:bg-form-input"
        >
          <select className="relative z-20 w-48 rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
            <option value="Option 1">Steam 1</option>
          </select>
        </div>
      </div>

      <div className="mb-4.5" style={{ float: 'left', marginRight: '1rem' }}>
        <label className="mb-2.5 block text-sm font-medium text-black dark:text-white">
          Container Type
        </label>
        <div>
          <select className="relative z-20 w-48 rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
            <option value="20">20</option>
            <option value="40">40</option>
            <option value="60">60</option>
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
      <div className="mb-4.5" style={{ float: 'left', marginRight: '1rem' }}>
        <label className="mb-2.5 block text-sm font-medium text-black dark:text-white">
          End Date
        </label>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker className="relative z-20 w-48 rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
          </LocalizationProvider>
        </div>
      </div>
    </div>
  );
}
