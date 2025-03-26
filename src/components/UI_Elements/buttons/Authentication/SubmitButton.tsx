'use client';

import { useFormStatus } from 'react-dom';
import { cva, VariantProps } from 'class-variance-authority';
import { type ComponentProps } from 'react';

export interface Props
  extends ComponentProps<'button'>,
    VariantProps<typeof buttonStyles> {
  pendingText?: string;
}

const buttonStyles = cva(
  'justify-center rounded-lg font-public font-bold w-auto h-auto disabled:text-grey-500 disabled:pointer-events-none text-button-lg',
  {
    variants: {
      variant: {
        contained:
          'bg-primary text-white hover:shadow-hover-primary hover:bg-primary-dark disabled:bg-grey-300 px-5.5 py-2.75',
        text: 'text-primary hover:text-primary-dark',
      },
    },
    defaultVariants: {
      variant: 'contained',
    },
  }
);

export function SubmitButton({
  variant,
  children,
  pendingText,
  ...props
}: Props) {
  const { pending, action } = useFormStatus();

  const isPending = pending && action === props.formAction;

  return (
    <button
      className={buttonStyles({
        variant,
      })}
      {...props}
      type="submit"
      aria-disabled={pending}
    >
      {isPending ? pendingText : children}
    </button>
  );
}
