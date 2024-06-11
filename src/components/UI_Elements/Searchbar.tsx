import { SearchIcon } from '@/assets/icons';

interface SearchbarProps {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Searchbar({ placeholder, onChange }: SearchbarProps) {
  return (
    <form className="max-w-md mx-auto">
      <label
        htmlFor="default-search"
        className="mb-2 body1 text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
          {SearchIcon}
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 body1 text-grey-900 placeholder-grey-500 border border-grey-300 rounded-lg focus:ring-primary focus:border-primary dark:bg-grey-800 dark:border-grey-700  dark:text-white dark:focus:ring-primary dark:focus:border-primary"
          placeholder={placeholder}
          onChange={onChange}
          //   required
        />
      </div>
    </form>
  );
}
