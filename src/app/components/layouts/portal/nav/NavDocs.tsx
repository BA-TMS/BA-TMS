"use client";

import { Stack, Button, Typography, Box } from '@mui/material';
import { useLocales } from '../../../locales/page';

import { useRecoilValue } from 'recoil';
import { userState } from '../../../store/user';

export default function NavDocs() {
  const user = useRecoilValue(userState);
  const { translate } = useLocales();

  const handleEmailButtonClick = () => {
    const emailAddress = 'support@a2zport.com';
    const emailSubject = `${translate('docs_email.subject')}`;
    const userFullName = user?.name
      ? `${translate('docs_email.user')} ${user.name},`
      : '';
    const userEmail = user?.email ? `${user.email}.` : '';
    const emailBody = `${translate(
      'docs_email.body'
    )} ${userFullName} ${translate('docs_email.email_body')}\n${
      user?.name
    }\n${userEmail}`;
    const mailtoLink = `mailto:${encodeURIComponent(
      emailAddress
    )}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(
      emailBody
    )}`;
    window.location.href = mailtoLink;
  };

  return (
    <Stack
      spacing={3}
      sx={{
        px: 0,
        pb: 6,
        mt: 0,
        width: 1,
        display: 'block',
        textAlign: 'center',
      }}
    >
      <Stack alignItems="center">
        <Box component="img" src="/assets/icons/support/chat.svg" />
      </Stack>
      {user && (
        <div>
          <Typography gutterBottom variant="subtitle1">
            {`${translate('docs.hi')}, ${user?.name}`}
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', whiteSpace: 'pre-line' }}
          >
            {`${translate('docs.description')}`}
          </Typography>
        </div>
      )}
      <Button variant="contained" onClick={handleEmailButtonClick}>
        {`${translate('docs.documentation')}`}
      </Button>
    </Stack>
  );
}
