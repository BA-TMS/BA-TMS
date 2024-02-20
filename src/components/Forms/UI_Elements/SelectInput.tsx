import { UseControllerProps, useController } from 'react-hook-form';

interface SelectInputProps extends UseControllerProps {
  options: { name: string; abbreviation?: string }[];
  control?: any;
  required?: boolean;
}

const SelectInput = (props: SelectInputProps) => {
  const { field, fieldState } = useController(props);

  return (
    <div className="mb-4.5">
      <label className="mb-2.5 block text-black dark:text-white">
        {props.name}
        {props.required && <span className="text-danger"> *</span>}
        <select
          {...field}
          className="relative z-20 w-full rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        >
          <option value="">{`Select ${props.name}`}</option>
          {props.options.map((option, index) => (
            <option key={index} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
        {fieldState.error && (
          <p className="mt-1 text-danger">{fieldState.error.message}</p>
        )}
      </label>
    </div>
  );
};

export default SelectInput;
