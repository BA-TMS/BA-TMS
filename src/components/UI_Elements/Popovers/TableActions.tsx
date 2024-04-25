import { useState, useRef, useEffect, useContext } from 'react';
import Link from 'next/link';

import { EditIcon, ElipsisVertical, DeleteIcon } from '@/assets/SVGs';
import { ModalContext } from '@/Context/modalContext';

type TableActionsProps = {
  id: string;
  deleter: any;
  data: any;
};

// pass this component an id from the table it is used in

const TableActionsPopover: React.FC<TableActionsProps> = ({ id, deleter, data }) => {
  const [popoversOpen, setPopoversOpen] = useState(false);

  const trigger = useRef<any>(null);
  const popovers = useRef<any>(null);

  const { toggleOpen, setData2 } = useContext(ModalContext);

  const handleClick = () => {
    toggleOpen();
  };

  // console.log("TableActionsPopover: React.FC<TableActionsProps>'s data:", data);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!popovers.current) return;
      if (
        !popoversOpen ||
        popovers.current.contains(target) ||
        trigger.current.contains(target)
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
    <div className="w-full pl-5 sm:w-1/2 xl:w-1/4">
      <div className="mt-1 text-center">
        <div className="relative inline-block">
          <button
            ref={trigger}
            onClick={() => setPopoversOpen(!popoversOpen)}
            className="hover:text-primary"
          >
            {ElipsisVertical}
          </button>
          <div
            ref={popovers}
            onFocus={() => setPopoversOpen(true)}
            onBlur={() => setPopoversOpen(false)}
            className={`absolute top-0 right-full z-20 mr-3 w-max max-w-[311px] rounded bg-white drop-shadow-5 dark:bg-meta-4 ${
              popoversOpen === true ? 'block' : 'hidden'
            }`}
          >
            <span className="absolute -right-1.5 top-2 -z-10 h-2 w-2 rotate-45 rounded-sm bg-white dark:bg-meta-4"></span>

            <div className="text-center">
              <div className="flex flex-wrap">
                <Link
                  href="#" // update
                  className="inline-flex items-center justify-center gap-2.5 py-4 px-10 text-center font-medium dark:text-white hover:text-primary dark:hover:text-primary lg:px-8 xl:px-10"
                  onClick={() => {
                    setData2(data, () => {});
                    handleClick();
                  }}
                >
                  <span>{EditIcon}</span>
                  Edit
                </Link>
              </div>
              <div className="flex flex-wrap">
                <Link
                  href="#" // delete
                  className="inline-flex items-center justify-center gap-2.5 py-4 px-10 text-center font-medium dark:text-white hover:text-primary dark:hover:text-primary lg:px-8 xl:px-10"
                  onClick={() => deleter(id)}
                >
                  <span>{DeleteIcon}</span>
                  Delete
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableActionsPopover;
