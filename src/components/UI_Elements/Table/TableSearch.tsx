import Searchbar from '../Searchbar';

interface SearchProps {
  placeholder: string;
  search: (arg: string) => void; // function to handle searching functionality from parent component
}

export function TableSearch({ placeholder, search }: SearchProps) {
  return (
    <div className="h-26 px-5 py-6 bg-white dark:bg-grey-900 border-x border-grey-300 dark:border-grey-700">
      <Searchbar
        placeholder={placeholder}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value;
          search(value);
        }}
      />
    </div>
  );
}
