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

export default function Button({
  intent,
  size,
  className,
  children,
  ...props
}: ButtonProps) {
  // this gives us the button
  return (
    <button
      className={buttonStyles({
        className,
        intent,
        size,
      })}
      {...props}
    >
      {children}
    </button>
  );
}

const buttonStyles = cva(
  'flex items-center justify-center rounded-lg font-public font-bold w-auto h-auto disabled:pointer-events-none',
  {
    variants: {
      variant: {
        contained:
          'disabled:bg-grey-500 disabled:bg-opacity-25 disabled:text-grey-500 disabled:text-opacity-80',
        outline: '',
        text: '',
        soft: '',
      },
      intent: {
        default: '',
        primary: '',
        info: 'bg-info text-white hover:shadow-hover-info hover:bg-info-dark',
        success:
          'bg-success text-white hover:shadow-hover-success hover:bg-success-dark',
        warning:
          'bg-warning text-black hover:shadow-hover-warning hover:bg-warning-dark',
        error:
          'bg-error text-white hover:shadow-hover-error hover:bg-error-dark',
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
        class: 'bg-grey-300 text-black hover:shadow-default',
      },
      {
        variant: 'contained',
        intent: 'primary',
        className:
          'bg-primary text-white hover:shadow-hover-primary hover:bg-primary-dark',
      },
    ],
    defaultVariants: {
      variant: 'contained',
      intent: 'info',
      size: 'large',
    },
  }
);

// function ButtonWrapper({ children }: { children: React.ReactNode }) {
//   return <div className="space-x-8">{children}</div>;
// }
