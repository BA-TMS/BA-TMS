'use client';

import { useFormStatus } from 'react-dom';
import { type ComponentProps } from 'react';

type Props = ComponentProps<'button'> & {
  pendingText?: string;
};

export function SubmitButton({ children, pendingText, ...props }: Props) {
  const { pending, action } = useFormStatus();

  const isPending = pending && action === props.formAction;

  return (
    <button
      className="justify-center rounded-lg font-public font-bold w-auto h-auto disabled:text-grey-500 disabled:pointer-events-none bg-primary text-white hover:shadow-hover-primary hover:bg-primary-dark px-5.5 py-2.75 text-button-lg"
      {...props}
      type="submit"
      aria-disabled={pending}
    >
      {isPending ? pendingText : children}
    </button>
  );
}
