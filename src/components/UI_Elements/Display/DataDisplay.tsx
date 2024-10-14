/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

// this component displays information

interface DisplayProps {
  title: string;
  text: any;
}

const DataDisplay = ({ title, text }: DisplayProps) => {
  return (
    <div className="relative mb-1.5">
      <p className="subtitle2 px-2 text-grey-800 dark:text-white bg-transparent">
        {title}
      </p>
      <p className="block indent-5 px-3 py-3.5 w-full h-12 body2 text-grey-800 bg-grey-300 rounded-[7px]">
        {text}
      </p>
    </div>
  );
};

export default DataDisplay;
