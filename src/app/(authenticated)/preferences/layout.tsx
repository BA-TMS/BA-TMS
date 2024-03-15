'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const PossiblyActiveLink = ({
  className,
  href,
  activeClassName,
  children,
}: {
  className: string;
  href: string;
  activeClassName: string;
  children: React.ReactNode;
}) => {
  const isActive = href === usePathname();

  return (
    <Link
      className={`${className}${isActive ? ` ${activeClassName}` : ''}`}
      href={href}
    >
      {children}
    </Link>
  );
};

const PrefsLink = ({ children }: { children: string }) => {
  return (
    <PossiblyActiveLink
      className="text-bodydark2 duration-300 ease-in-out dark:hover:text-white"
      activeClassName="dark:text-white"
      href={`/preferences/${children.toLowerCase()}`}
    >
      {children}
    </PossiblyActiveLink>
  );
};

export default ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <nav className="flex gap-4">
        <PrefsLink>Account</PrefsLink>
        <PrefsLink>Address</PrefsLink>
        <PrefsLink>Settings</PrefsLink>
        <PrefsLink>Functionality</PrefsLink>
        <PrefsLink>Notes</PrefsLink>
        <PrefsLink>IFTA</PrefsLink>
        <PrefsLink>Restrictions</PrefsLink>
      </nav>
      <div>{children}</div>
    </>
  );
};
