'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import ContentBlock from './UserContentBlock';
import Button from '@/components/UI_Elements/buttons/Button';
import SidebarListItem from './SidebarListItem';
import {
  AccountingIcon,
  AddOnsIcon,
  AdminIcon,
  DashboardIcon,
  DispatchIcon,
  HelpIcon,
  IFTAIcon,
  LeftArrow,
  ReportsIcon,
  SalesManagerIcon,
  TerminalCredIcon,
  UserIcon,
} from '@/assets/icons/layout';
import { Logo } from '@/assets/logo';
import { useContext } from 'react';
import { UserContext } from '@/context/userContextProvider';

const userOptions = [
  { name: 'Plans & Pricing', href: '#' },
  { name: 'Settings', href: '/settings' },
];

const adminOptions = [
  { name: 'Consignees', href: '/consignees' },
  { name: 'Customers', href: '/customers' },
  { name: 'Customs Brokers', href: '/brokers' },
  { name: 'Drivers', href: '/drivers' },
  { name: 'External Carriers', href: '/carriers' },
  { name: 'Factoring Companies', href: '/factors' },
  { name: 'Other Numbers', href: '/other-numbers' },
  { name: 'Preferences', href: '#' },
  { name: 'Private Labelling', href: '#' },
  { name: 'Shippers', href: '/shippers' },
  { name: 'Third Party', href: '#' },
  { name: 'Trailers', href: '/trailers' },
  { name: 'Trucks', href: '/trucks' },
];

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const { user } = useContext(UserContext);

  const pathname = usePathname();

  const trigger = useRef<HTMLButtonElement>(null);
  const sidebar = useRef<HTMLElement>(null);

  const storedSidebarExpanded = true;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        {Logo}

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden absolute -right-3 top-1/4 transform -translate-y-1/2 p-2 rounded-full border-2 border-grey-200 bg-white dark:bg-grey-900 dark:border-grey-700"
        >
          {LeftArrow}
        </button>

        <ContentBlock
          firstName={user?.user_metadata.first_name}
          lastName={user?.user_metadata.last_name}
          role={user?.user_metadata.role}
        />
      </header>

      <section className="py-4 px-4 no-scrollbar flex flex-col gap-12 overflow-y-auto duration-300 ease-linear">
        <nav>
          <div>
            <h3 className="mb-1 ml-4 font-bold text-text-xsm uppercase text-grey-600 dark:text-white">
              General
            </h3>

            <SidebarListItem
              icon={DashboardIcon}
              path={'/dashboard'}
              name={'Dashboard'}
              pathname={pathname}
            />
            <SidebarListItem
              icon={DispatchIcon}
              pathname={pathname}
              path={'/dispatch'}
              name={'Dispatch'}
            />
            <SidebarListItem
              icon={AdminIcon}
              pathname={pathname}
              path={'/admin'}
              name={'Admin'}
              options={adminOptions}
            />
            <SidebarListItem
              icon={IFTAIcon}
              pathname={pathname}
              path={'/ifta'}
              name={'IFTA'}
            />
            <SidebarListItem
              icon={SalesManagerIcon}
              pathname={pathname}
              path={'/sales'}
              name={'Sales Manager'}
            />
            <SidebarListItem
              icon={AccountingIcon}
              pathname={pathname}
              path={'/accounting'}
              name={'Accounting'}
            />
            <SidebarListItem
              icon={ReportsIcon}
              pathname={pathname}
              path={'/reports'}
              name={'Reports'}
            />
            <SidebarListItem
              icon={AddOnsIcon}
              pathname={pathname}
              path={'/addons'}
              name={'Add-Ons'}
            />
            <SidebarListItem
              icon={HelpIcon}
              pathname={pathname}
              path={'/help'}
              name={'Help'}
            />
          </div>

          <div>
            <h3 className="mt-8 mb-1 ml-4 font-bold text-text-xsm uppercase text-grey-600 dark:text-white">
              Management
            </h3>

            <SidebarListItem
              icon={TerminalCredIcon}
              pathname={pathname}
              path={'/credentials'}
              name={'Terminal Credentials'}
            />
            <SidebarListItem
              pathname={pathname}
              icon={UserIcon}
              path={'/settings'}
              name={'User'}
              options={userOptions}
            />
          </div>
        </nav>
      </section>

      {/* Support Contact Section */}
      <section className="px-4 py-4 mt-auto flex flex-col items-center justify-center">
        <h4 className="mb-3 mt-3 subtitle1 text-grey-600 dark:text-grey-300">
          {`Hi, ${user?.user_metadata.first_name}`}
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
