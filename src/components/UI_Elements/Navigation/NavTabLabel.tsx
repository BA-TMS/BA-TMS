import { cva, VariantProps } from 'class-variance-authority';
import { SvgIconComponent } from '@mui/icons-material';

// need an icon
// check if active tab- change color to green

export interface TabProps extends VariantProps<typeof labelStyles> {
  Icon?: SvgIconComponent;
}

const labelStyles = cva(
  'bg-opacity-16 h-6 w-7 mr-2 subtitle2 leading-none rounded-md cursor-default items-center whitespace-nowrap inline-flex justify-center',
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
