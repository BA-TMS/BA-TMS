'use client';

import Link from 'next/link';
import PageTitle from '@/components/Page/PageTitle';

// we are gonna need to do parallel routes

const secondaryNavigation = [
  { name: 'Profile', href: '/settings/profile', current: true },
  { name: 'Team', href: '/settings/team', current: false },
  { name: 'Billing', href: '#', current: false },
  { name: 'Social Links', href: '#', current: false },
  {
    name: 'Change Password',
    href: '/settings/password',
    current: false,
  },
];

export default function SettingsLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      <PageTitle pageTitle="Settings" />
      <nav className="flex overflow-x-auto py-4">
        <ul
          role="list"
          className="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-400 sm:px-6 lg:px-8"
        >
          {secondaryNavigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={item.current ? 'text-indigo-400' : ''}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {children}
      {modal}
    </>
  );
}
