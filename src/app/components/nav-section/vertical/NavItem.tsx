"use client";

// next
import NextLink from 'next/link';
// @mui
import { Box, Link, ListItemText, Tooltip } from '@mui/material';
// auth
// import RoleBasedGuard from '../../../sections/auth/RoleBasedGuard';
//
import Iconify from '../../iconify/page';
//
import { NavItemProps } from '../types';
import { StyledDotIcon, StyledIcon, StyledItem } from './styles';

// ----------------------------------------------------------------------

export default function NavItem({
  item,
  depth,
  open,
  active,
  isExternalLink,
  ...other
}: NavItemProps) {
  const { title, path, icon, info, children, disabled, caption, roles } = item;

  const subItem = depth !== 1;

  const renderContent = (
    <StyledItem
      depth={depth}
      active={active}
      disabled={disabled}
      caption={!!caption}
      {...other}
    >
      {icon && <StyledIcon>{icon}</StyledIcon>}

      {subItem && (
        <StyledIcon>
          <StyledDotIcon active={active && subItem} />
        </StyledIcon>
      )}

      <ListItemText
        primary={`${title}`}
        data-test={`nav-item-${title.match(/[a-zA-Z]/g)?.join('')
          .toLowerCase()}`}
        secondary={
          caption && (
            <Tooltip title={`${caption}`} placement="top-start">
              <span>{`${caption}`}</span>
            </Tooltip>
          )
        }
        primaryTypographyProps={{
          noWrap: true,
          component: 'span',
          variant: active ? 'subtitle2' : 'body2',
        }}
        secondaryTypographyProps={{
          noWrap: true,
          variant: 'caption',
        }}
      />

      {info && (
        <Box component="span" sx={{ lineHeight: 0 }}>
          {info}
        </Box>
      )}

      {!!children && (
        <Iconify
          width={16}
          icon={
            open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'
          }
          sx={{ ml: 1, flexShrink: 0 }}
        />
      )}
    </StyledItem>
  );

  const renderItem = () => {
    // ExternalLink
    if (isExternalLink)
      return (
        <Link href={path} target="_blank" rel="noopener" underline="none">
          {renderContent}
        </Link>
      );

    // Has child
    if (children) {
      return renderContent;
    }

    // Default
    return (
      <Link component={NextLink} href={path} underline="none">
        {renderContent}
      </Link>
    );
  };

  return <RoleBasedGuard roles={roles}> {renderItem()} </RoleBasedGuard>;
}
