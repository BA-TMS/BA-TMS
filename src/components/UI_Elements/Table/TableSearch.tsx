import { useState } from 'react';
import DatePicker from '@/components/Calendar/DatePicker';
import Searchbar from '../Searchbar';
import Dropdown from '../Input/Dropdown';

import dayjs from 'dayjs';

// pass this component a function to handle field search
// and a function to handle date search

interface SearchProps {
  placeholder: string;
  search: (arg: string) => void; // handles field search from parent component
  // dateSearch?: any; // handle date searching
  dateSearch: (
    startDate: dayjs.Dayjs | null,
    endDate: dayjs.Dayjs | null
  ) => void; // maybe
}
// might want to make a clear button for dates

export function TableSearch({ placeholder, search, dateSearch }: SearchProps) {
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null);
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null);

  const handleStartDateChange = (date: dayjs.Dayjs | null) => {
    console.log('date passed to handle start', date);
    // pass this to datepicker
    setStartDate(date);
    dateSearch(date, endDate);
  };

  const handleEndDateChange = (date: dayjs.Dayjs | null) => {
    console.log('date passed to handle end', date);
    // pass this to datepicker
    setEndDate(date);
    dateSearch(startDate, date);
  };

  return (
    <div className="h-26 px-5 py-6 flex gap-4 bg-white dark:bg-grey-900 border-x border-grey-300 dark:border-grey-700">
      <Searchbar
        placeholder={placeholder}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value;
          search(value);
        }}
      />
      <Dropdown
        label="Field"
        options={['Option #1', 'Option #2', 'Option #3']}
      />
      <DatePicker
        label="Start Date"
        date={startDate}
        handleChange={handleStartDateChange}
      />
      <DatePicker
        label="End Date"
        date={endDate}
        handleChange={handleEndDateChange}
      />
    </div>
  );
}
