/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseControllerProps, useController } from 'react-hook-form';

// select input takes in an array of objects
// options are mapped to create dropdown <option> elements and values
// this solves if the display name and the value will be different

interface Options {
  [key: string]: any;
}

interface SelectInputProps extends UseControllerProps {
  options: Options[];
  control?: any;
  required?: boolean;
}

const SelectInput = (props: SelectInputProps) => {
  const { field, fieldState } = useController(props);

  return (
    <div className="mb-1.5">
      <div className="relative">
        <label
          htmlFor={props.name}
          className="absolute body2 duration-300 transform -translate-y-5 scale- top-2 z-10 origin-[0] text-grey-500 bg-white dark:bg-grey-900 dark:text-white px-2 start-3"
        >
          {props.name}
          {props.required && <span className="text-error-dark"> *</span>}
        </label>
        <select
          {...field}
          name={props.name}
          id={props.name}
          className="block px-3 py-3.5 w-full body2 text-grey-800 dark:text-white bg-transparent rounded-[7px] border border-grey-400 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
        >
          <option value="">{`Select ${props.name}`}</option>
          {props.options.map((option: Options, index: number) => (
            <option key={index} value={Object.values(option)}>
              {Object.keys(option)}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
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
      </div>

      <div className="min-h-5">
        {fieldState.error && (
          <p className="caption mb-1 text-error-dark">
            {fieldState.error.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default SelectInput;
