'use client';

import { ButtonProps } from '@/types';

export default function SubmitButton(props: ButtonProps) {
  return (
    <button
      className="inline-block w-auto uppercase font-bold tracking-wide bg-blue-500 hover:bg-blue-700 text-white-700 py-3 px-4 rounded"
      type="submit"
      onClick={props.onClick}
    >
      Submit
    </button>
  );
}
