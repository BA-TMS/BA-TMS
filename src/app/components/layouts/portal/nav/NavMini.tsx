"use client";

// @mui
import { Stack, Box } from '@mui/material';
// config
import { NAV } from '../../../../config-global';
// utils
import { hideScrollbarX } from '../../../../utils/cssStyles';
// components
// import Logo from '../../../components/logo';
import A2ZMini from '../../../../public/a2zIcon.svg';
import { NavSectionMini } from '../../../nav-section';
//
import NavToggleButton from './NavToggleButton';
import useGetNavConfig from './config-navigation';

// ----------------------------------------------------------------------

export default function NavMini() {
  const navConfig: any = useGetNavConfig();

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_DASHBOARD_MINI },
      }}
    >
      <NavToggleButton
        sx={{
          top: 22,
          left: NAV.W_DASHBOARD_MINI - 12,
        }}
      />

      <Stack
        sx={{
          pb: 2,
          height: 1,
          position: 'fixed',
          width: NAV.W_DASHBOARD_MINI,
          borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          ...hideScrollbarX,
        }}
      >
        {/* <Logo source={A2ZMini} width={30} height={30} sx={{ mx: 3, my: 2 }} /> */}

        <NavSectionMini data={navConfig} />
      </Stack>
    </Box>
  );
}
