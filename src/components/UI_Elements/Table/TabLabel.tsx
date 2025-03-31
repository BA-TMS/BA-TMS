import { cva, VariantProps } from 'class-variance-authority';

export interface TabProps extends VariantProps<typeof labelStyles> {
  children: number | string; // anything else we could put here
}

const labelStyles = cva(
  'h-6 px-2 mr-2 font-public font-bold text-tab-label leading-none rounded-md cursor-default items-center whitespace-nowrap inline-flex justify-center',
  {
    variants: {
      color: {
        primary: 'text-primary-dark bg-primary/16',
        secondary: 'text-secondary-dark bg-secondary/16',
        info: 'text-info-dark bg-info/16',
        success: 'text-success-dark bg-success/16',
        warning: 'text-warning-dark bg-warning/16',
        error: 'text-error-dark bg-error/16',
        default: 'text-grey-800 bg-grey-500/16',
      },
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
