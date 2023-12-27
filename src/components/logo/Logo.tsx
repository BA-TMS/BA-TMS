'use client';

import { forwardRef } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Link, BoxProps } from '@mui/material';
import Image from "next/image";
// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
  source?: any;
  width?: number;
  height?: number;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, source = '', width = 0, height = 0, sx, ...other }, ref) => {
    const theme = useTheme();

    const PRIMARY_LIGHT = theme.palette.primary.light;

    const PRIMARY_MAIN = theme.palette.primary.main;

    const PRIMARY_DARK = theme.palette.primary.dark;

    // OR using local (public folder)
    // -------------------------------------------------------
    // const logo = (
    //   <Box
    //     component="img"
    //     src="/logo/logo_single.svg" => your path
    //     sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
    //   />
    // );

    const logo = (
      <Box
        ref={ref}
        component="div"
        sx={{
          display: 'inline-flex',
            width,
            height,
          ...sx,
        }}
        {...other}
      >
          <Image
            width={width}
            height={height}
            src={source|| ''}
            alt="A2Z Port"
          />
      </Box>
    );

    if (disabledLink) {
      return logo;
    }

    return (
      <Link component={NextLink} href="/" sx={{ display: 'contents' }}>
        {logo}
      </Link>
    );
  }
);

export default Logo;
