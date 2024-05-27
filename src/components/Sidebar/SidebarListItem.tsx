'use client';

import React from 'react';
import Link from 'next/link';
import SidebarLinkGroup from './SidebarLinkGroup';

interface SidebarListProps {
  icon?: React.ReactNode; // svg icon
  path: string; // path to go to if this is clicked on
  name: string; // name to show up on the list item
  pathname: string; // pathname passed from parent component
  options?: { name: string; href: string }[]; // any options if this is a dropdown
}

const SidebarListItem = ({
  icon,
  path,
  name,
  pathname,
  options,
}: SidebarListProps) => {
  return (
    <SidebarLinkGroup>
      {(handleClick, open) => {
        const active = pathname?.includes(path as string);
        return (
          <React.Fragment>
            <Link
              href={options ? '#' : (path as string)}
              className={`group relative flex items-center gap-2.5 rounded-lg px-4 py-2 body2 text-grey-600 dark:text-grey-300 ${
                pathname?.includes(path as string) &&
                'hover:bg-primary/10 dark:hover:bg-primary/20 dark:hover:text-primary hover:text-primary duration-300 ease-in-out'
              } ${
                (open || active) &&
                'bg-primary/10 dark:bg-primary/20 dark:text-primary text-primary'
              }`}
              onClick={(e) => {
                if (options) {
                  e.preventDefault();
                  handleClick();
                }
              }}
            >
              {icon}
              {name}
              {options && ( // render the dropdown arrow if options were passed in
                <svg
                  className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                    open && 'rotate-180'
                  }`}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                    fill=""
                  />
                </svg>
              )}
            </Link>
            {/* <!-- Dropdown if options are passed in --> */}

            {options && (
              <div
                className={`translate transform overflow-hidden ${
                  !open && 'hidden'
                }`}
              >
                <ul className="my-2 list-disc list-inside">
                  {options.map((item, index) => (
                    <li
                      key={index}
                      className="px-6 py-2 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 dark:hover:text-primary hover:text-primary"
                    >
                      <Link
                        href={item.href}
                        className="items-center py-2 duration-300 ease-in-out body2 text-grey-600 dark:text-grey-300"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </React.Fragment>
        );
      }}
    </SidebarLinkGroup>
  );
};

export default SidebarListItem;
