/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect, useContext } from 'react';
import { UseControllerProps, useController } from 'react-hook-form';
import { UserContext } from '@/context/userContextProvider';

// for use when we need to fetch from database to populate options
// pass this component a database action as a prop
// options are mapped to create dropdown <option> elements
// T represents shape of the data fetched
// may need to refactor this to make nameKey mandatory as new schema changes happen

interface Option {
  id: string;
  [key: string]: string | boolean | number; // Allows other properties with dynamic keys in case name is something different ex: "companyName"
}

interface SelectInputProps<T> extends UseControllerProps {
  dbaction: (org: string) => any;
  control?: any; // this is from external library
  required?: boolean;
  nameKey?: keyof T; // in case the data returned from dbaction does not have a "name" key but instead the "name" is something else, like "companyName"
}

const DynamicSelect = <T extends Option>({
  dbaction,
  control,
  required,
  name,
  nameKey,
}: SelectInputProps<T>) => {
  const { field, fieldState } = useController({
    control,
    name,
    rules: { required },
  });

  const { organization } = useContext(UserContext);

  const [options, setOptions] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async (org: string) => {
      try {
        const data = await dbaction(org);
        setOptions(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchData(organization);
  }, [dbaction, organization]);

  return (
    <div className="mb-1.5">
      <div className="relative">
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
          className="block px-3 py-3.5 w-full body2 text-grey-800 dark:text-white bg-transparent rounded-[7px] border border-grey-400 appearance-none focus:outline-hidden focus:ring-0 focus:border-primary peer"
        >
          <option value="">{`Select ${name}`}</option>
          {/* if not loading, map through fetched data */}
          {loading ? (
            <option value="">Loading...</option>
          ) : (
            options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name ? option.name : option[nameKey as keyof T]}
              </option>
            ))
          )}
        </select>
        <div className="absolute inset-y-0 right-4 -mt-5 flex items-center pointer-events-none">
          <svg
            width="12"
            height="7"
            viewBox="0 0 12 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.0774 6.11768C5.90516 6.11802 5.73824 6.05803 5.60561 5.94813L1.18258 2.26228C0.869092 2.00171 0.826187 1.53635 1.08675 1.22286C1.34731 0.909376 1.81267 0.86647 2.12616 1.12703L6.0774 4.42956L10.0286 1.24498C10.1809 1.1213 10.3762 1.06344 10.5713 1.08419C10.7664 1.10494 10.9452 1.20261 11.068 1.35556C11.2045 1.50878 11.271 1.71196 11.2514 1.91622C11.2318 2.12047 11.128 2.30732 10.9648 2.43183L6.54182 5.99236C6.40538 6.08489 6.24186 6.12901 6.0774 6.11768Z"
              fill="#637381"
            />
          </svg>
        </div>

        <div className="min-h-5">
          {fieldState.error && (
            <p className="caption mb-1 text-error-dark">
              {fieldState.error.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DynamicSelect;
