import DatePicker from '@/components/Calendar/DatePicker';
import Searchbar from '../Searchbar';
import Dropdown from '../Input/Dropdown';

interface SearchProps {
  placeholder: string;
  search: (arg: string) => void; // function to handle searching functionality from parent component
}

export function TableSearch({ placeholder, search }: SearchProps) {
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
      <DatePicker label="Start Date" />
      <DatePicker label="End Date" />
    </div>
  );
}
