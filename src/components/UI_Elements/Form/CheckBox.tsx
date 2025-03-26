import { useState } from 'react';

interface CheckBoxProps {
  onChange: () => void;
  label: string;
  id: string;
  disabled?: boolean;
  checked?: boolean;
}

const CheckBox = ({
  onChange,
  label,
  id,
  disabled,
  checked,
}: CheckBoxProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(
    checked ? checked : false
  );

  return (
    <div className="flex items-center gap-2 mb-1.5 ml-3 relative">
      <input
        className="appearance-none w-5 h-5 border border-grey-600 dark:border-grey-400 rounded-sm bg-white dark:bg-grey-900 shrink-0 checked:bg-primary dark:checked:bg-primary checked:border-0 peer
        focus:outline-none focus:ring-offset-0 focus:ring-2 focus:ring-primary
         disabled:bg-grey-500"
        type="checkbox"
        id={id}
        onChange={() => {
          onChange();
          setIsChecked(!isChecked);
        }}
        disabled={disabled}
        checked={isChecked}
      />
      <label
        htmlFor={id}
        className="font-public text-button-md text-grey-800 dark:text-white"
      >
        {label}
      </label>
      <svg
        className="w-4 h-4 absolute top-[.75] left-0 mt-0.5 ml-0.5 pointer-events-none peer-checked:block hidden"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
  );
};

export default CheckBox;
