import { cva, VariantProps } from 'class-variance-authority';
import { ComponentProps } from 'react';

// type ButtonVariants = Omit<
//   RequiredVariantProps<typeof buttonVariants>,
//   '_content'
// >;

// type SVGComponent = React.ComponentType<React.SVGAttributes<SVGSVGElement>>;

// type ButtonProps = Partial<buttonStyles> &
//   React.ButtonHTMLAttributes<HTMLButtonElement>

export interface ButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof buttonStyles> {}

const buttonStyles = cva(
  'justify-center rounded-lg font-public font-bold w-auto h-auto disabled:pointer-events-none',
  {
    variants: {
      variant: {
        contained: 'disabled:bg-grey-300 disabled:text-grey-500',
        outline: 'bg-transparent disabled:text-grey-500',
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
        class: 'bg-grey-300 text-black hover:bg-grey-500 hover:shadow-default',
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
      // outline
      {
        variant: 'contained',
        intent: 'default',
        class: 'bg-grey-300 text-black hover:bg-grey-500 hover:shadow-default',
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
