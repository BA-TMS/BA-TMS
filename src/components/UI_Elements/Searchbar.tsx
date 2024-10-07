import { SearchIcon } from '@/assets/icons/layout';

interface SearchbarProps {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Searchbar({ placeholder, onChange }: SearchbarProps) {
  return (
    <div className="w-full">
      <label
        htmlFor="default-search"
        className="body1 text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="h-14 relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
          {SearchIcon}
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full h-full p-0 ps-12 pe-4 body1 text-grey-900 placeholder-grey-500 border border-grey-300 rounded-lg dark:bg-grey-800 dark:border-grey-700 dark:text-white box-border focus:outline-none"
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
