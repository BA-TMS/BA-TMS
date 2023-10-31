'use client';

import { ButtonProps } from '@/types';

export default function Button(props: ButtonProps) {
  return (
    <button className="btn-blue" type={props.type} onClick={props.onClick}>
      {props.name}
    </button>
  );
}
