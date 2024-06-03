import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

import { EditIcon, ElipsisVertical, DeleteIcon } from '@/assets/SVGs';

type TableActionsProps = {
  id: string;
};

// pass this component an id from the table it is used in

const TableActionsPopover: React.FC<TableActionsProps> = ({ id }) => {
  const [popoversOpen, setPopoversOpen] = useState(false);

  const trigger = useRef<HTMLButtonElement | null>(null);
  const popovers = useRef<HTMLDivElement | null>(null);

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
    <div>
      <div className="mt-1 text-center text-grey-600 dark:text-grey-300">
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
              <Link
                href="#" // update
                className="flex w-full gap-2 border-b border-grey-200 dark:border-grey-700 py-3 hover:text-primary"
              >
                <span>{EditIcon}</span>
                Edit
              </Link>
            </div>
            <div className="flex flex-wrap">
              <Link
                href="#" // delete
                className="flex w-full gap-2  py-3 hover:text-primary"
              >
                <span>{DeleteIcon}</span>
                Delete
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableActionsPopover;
