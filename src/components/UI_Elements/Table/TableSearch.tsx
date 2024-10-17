import { useState } from 'react';
import DatePicker from '@/components/UI_Elements/Input/DatePicker';
import Searchbar from '../Searchbar';
import Dropdown from '../Input/Dropdown';
import dayjs from 'dayjs';

// pass this component props to handle searching in a table

interface SearchProps {
  placeholder: string; // placeholder text for search bar
  dropdownLabel?: string; // optional label for dropdown component
  dropdownOptions: string[]; // options to pass to dropdown
  search: (arg: string) => void; // handles field search from parent component
  updateField: (arg: string) => void; // update the field to narrow search focus
  dateSearch?: (
    startDate: dayjs.Dayjs | null,
    endDate: dayjs.Dayjs | null
  ) => void; // optional function to handle search by date
}

export function TableSearch({
  placeholder,
  dropdownLabel,
  dropdownOptions,
  search,
  dateSearch,
  updateField,
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
          search(value); // update the search value
        }}
      />
      <Dropdown
        label={dropdownLabel ? dropdownLabel : 'Field'}
        options={dropdownOptions}
        searchField={updateField} // update the field to search
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
