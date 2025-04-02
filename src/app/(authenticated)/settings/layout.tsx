'use client';

import PageTitle from '@/components/Page/PageTitle';
import { NavTabs } from '@/components/UI_Elements/Navigation/NavTabs';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ShareIcon from '@mui/icons-material/Share';
import KeyIcon from '@mui/icons-material/Key';

// we may need to do parallel routes to handle forms

const secondaryNavigation = [
  { name: 'Profile', href: '/settings/profile', icon: AccountCircleIcon },
  { name: 'Team', href: '/settings/team', icon: SupervisedUserCircleIcon },
  { name: 'Billing', href: '#', icon: AccountBalanceWalletIcon },
  { name: 'Social Links', href: '#', icon: ShareIcon },
  {
    name: 'Change Password',
    href: '/settings/password',
    icon: KeyIcon,
  },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageTitle pageTitle="Settings" />
      <NavTabs tabs={secondaryNavigation} />
      <div className="mt-5 w-full">{children}</div>
    </>
  );
}
