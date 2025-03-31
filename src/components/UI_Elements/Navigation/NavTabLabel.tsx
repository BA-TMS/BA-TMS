import { cva, VariantProps } from 'class-variance-authority';
import { SvgIconComponent } from '@mui/icons-material';

export interface TabProps extends VariantProps<typeof labelStyles> {
  Icon?: SvgIconComponent; // accepts an MUI icon as a prop
}

const labelStyles = cva(
  'h-6 w-7 mr-2 subtitle2 leading-none rounded-md cursor-default items-center whitespace-nowrap inline-flex justify-center',
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

const NavTabLabel = ({ color, Icon, ...props }: TabProps) => {
  return (
    <span
      className={labelStyles({
        color,
      })}
      {...props}
    >
      {Icon && <Icon fontSize="small" />}
    </span>
  );
};

export default NavTabLabel;
