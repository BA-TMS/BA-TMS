'use client';

import { useState, useEffect } from 'react';
import { UseControllerProps, useController } from 'react-hook-form';

// for use when we need to fetch from database to populate options
// pass this component a database action as a prop
// options are mapped to create dropdown <option> elements
// T represents shape of the data fetched

interface SelectInputProps<T> extends UseControllerProps {
  dbaction: () => Promise<T[]>;
  control?: any; // this is from external library
  required?: boolean;
}

const DynamicSelect = <T extends { id: string; name: string }>({
  dbaction,
  control,
  required,
  name,
}: SelectInputProps<T>) => {
  const { field, fieldState } = useController({
    control,
    name,
    rules: { required },
  });

  const [options, setOptions] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dbaction();
        console.log(data);
        setOptions(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchData();
  }, [dbaction]);

  return (
    <div className="relative mt-5">
      <label
        htmlFor={name}
        className="absolute body2 duration-300 transform -translate-y-5 scale- top-2 z-10 origin-[0] text-grey-500 bg-white dark:bg-grey-900 dark:text-white px-2 start-3"
      >
        {name}
        {required && <span className="text-error-dark"> *</span>}
      </label>
      <select
        {...field}
        name={name}
        id={name}
        className="block px-3 py-3.5 w-full body2 text-grey-800 dark:text-white bg-transparent rounded-[7px] border border-grey-400 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
      >
        <option value="">{`Select ${name}`}</option>
        {/* if not loading, map through fetched data */}
        {loading ? (
          <option value="">Loading...</option>
        ) : (
          options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))
        )}
      </select>

      {fieldState.error && (
        <p className="caption mb-1 text-error-dark">
          {fieldState.error.message}
        </p>
      )}
    </div>
  );
};

export default DynamicSelect;
