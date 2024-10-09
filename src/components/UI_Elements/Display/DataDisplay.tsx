'use client';

// this component displays information

// optional props
interface DisplayProps {
  title: string;
  text: string;
}

const DataDisplay = ({ title, text }: DisplayProps) => {
  return (
    <div className="mt-5 mb-1.5">
      <p className="subtitle1 text-grey-800 dark:text-white bg-transparent">
        {title}
      </p>
      <p className="block px-3 py-2 w-full body1 text-grey-800 dark:text-white bg-transparent">
        {text}
      </p>
    </div>
  );
};

export default DataDisplay;
