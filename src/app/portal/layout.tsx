// Header contains the mini window navpanel.
// Navmini is for fullscreen shrinking.
// useResponsive is for breakpoints.
// MessagePopover...idk.

'use client';

import { useState } from 'react';
// import Header from './header/page';
import Header from '../../components/portal/header/Header';
// // import { useSettingsContext } from '../settings/page';
import { useSettingsContext } from '@/components/settings/SettingsContext';
import { Box } from '@mui/material';
// import NavVertical from './nav/NavVertical';
import NavVertical from '../../components/portal/nav/NavVertical';
// import NavMini from './nav/NavMini';
import NavMini from '../../components/portal/nav/NavMini';
// import Main from './Main';
import Main from '../../components/portal/Main';
import useResponsive from '../../hooks/utils/useResponsive';
import Head from 'next/head';
// import MessagePopover from './header/MessagePopover';

// wrapping settings provider idk if we needed it
import { SettingsProvider } from '@/components/settings/SettingsContext';
// wrapping new language context
import { LocalesProvider } from '@/components/locales/LocalesContext';

type Props = {
  children?: React.ReactNode;
  pageTitle?: string;
};
export default function PortalLayout({ children, pageTitle }: Props) {
  const { themeLayout } = useSettingsContext();
  const [open, setOpen] = useState(false);
  const isDesktop = useResponsive('up', 'lg');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const isNavMini = themeLayout === 'mini';

  return (
    <SettingsProvider>
      <LocalesProvider>
        <Head>
          <title>{pageTitle}</title>
        </Head>
        <Header onOpenNav={handleOpen} />

        <Box
          sx={{
            display: { lg: 'flex' },
            minHeight: { lg: 1 },
          }}
        >
          {isNavMini && isDesktop ? (
            <NavMini />
          ) : (
            <NavVertical openNav={open} onCloseNav={handleClose} />
          )}

          <Main>
            {/* <MessagePopover /> */}
            {children}
          </Main>
        </Box>
      </LocalesProvider>
    </SettingsProvider>
  );
}
