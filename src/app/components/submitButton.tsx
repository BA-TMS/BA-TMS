'use client';

import { ButtonProps } from '@/types';

export default function SubmitButton(props: ButtonProps) {
  return (
    <button className="btn-blue" type="submit" onClick={props.onClick}>
      Submit
    </button>
  );
}
