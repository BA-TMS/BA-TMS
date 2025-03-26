'use client';

import { SvgIconComponent } from '@mui/icons-material';

// this component displays text with an icon

interface DisplayProps {
  title: string;
  Icon: SvgIconComponent; // accepts an MUI icon as a prop
}

const IconDisplay = ({ title, Icon }: DisplayProps) => {
  return (
    <div className="flex items-center ml-2 my-1.5 gap-2">
      <Icon />
      <p className="subtitle2 px-2 title-grey-800 dark:text-white bg-transparent">
        {title}
      </p>
    </div>
  );
};

export default IconDisplay;
