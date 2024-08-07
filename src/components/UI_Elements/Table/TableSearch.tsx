import { useState } from 'react';
import DatePicker from '@/components/UI_Elements/Input/DatePicker';
import Searchbar from '../Searchbar';
import Dropdown from '../Input/Dropdown';
import dayjs from 'dayjs';

// pass this component a function to handle field search
// and an optional function to handle date search
// TODO: This element needs dropdowns handled, currently does not have functionality

interface SearchProps {
  placeholder: string; // placeholder text for search bar
  dropdownLabel?: string; // optional label for dropdown component
  dropdownOptions: string[]; // options to pass to dropdown
  search: (arg: string) => void; // handles field search from parent component
  dateSearch?: (
    // optional function to handle search by date
    startDate: dayjs.Dayjs | null,
    endDate: dayjs.Dayjs | null
  ) => void;
}

export function TableSearch({
  placeholder,
  dropdownLabel,
  dropdownOptions,
  search,
  dateSearch,
}: SearchProps) {
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null);
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null);

  const handleStartDateChange = (date: dayjs.Dayjs | null) => {
    setStartDate(date);
    dateSearch?.(date, endDate);
  };

  const handleEndDateChange = (date: dayjs.Dayjs | null) => {
    setEndDate(date);
    dateSearch?.(startDate, date);
  };

  return (
    <div className="h-26 px-5 py-6 flex gap-4 bg-white dark:bg-grey-900 border-x border-t border-grey-300 dark:border-grey-700">
      <Searchbar
        placeholder={placeholder}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value;
          search(value);
        }}
      />
      <Dropdown
        label={dropdownLabel ? dropdownLabel : 'Field'}
        options={dropdownOptions}
      />

      {dateSearch && (
        <>
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
        </>
      )}
    </div>
  );
}
