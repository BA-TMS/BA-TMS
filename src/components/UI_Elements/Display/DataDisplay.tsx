/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

// this component displays information

// optional props
interface DisplayProps {
  title: string;
  text: any;
}

const DataDisplay = ({ title, text }: DisplayProps) => {
  return (
    <div className="mt-2.5 mb-1 px-1.5 pb-1.5 flex justify-between items-center w-full border-b border-grey-300 dark:border-grey-700">
      <p className="subtitle1 text-grey-800 dark:text-white bg-transparent">
        {title}
      </p>
      <p className="py-1 body1 text-grey-800 dark:text-white bg-transparent">
        {text}
      </p>
    </div>
  );
};

export default DataDisplay;
