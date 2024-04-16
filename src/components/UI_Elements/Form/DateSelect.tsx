import { UseControllerProps, useController } from 'react-hook-form';

// component for date selector
// needs some style updates

interface DateSelectProps extends UseControllerProps {
  control?: any;
  required?: boolean;
}

const DateSelect = (props: DateSelectProps) => {
  const { field, fieldState } = useController(props);

  return (
    <div className="mb-4.5">
      <label className="mb-2.5 block text-black dark:text-white">
        {props.name}
        {props.required && <span className="text-danger"> *</span>}
        <input
          type="date"
          className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:white"
          {...field}
        />
        {fieldState.error && (
          <p className="mt-1 text-danger">{fieldState.error.message}</p>
        )}
      </label>
    </div>
  );
};

export default DateSelect;
