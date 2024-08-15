import { useState, useRef, useEffect } from 'react';
import Button from '@ui/buttons/Button';
import { EditIcon, ElipsisVertical, DeleteIcon } from '@/assets/SVGs';

type TableActionsProps = {
  id: string;
  update: (param: string) => void;
  deleter?: (id: string) => void; // optional delete function
};

// pass this component an id from the table it is used in
// id is used to fetch data + populate corresponding form with current information
// pass this component a delete action that makes use of the id

const TableActionsPopover: React.FC<TableActionsProps> = ({
  id,
  update,
  deleter,
}) => {
  const [popoversOpen, setPopoversOpen] = useState(false);

  const trigger = useRef<HTMLButtonElement | null>(null);
  const popovers = useRef<HTMLDivElement | null>(null);

  function handleDelete() {
    if (window.confirm('Would you like to delete this load?')) {
      deleter(id); // call function passed to component
      setPopoversOpen(!popoversOpen);
    }
  }

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!popovers.current || !trigger.current) return;
      if (
        !popoversOpen ||
        popovers.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return;
      setPopoversOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [popoversOpen, trigger, popovers]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!popoversOpen || keyCode !== 27) return;
      setPopoversOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [popoversOpen, popovers]);

  return (
    <div className="relative inline-block">
      <button
        ref={trigger}
        onClick={() => setPopoversOpen(!popoversOpen)}
        className="hover:text-primary"
      >
        {ElipsisVertical}
      </button>
      {/* Popover Start */}
      <div
        ref={popovers}
        onFocus={() => setPopoversOpen(true)}
        onBlur={() => setPopoversOpen(false)}
        className={`absolute top-0 right-full z-20 w-40 px-4 rounded-lg border body2 text-grey-600 dark:text-grey-300 bg-white dark:bg-grey-900 border-grey-300 dark:border-grey-700 ${
          popoversOpen === true ? 'block' : 'hidden'
        }`}
      >
        <span className="absolute -right-1.5 top-2 -z-10 h-2 w-2 rotate-45 rounded-sm bg-white dark:bg-grey-900 border-r-2 border-t border-grey-300 dark:border-grey-700"></span>

        <div className="flex flex-wrap">
          <Button
            onClick={() => {
              update(id); // call whichever function is passed to component
            }}
            className="flex w-full gap-2 border-b border-grey-200 dark:border-grey-700 py-3 hover:text-primary"
          >
            <span>{EditIcon}</span>
            Edit
          </Button>
        </div>
        {deleter && (
          <div className="flex flex-wrap">
            <Button
              onClick={handleDelete}
              className="flex w-full gap-2 border-b border-grey-200 dark:border-grey-700 py-3 hover:text-primary"
            >
              <span>{DeleteIcon}</span>
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableActionsPopover;
