import { cva, VariantProps } from 'class-variance-authority';
import { ButtonOrLink, Props as ButtonOrLinkProps } from './ButtonOrLink';

/**
 * This is a base component that will render a button with specific styling depending on the props that are passed to it by using class-variance-authority.
 */

const buttonStyles = cva(
  'flex items-center justify-center rounded-lg font-public font-bold w-auto h-auto disabled:bg-grey-500 disabled:bg-opacity-25 disabled:text-grey-500 disabled:text-opacity-80 disabled:pointer-events-none',
  {
    variants: {
      intent: {
        default: 'bg-grey-300 text-black hover:shadow-default',
        primary: 'bg-primary text-white hover:shadow-hover-primary',
        info: 'bg-info text-white hover:shadow-hover-info',
        success: 'bg-success text-white hover:shadow-hover-success',
        warning: 'bg-warning text-black hover:shadow-hover-warning',
        error: 'bg-error text-white hover:shadow-hover-error',
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
