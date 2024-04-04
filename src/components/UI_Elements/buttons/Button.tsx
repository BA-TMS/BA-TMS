import { cva, VariantProps } from 'class-variance-authority';
import { ComponentProps } from 'react';

export interface ButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof buttonStyles> {}

const buttonStyles = cva(
  'justify-center rounded-lg font-public font-bold w-auto h-auto disabled:text-grey-500 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        contained: 'disabled:bg-grey-300 ',
        outline: 'bg-white border',
        text: '',
        soft: '',
      },
      intent: {
        default: '',
        primary: '',
        info: '',
        success: '',
        warning: '',
        error: '',
      },
      size: {
        large: 'px-5.5 py-2.75 text-button-lg',
        medium: 'px-4 py-1.5 text-button-md',
        small: 'px-2.5 py-1 text-button-sm',
      },
    },
    compoundVariants: [
      {
        variant: 'contained',
        intent: 'default',
        className:
          'bg-grey-300 text-black hover:bg-grey-500 hover:shadow-default',
      },
      {
        variant: 'contained',
        intent: 'primary',
        className:
          'bg-primary text-white hover:shadow-hover-primary hover:bg-primary-dark',
      },
      {
        variant: 'contained',
        intent: 'info',
        className:
          'bg-info text-white hover:shadow-hover-info hover:bg-info-dark',
      },
      {
        variant: 'contained',
        intent: 'success',
        className:
          'bg-success text-white hover:shadow-hover-success hover:bg-success-dark',
      },
      {
        variant: 'contained',
        intent: 'warning',
        className:
          'bg-warning text-black hover:shadow-hover-warning hover:bg-warning-dark',
      },
      {
        variant: 'contained',
        intent: 'error',
        className:
          'bg-error text-white hover:shadow-hover-error hover:bg-error-dark',
      },
      // outline button
      {
        variant: 'outline',
        intent: 'default',
        className: 'border-grey-300 text-black hover:bg-grey-300/25',
      },
      {
        variant: 'outline',
        intent: 'primary',
        className: 'border-bg-primary text-primary hover:bg-primary/25',
      },
      {
        variant: 'outline',
        intent: 'info',
        className: 'border-bg-info text-info hover:bg-info/25',
      },
      {
        variant: 'outline',
        intent: 'success',
        className: 'border-bg-success text-success hover:bg-success/25',
      },
      {
        variant: 'outline',
        intent: 'warning',
        className: 'border:bg-warning text-warning hover:bg-warning/25',
      },
      {
        variant: 'outline',
        intent: 'error',
        className: 'border-error text-error hover:bg-error/25',
      },
      // text button
      {
        variant: 'text',
        intent: 'default',
        className: 'text-black hover:bg-grey-300/25',
      },
      {
        variant: 'text',
        intent: 'primary',
        className: ' text-primary hover:bg-primary/25',
      },
      {
        variant: 'text',
        intent: 'info',
        className: 'text-info hover:bg-info/25',
      },
      {
        variant: 'text',
        intent: 'success',
        className: 'text-success hover:bg-success/25',
      },
      {
        variant: 'text',
        intent: 'warning',
        className: 'text-warning hover:bg-warning/25',
      },
      {
        variant: 'text',
        intent: 'error',
        className: 'text-error hover:bg-error/25',
      },
    ],
    defaultVariants: {
      variant: 'contained',
      intent: 'primary',
      size: 'large',
    },
  }
);

export default function Button({
  variant,
  intent,
  size,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonStyles({
        variant,
        intent,
        size,
      })}
      {...props}
    >
      {children}
    </button>
  );
}
