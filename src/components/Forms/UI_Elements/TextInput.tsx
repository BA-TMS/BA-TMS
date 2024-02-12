'use client';

import {
  UseControllerProps,
  useController,
  Control,
  FieldValues,
} from 'react-hook-form';

// optional props if we want a textarea instead of input
interface TextInputProps extends UseControllerProps {
  isTextArea?: boolean;
  rows?: number;
  control?: any; // this "works"
}

const TextInput = ({ control, name, isTextArea, rows }: TextInputProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({ control, name });

  return (
    <div className="mb-4.5">
      <label className="mb-2.5 block text-black dark:text-white">{name}</label>
      {isTextArea ? (
        <textarea
          {...field}
          rows={rows || 3}
          placeholder={field.name}
          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        />
      ) : (
        <input
          {...field}
          type="text"
          placeholder={field.name}
          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        />
      )}
      {error && <p className="mt-1 text-danger">{error.message}</p>}
    </div>
  );
};

export default TextInput;
