import { UseControllerProps, useController } from 'react-hook-form';

// component for date selector
// needs some style updates / integrate with the MUI date selector

interface DateSelectProps extends UseControllerProps {
  control?: any;
  required?: boolean;
}

const DateSelect = (props: DateSelectProps) => {
  const { field, fieldState } = useController(props);

  return (
    <div className="relative">
      <input
        type="date"
        {...field}
        className="block px-3 py-3.5 w-full body2 text-grey-800 dark:text-white bg-transparent rounded-[7px] border border-grey-400 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
      />

      <label
        htmlFor={props.name}
        className="absolute body2 duration-300 transform -translate-y-4 top-2 z-10 origin-[0] text-grey-500 bg-white dark:text-white dark:bg-grey-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-3"
      >
        {props.name}
        {props.required && <span className="text-danger"> *</span>}
      </label>

      {fieldState.error && (
        <p className="mt-1 text-danger">{fieldState.error.message}</p>
      )}
    </div>
  );
};

export default DateSelect;
