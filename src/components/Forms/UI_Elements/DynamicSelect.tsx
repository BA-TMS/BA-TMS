'use client';

import { useState, useEffect } from 'react';
import { UseControllerProps, useController } from 'react-hook-form';

// for use when we need to fetch from database to populate options
// pass this component a database action as a prop
// options are mapped to create dropdown <option> elements

interface SelectInputProps extends UseControllerProps {
  dbaction: () => Promise<Data[]>; // pass the action for fetching data
  control?: any;
  required?: boolean;
}

interface Data {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  address: string;
  addressAddOn: string | null;
  city: string;
  state: string;
  postCountry: string;
  postCode: string;
  telCountry: string;
  telephone: string;
}

const DynamicSelect = ({
  dbaction,
  control,
  required,
  name,
}: SelectInputProps) => {
  const { field, fieldState } = useController({
    control,
    name,
    rules: { required },
  });

  const [options, setOptions] = useState<Data[]>([]);
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
    <div className="mb-4.5">
      <label className="mb-2.5 block text-black dark:text-white">
        {name}
        {required && <span className="text-danger"> *</span>}
        <select
          {...field}
          className="relative z-20 w-full rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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
          <p className="mt-1 text-danger">{fieldState.error.message}</p>
        )}
      </label>
    </div>
  );
};

export default DynamicSelect;
