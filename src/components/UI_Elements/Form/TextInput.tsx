'use client';

import { useState } from 'react';
import { UseControllerProps, useController } from 'react-hook-form';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

// optional props
interface TextInputProps extends UseControllerProps {
  isTextArea?: boolean;
  rows?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: any; // control is from react-hook-form
  required?: boolean;
  type?: 'password' | 'tel' | 'email'; // type of input
}

const TextInput = ({
  control,
  name,
  isTextArea,
  rows,
  required,
  type,
}: TextInputProps) => {
  const [textType, setTextType] = useState(type ? type : 'text');
  // in the event this is a password type
  const [showPassword, setShowPassword] = useState(false);

  const {
    field,
    fieldState: { error },
  } = useController({ control, name });

  const toggleVisibility = () => {
    setShowPassword((prev) => !prev);
    setTextType(textType === 'password' ? 'text' : 'password');
  };

  return (
    <div className="mb-1.5">
      <div className="relative">
        {isTextArea ? (
          <>
            <textarea
              {...field}
              rows={rows || 3}
              placeholder=""
              className="block px-3 py-3.5 w-full body2 text-grey-800 dark:text-white bg-transparent rounded-[7px] border border-grey-400 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
            ></textarea>
            <label
              htmlFor={name}
              className="absolute body2 duration-300 transform -translate-y-0 scale-100 top-3 left-3 z-10 origin-[0] text-grey-500 bg-white dark:text-white dark:bg-grey-900 px-2 peer-focus:px-2 peer-placeholder-shown:top-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:top-2 peer-focus:-translate-y-4"
            >
              {name}
              {required && <span className="text-error-dark"> *</span>}
            </label>
          </>
        ) : (
          <>
            <input
              {...field}
              placeholder={field.name}
              className="block px-3 py-3.5 w-full body2 text-grey-800 dark:text-white bg-transparent rounded-[7px] border border-grey-400 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
              type={type === 'password' && !showPassword ? 'password' : 'text'}
            />
            {type === 'password' && (
              <div
                onClick={toggleVisibility}
                className="absolute inset-y-0 right-5 flex items-center cursor-pointer"
              >
                {showPassword ? (
                  <VisibilityIcon fontSize="small" />
                ) : (
                  <VisibilityOffIcon fontSize="small" />
                )}
              </div>
            )}
            <label
              htmlFor={name}
              className="absolute body2 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] text-grey-500 bg-white dark:text-white dark:bg-grey-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-95 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-3"
            >
              {name}
              {required && <span className="text-error-dark"> *</span>}
            </label>
          </>
        )}
      </div>
      <div className="min-h-5">
        {error && <p className="caption text-error-dark">{error.message}</p>}
      </div>
    </div>
  );
};

export default TextInput;
