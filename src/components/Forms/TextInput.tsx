'use client';

import { UseControllerProps, useController } from 'react-hook-form';

// optional props if we want a textarea instead of input
interface TextInputProps extends UseControllerProps {
  isTextArea?: boolean;
  rows?: number;
}

const TextInput = (props: TextInputProps) => {
  const { field, fieldState } = useController(props);

  return (
    <div className="mb-4.5">
      <label className="mb-2.5 block text-black dark:text-white">
        {props.name}
      </label>
      {props.isTextArea ? (
        <textarea
          {...field}
          rows={props.rows || 3}
          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        />
      ) : (
        <input
          {...field}
          type="text"
          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        />
      )}
      {fieldState.error && (
        <p className="mt-1 text-danger">{fieldState.error.message}</p>
      )}
    </div>
  );
};

export default TextInput;
