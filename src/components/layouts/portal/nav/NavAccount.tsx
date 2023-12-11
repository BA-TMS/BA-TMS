// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Typography } from '@mui/material';
// auth
// components
import { CustomAvatar } from '../../../components/custom-avatar';
import { useRecoilValue } from 'recoil';
import { userState } from '../../../store/user';

const StyledRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

export default function NavAccount() {
  const user = useRecoilValue(userState);

  return (
    <Link underline="none" color="inherit">
      <StyledRoot>
        <CustomAvatar
          src={user?.profileUrl || ''}
          alt={user?.name || ''}
          name={user?.name || ''}
        />

        <Box sx={{ ml: 2, minWidth: 0 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.name}
          </Typography>

          <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
            {user?.plan?.description || ''}
          </Typography>
        </Box>
      </StyledRoot>
    </Link>
  );
}
