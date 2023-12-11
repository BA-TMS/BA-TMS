import { useState } from 'react';
import Header from './header';
import { useSettingsContext } from '../../settings';
import { Box } from '@mui/material';
import NavVertical from './nav/NavVertical';
import NavMini from './nav/NavMini';
import Main from './Main';
import useResponsive from '../../../hooks/utils/useResponsive';
import Head from 'next/head';
// import MessagePopover from './header/MessagePopover';

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
    <>
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
    </>
  );
}
