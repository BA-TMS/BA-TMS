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
              className={`group relative flex items-center gap-4 rounded-lg h-12 px-4 py-2 body2 text-grey-600 dark:text-grey-300 hover:bg-primary/10 dark:hover:bg-primary/20 dark:hover:text-primary hover:text-primary ${
                (open || active) && // add these styles if open or active
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
              {options && (
                <svg
                  className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                    open && 'rotate-90'
                  }`}
                  width="5"
                  height="10"
                  viewBox="0 0 5 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.666682 9.66667C0.510914 9.66698 0.359957 9.61273 0.240016 9.51334C0.103678 9.40031 0.0179172 9.23767 0.00165783 9.06132C-0.0146016 8.88497 0.0399765 8.70939 0.153349 8.57334L3.14002 5L0.260016 1.42C0.148169 1.28227 0.0958365 1.10564 0.114605 0.929216C0.133374 0.752788 0.221696 0.591119 0.360016 0.480004C0.49946 0.357311 0.683767 0.298354 0.868532 0.317336C1.0533 0.336319 1.22177 0.431521 1.33335 0.580004L4.55335 4.58C4.75556 4.82601 4.75556 5.18067 4.55335 5.42667L1.22002 9.42667C1.08437 9.5903 0.878839 9.67945 0.666682 9.66667Z"
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
                      className="px-6 py-2 rounded-lg hover:text-primary"
                    >
                      <Link
                        href={item.href}
                        className="items-center py-2 duration-300 ease-in-out body2 text-grey-600 dark:text-grey-300 hover:font-semibold hover:text-grey-800 dark:hover:text-grey-200"
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
