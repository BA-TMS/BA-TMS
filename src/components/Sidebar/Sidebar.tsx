'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import SidebarLinkGroup from './SidebarLinkGroup';
import {
  LeftArrow,
  SidebarUserIcon,
  Squares2x2,
  PagesIcon,
  SettingsIcon,
} from '@/assets/SVGs';
import ContentBlock from './UserContentBlock';
import TempLogo from '@/assets/Temp_Logo.png';
import Button from '@ui/buttons/Button';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();

  const trigger = useRef<HTMLButtonElement>(null);
  const sidebar = useRef<HTMLElement>(null);

  const storedSidebarExpanded = 'true';

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-70 flex-col overflow-y-hidden bg-white dark:bg-grey-900 duration-300 ease-linear lg:static lg:translate-x-0 border-r-2 border-grey-200 dark:border-grey-700 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <header className="flex flex-col items-center justify-center gap-8 px-4 py-5.5">
        <Image width={167.28} src={TempLogo} alt="A2ZTMS Logo" priority />

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          {LeftArrow}
        </button>

        <ContentBlock />
      </header>

      <section className="py-4 px-4 no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav>
          {/* <!-- Menu Group General --> */}
          <div>
            <h3 className="mb-4 ml-4 font-bold text-text-xsm uppercase text-grey-600 dark:text-white">
              General
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              <SidebarLinkGroup
                activeCondition={
                  pathname === '/' || pathname.includes('dashboard')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-lg px-4 py-2 body2 text-grey-600 dark:text-grey-300 ${
                          (pathname === '/' ||
                            pathname.includes('dashboard')) &&
                          'hover:bg-primary/10 dark:hover:bg-primary/20 dark:hover:text-primary hover:text-primary duration-300 ease-in-out'
                        } ${
                          open &&
                          'bg-primary/10 dark:bg-primary/20 dark:text-primary text-primary'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        {Squares2x2}
                        Dashboard
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
                      </Link>
                      {/* <!-- Dropdown For General --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="my-2 list-disc list-inside">
                          <li className="px-6 py-2 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 dark:hover:text-primary hover:text-primary">
                            <Link
                              href="/dashboard/group1"
                              className="items-center py-2 duration-300 ease-in-out body2 text-grey-600 dark:text-grey-300"
                            >
                              Group 1
                            </Link>
                          </li>
                          <li className="px-6 py-2 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 dark:hover:text-primary hover:text-primary">
                            <Link
                              href="/dashboard/group2"
                              className="items-center py-2 duration-300 ease-in-out body2 text-grey-600 dark:text-grey-300"
                            >
                              Group 2
                            </Link>
                          </li>
                          <li className="px-6 py-2 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 dark:hover:text-primary hover:text-primary">
                            <Link
                              href="/dashboard/group3"
                              className="items-center py-2 duration-300 ease-in-out body2 text-grey-600 dark:text-grey-300"
                            >
                              Group 3
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              {/* <!-- Menu Group Temp Pages --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === '/temp' || pathname.includes('temp')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-lg px-4 py-2 body2 text-grey-600 dark:text-grey-300 ${
                          (pathname === '/' ||
                            pathname.includes('dashboard')) &&
                          'hover:bg-primary/10 dark:hover:bg-primary/20 dark:hover:text-primary hover:text-primary duration-300 ease-in-out'
                        } ${
                          open &&
                          'bg-primary/10 dark:bg-primary/20 dark:text-primary text-primary'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        {PagesIcon}
                        Temp
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
                      </Link>
                      {/* <!-- Dropdown For Temp Pages Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="my-2 list-disc list-inside">
                          <li className="px-6 py-2 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 dark:hover:text-primary hover:text-primary">
                            <Link
                              href="/carrier"
                              className="items-center py-2 duration-300 ease-in-out body2 text-grey-600 dark:text-grey-300"
                            >
                              Carrier
                            </Link>
                          </li>

                          <li className="px-6 py-2 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 dark:hover:text-primary hover:text-primary">
                            <Link
                              href="/consignees"
                              className="items-center py-2 duration-300 ease-in-out body2 text-grey-600 dark:text-grey-300"
                            >
                              Consignees
                            </Link>
                          </li>
                          <li className="px-6 py-2 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 dark:hover:text-primary hover:text-primary">
                            <Link
                              href="/users"
                              className="items-center py-2 duration-300 ease-in-out body2 text-grey-600 dark:text-grey-300"
                            >
                              Users
                            </Link>
                          </li>
                          <li className="px-6 py-2 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 dark:hover:text-primary hover:text-primary">
                            <Link
                              href="/other-numbers"
                              className="items-center py-2 duration-300 ease-in-out body2 text-grey-600 dark:text-grey-300"
                            >
                              Other Numbers
                            </Link>
                          </li>
                          <li className="px-6 py-2 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 dark:hover:text-primary hover:text-primary">
                            <Link
                              href="/third-party"
                              className="items-center py-2 duration-300 ease-in-out body2 text-grey-600 dark:text-grey-300"
                            >
                              Third Parties
                            </Link>
                          </li>
                          <li className="px-6 py-2 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 dark:hover:text-primary hover:text-primary">
                            <Link
                              href="/drayage"
                              className="items-center py-2 duration-300 ease-in-out body2 text-grey-600 dark:text-grey-300"
                            >
                              Drayage
                            </Link>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Temp Pages --> */}
            </ul>
          </div>

          {/* <!-- Management Group --> */}
          <div>
            <h3 className="mb-4 ml-4 font-bold text-text-xsm uppercase text-grey-600 dark:text-white">
              Management
            </h3>

            <ul className="mt-4 mb-5.5 flex flex-col gap-1.5">
              <Link
                href="/preferences"
                className="group relative flex items-center gap-2.5 rounded-lg px-4 py-2 body2 text-grey-600 dark:text-grey-300 hover:bg-primary/10 dark:hover:bg-primary/20 dark:hover:text-primary hover:text-primary duration-300 ease-in-out"
              >
                {SettingsIcon}
                Preferences
              </Link>
              <SidebarLinkGroup
                activeCondition={
                  pathname === '/pages' || pathname.includes('pages')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-lg px-4 py-2 body2 text-grey-600 dark:text-grey-300 ${
                          (pathname === '/' ||
                            pathname.includes('dashboard')) &&
                          'hover:bg-primary/10 dark:hover:bg-primary/20 dark:hover:text-primary hover:text-primary duration-300 ease-in-out'
                        } ${
                          open &&
                          'bg-primary/10 dark:bg-primary/20 dark:text-primary text-primary'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        {SidebarUserIcon}
                        User
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
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
                      </Link>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="my-2 list-disc list-inside">
                          <li className="px-6 py-2 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 dark:hover:text-primary hover:text-primary">
                            <Link
                              href="/user/settings"
                              className="items-center py-2 duration-300 ease-in-out body2 text-grey-600 dark:text-grey-300"
                            >
                              Settings
                            </Link>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
            </ul>
          </div>
        </nav>
      </section>
      {/* Support Contact Section */}
      {/* update with user info */}
      <section className="px-4 py-4 mt-auto flex flex-col items-center justify-center">
        <h4 className="mb-3 mt-3 subtitle1 text-grey-600 dark:text-grey-300">
          Hi, Jasper
        </h4>
        <p className="mb-3 text-center body2 text-grey-600 dark:text-grey-300">
          Need Help? <br /> Please contact us.
        </p>
        <Button>Support</Button>
      </section>
    </aside>
  );
};

export default Sidebar;
