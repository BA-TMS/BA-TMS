import { UseControllerProps, useController } from 'react-hook-form';

// component for date selector to work with react-hook-form

interface DateSelectProps extends UseControllerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: any;
  required?: boolean;
}

const DateSelect = (props: DateSelectProps) => {
  const { field, fieldState } = useController(props);

  function isDate(value: Date | number) {
    return value instanceof Date;
  }

  // if field.value is a date object or is already a date string
  // convert to to "YYYY-MM-DD" format for use in display
  if (
    isDate(field.value) ||
    (typeof field.value === 'string' &&
      new Date(field.value).toString() !== 'Invalid Date')
  ) {
    field.value = new Date(field.value).toISOString().split('T')[0];
  }

  return (
    <div className="mb-1.5">
      <div className="relative">
        <input
          type="date"
          {...field}
          className="block px-3 py-3.5 w-full body2 text-grey-800 dark:text-white bg-transparent rounded-[7px] border border-grey-400 appearance-none focus:outline-hidden focus:ring-0 focus:border-primary peer"
        />

        <label
          htmlFor={props.name}
          className="absolute body2 duration-300 transform -translate-y-4 top-2 z-10 origin-[0] text-grey-500 bg-white dark:text-white dark:bg-grey-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:rtl:translate-x-1/4 peer-focus:rtl:left-auto start-3"
        >
          {props.name}
          {props.required && <span className="text-danger"> *</span>}
        </label>

        <div className="min-h-5">
          {fieldState.error && (
            <p className="mt-1 text-danger">{fieldState.error.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DateSelect;
