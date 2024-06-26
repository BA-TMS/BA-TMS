'use client';

import { UseControllerProps, useController } from 'react-hook-form';

// optional props
interface TextInputProps extends UseControllerProps {
  isTextArea?: boolean;
  rows?: number;
  control?: any;
  required?: boolean;
}

const TextInput = ({
  control,
  name,
  isTextArea,
  rows,
  required,
}: TextInputProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({ control, name });

  return (
    <div className="relative">
      {isTextArea ? (
        <textarea
          {...field}
          rows={rows || 3}
          placeholder={field.name}
          className="block px-3 py-3.5 w-full body2 text-grey-800 dark:text-white bg-transparent rounded-[7px] border border-grey-400 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
        />
      ) : (
        <input
          {...field}
          placeholder={field.name}
          className="block px-3 py-3.5 w-full body2 text-grey-800 dark:text-white bg-transparent rounded-[7px] border border-grey-400 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
        />
      )}
      <label
        htmlFor={name}
        className="absolute body2 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] text-grey-500 bg-white dark:text-white dark:bg-grey-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-95 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-3"
      >
        {name}
        {required && <span className="text-error-dark"> *</span>}
      </label>
      {error && <p className="caption mb-1 text-error-dark">{error.message}</p>}
    </div>
  );
};

export default TextInput;
