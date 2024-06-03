import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { NotificationIcon } from '@/assets/icons';

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true); // if there is a notification

  const trigger = useRef<HTMLAnchorElement>(null);
  const dropdown = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current || !trigger.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div className="relative w-10 ">
      <Link
        ref={trigger}
        onClick={() => {
          setNotifying(false);
          setDropdownOpen(!dropdownOpen);
        }}
        href="#"
        className="relative flex h-8.5 w-8.5 items-center justify-center"
      >
        {NotificationIcon}
        {/* will need to add functionality here for the notification number */}
        {notifying && (
          <span className="absolute -top-1 -right-1 z-1 h-5 w-5 rounded-full bg-error flex items-center justify-center">
            <span className="text-white caption">{8}</span>
            {/* <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-error opacity-75"></span> */}
          </span>
        )}
      </Link>

      {/* Dropdown Start */}
      {/* probably make a component for notification items */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-90 flex-col rounded-lg border text-grey-600 dark:text-white bg-white dark:bg-grey-900 border-grey-200 dark:border-grey-700 ${
          dropdownOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="px-4 py-3">
          <h5 className="body1 text-grey-600 dark:text-white">Notifications</h5>
        </div>

        <ul className="flex h-auto flex-col overflow-y-auto">
          <li>
            <Link
              className="flex flex-col gap-2 border-t border-grey-200 px-4 py-3 hover:bg-grey-200 dark:border-grey-700 dark:hover:bg-grey-700"
              href="#"
            >
              <p className="body2 text-grey-600 dark:text-white">
                Sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim.
              </p>

              <p className="caption text-grey-600 dark:text-white">
                12 May, 2025
              </p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DropdownNotification;
