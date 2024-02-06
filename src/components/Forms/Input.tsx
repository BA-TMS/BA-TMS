'use client';

import {
  UseControllerProps,
  useController,
  type Merge,
  type FieldError,
  type FieldValues,
  type UseControllerReturn,
} from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
// do we need useEffect/ useState here?

type TextInputProps = {
  icon?: React.ReactNode;
  label?: string;
  name: string;
  autoFocus?: boolean;
  value?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  defaultValue?: string;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  fullWidth?: boolean;
  type?: 'text' | 'password' | 'email' | 'number' | 'textarea';
  size?: 'sm' | 'md' | 'lg';
  rounded?: boolean;
  maxTextareaHeight?: number;
  error?: Merge<FieldError, (FieldError | undefined)[]>; // check on this
  control: any; // ugh
};

const TextInput = ({ type, control }: UseControllerProps<TextInputProps>) => {
  // do we need this with react-hook-form?
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // field react-hook-form
  // this is how input gets connected to the form
  const {
    field,
    fieldState: { invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields },
  } = useController({
    name,
    control,
    rules: { required: true },
  });

  return (
    <div className="mb-4.5">
      <label
        htmlFor={field.name}
        className="mb-2.5 block text-black dark:text-white"
      >
        {field.name}
      </label>

      {/* if type is textarea, render this */}
      {type === 'textarea' ? (
        <textarea
          {...field}
          // ref={textareaRef}
          id={field.id}
          name={field.name} // send down the input name
          autoFocus={field.autoFocus}
          onChange={field.onChange} // send value to hook form
          onBlur={field.onBlur} // notify when input is touched/blur
          disabled={field.disabled}
          placeholder={field.placeholder}
          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        />
      ) : (
        // or render this if not a textarea input
        <input
          {...field}
          // ref={textareaRef}
          id={field.id}
          name={field.name} // send down the input name
          autoFocus={field.autoFocus}
          onChange={field.onChange} // send value to hook form
          onBlur={field.onBlur} // notify when input is touched/blur
          disabled={field.disabled}
          placeholder={field.placeholder}
          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        />
      )}
      {/* need to add in errors with react-hook-form */}
      {field.errors && (
        <p className="mt-1 text-danger">{field.errors.message}</p>
      )}
    </div>
  );
};

export default TextInput;
