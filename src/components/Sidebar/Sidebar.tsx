'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { LeftArrow } from '@/assets/SVGs';
import ContentBlock from './UserContentBlock';
import TempLogo from '@/assets/Temp_Logo.png';
import Button from '@ui/buttons/Button';
import SidebarListItem from './SidebarListItem';
import { DashboardIcon, DispatchIcon, UserIcon } from '@/assets/icons';

const dashboardOptions = [
  { name: 'Group1', href: '/dashboard/group1' },
  { name: 'Group2', href: '/dashboard/group2' },
  { name: 'Group3', href: '/dashboard/group3' },
];

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();

  const trigger = useRef<HTMLButtonElement>(null);
  const sidebar = useRef<HTMLElement>(null);

  const storedSidebarExpanded = true;

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === true
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
      className={`absolute left-0 top-0 z-9999 flex h-screen w-70 flex-col  bg-white dark:bg-grey-900 duration-300 ease-linear lg:static lg:translate-x-0 border-r-2 border-grey-200 dark:border-grey-700 ${
        sidebarOpen
          ? 'translate-x-0 overflow-visible'
          : '-translate-x-full overflow-hidden'
      }`}
    >
      <header className="flex flex-col items-center justify-center gap-8 px-4 py-5.5 relative">
        <Image width={167.28} src={TempLogo} alt="A2ZTMS Logo" priority />

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden absolute -right-3 top-1/4 transform -translate-y-1/2 p-2 rounded-full border-2 border-grey-200 bg-white dark:bg-grey-900 dark:border-grey-700"
        >
          {LeftArrow}
        </button>

        <ContentBlock />
      </header>

      <section className="py-4 px-4 no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav>
          <div>
            <h3 className="mb-4 ml-4 font-bold text-text-xsm uppercase text-grey-600 dark:text-white">
              General
            </h3>

            <SidebarListItem
              icon={DashboardIcon}
              path={'/dashboard'}
              name={'Dashboard'}
              pathname={pathname}
              options={dashboardOptions}
            />
            <SidebarListItem
              icon={DispatchIcon}
              pathname={pathname}
              path={'/temp'}
              name={'Dispatch'}
            />
          </div>

          <div>
            <h3 className="my-4 ml-4 font-bold text-text-xsm uppercase text-grey-600 dark:text-white">
              Management
            </h3>

            <SidebarListItem
              pathname={pathname}
              icon={UserIcon}
              path={'/user/settings'}
              name={'User'}
            />
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
