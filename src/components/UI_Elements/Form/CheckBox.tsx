interface CheckBoxProps {
  isChecked?: boolean;
  onChange: () => void;
  label: string;
  id: string;
}

const CheckBox = ({ isChecked, onChange, label, id }: CheckBoxProps) => {
  return (
    <div className="flex items-center gap-2 px-3 mb-1.5">
      <input
        className="appearance-none w-5 h-5 border border-grey-600 dark:border-grey-400 rounded-sm bg-white dark:bg-grey-900 shrink-0 checked:bg-primary dark:checked:bg-primary checked:border-0"
        type="checkbox"
        id={id}
        checked={isChecked}
        onChange={onChange}
      />
      <label
        htmlFor={id}
        className="font-public text-button-md text-grey-800 dark:text-white"
      >
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
