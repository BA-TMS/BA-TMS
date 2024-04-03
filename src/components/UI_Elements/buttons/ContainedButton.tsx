import { cva, VariantProps } from 'class-variance-authority';
import { ButtonOrLink, Props as ButtonOrLinkProps } from './ButtonOrLink';

/**
This is a base component that will render a button with specific styling depending on the props that are passed to it by using class-variance-authority. Must be used in a client component if passing an onClick function. This may need modified in the future
 */

const buttonStyles = cva(
  'flex items-center justify-center rounded-lg font-public font-bold w-auto h-auto disabled:bg-grey-500 disabled:bg-opacity-25 disabled:text-grey-500 disabled:text-opacity-80 disabled:pointer-events-none',
  {
    variants: {
      intent: {
        default: 'bg-grey-300 text-black hover:shadow-default',
        primary:
          'bg-primary text-white hover:shadow-hover-primary hover:bg-primary-dark',
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
        small: 'px-2.5 py-1 text-button-sm', // height + width not quite accurate
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'large',
    },
  }
);

export interface Props
  extends ButtonOrLinkProps,
    VariantProps<typeof buttonStyles> {}

export function ContainedButton({ intent, size, ...props }: Props) {
  return <ButtonOrLink className={buttonStyles({ intent, size })} {...props} />;
}
