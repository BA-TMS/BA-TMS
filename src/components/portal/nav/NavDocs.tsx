'use client';

// State management of users will display the user on the support of navbar

import { Stack, Button, Typography, Box } from '@mui/material';

// import { useRecoilValue } from 'recoil';
// import { userState } from '../../../store/user';

import { useTranslation } from 'react-i18next';

export default function NavDocs() {
  // const user = useRecoilValue(userState);
  const { i18n, t: translate } = useTranslation();

  console.log(translate('docs.hi'));

  const handleEmailButtonClick = () => {
    const emailAddress = 'support@a2zport.com';
    const emailSubject = `${translate('docs_email.subject')}`;
    // const userFullName = user?.name
    //   ? `${translate('docs_email.user')} ${user.name},`
    //   : '';
    // const userEmail = user?.email ? `${user.email}.` : '';
    const emailBody = `${translate('docs_email.body')} ${translate(
      'docs_email.email_body'
    )}`;
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
        <Box component="img" src="../assets/icons/support/chat.svg" />
      </Stack>
      <div>
        <Typography gutterBottom variant="subtitle1">
          {`${translate('docs.hi')}`}
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: 'text.secondary', whiteSpace: 'pre-line' }}
        >
          {`${translate('docs.description')}`}
        </Typography>
      </div>
      <Button variant="contained" onClick={handleEmailButtonClick}>
        {`${translate('docs.documentation')}`}
      </Button>
    </Stack>
  );
}
