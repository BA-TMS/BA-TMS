import { cva, VariantProps } from 'class-variance-authority';

export interface TabProps extends VariantProps<typeof labelStyles> {
  children: number | string; // anything else we could put here
}

const labelStyles = cva(
  'bg-opacity-16 h-6 w-8 px-2 mr-2 font-public font-bold text-tab-label leading-none rounded-md cursor-default items-center whitespace-nowrap inline-flex justify-center',
  {
    variants: {
      color: {
        primary: 'text-primary-dark bg-primary',
        secondary: 'text-secondary-dark bg-secondary',
        info: 'text-info-dark bg-info',
        success: 'text-success-dark bg-success',
        warning: 'text-warning-dark bg-warning',
        error: 'text-error-dark bg-error',
        default: 'text-grey-800 bg-grey-500',
      },
      ownerState: {},
      defaultVariants: {
        color: 'default',
      },
    },
  }
);

const TabLabel = ({ color, children, ...props }: TabProps) => {
  return (
    <span
      className={labelStyles({
        color,
      })}
      {...props}
    >
      {children}
    </span>
  );
};

export default TabLabel;
