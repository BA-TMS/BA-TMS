import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import Iconify from '../iconify/Iconify';

type InputProps = {
  label: string;
  id: string;
} & ComponentPropsWithoutRef<'input'>; // Merge operator, using a big union type.
// This gives all the info of the default props built in, like type="number" in App.tsx.

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, id, ...props },
  ref
) {
  return (
    <>
      <div>
        <label htmlFor={id}>{label}</label>
        <input id={id} name={id} {...props} ref={ref} className="text-input" />
      </div>
    </>
  );
});

export default Input;
