// NavItem.tsx sections for the navpanel
// PortalLayout contains the hamburger open and close.
// Header.tsx contains the IconButton

import PortalLayout from '../../components/layouts/portal/PortalLayout';
import { Button, Container, Grid, TextField } from '@mui/material';
import { useSettingsContext } from '../components/settings';
import { SeoIllustration } from '../../assets/illustrations';
// import { AppWelcome } from '../../sections/dashboard/general/app';
// import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';

// import { useLocales } from '../../locales';
// import AppFeatured from '../../sections/dashboard/general/app/AppFeatured';
import { slideData } from '../../_mock/arrays';
import {
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from 'recoil';
import { userState } from '../../store/user';
import localStorageAvailable from 'src/utils/localStorageAvailable';
import { getCookie, setCookie } from 'src/components/settings/SettingsContext';
// import DashboardContainer from '../../sections/dashboard/general/sections/container/DashboardContainer';
// import DashboardVessel from 'src/sections/dashboard/general/sections/vessel/DashboardVessel';
// import DashboardSchedule from 'src/sections/dashboard/general/sections/schedule';
// import DashboardTotalContainer from 'src/sections/dashboard/general/sections/container/DashboardTotalContainer';
// import DashboardDetention from 'src/sections/dashboard/general/sections/container/DashboardDetention';
import { getCredentialsSelector } from 'src/store/credentials';

const Dashboard: any = () => {

  return (
    <Container >
      <Grid container spacing={3}>

        {/* <Grid item xs={12}>
          <AppFeatured list={slideData} />
        </Grid>

        <Grid item xs={12} md={4}>
          <DashboardTotalContainer />
        </Grid>
        <Grid item xs={12} md={4}>
          <DashboardSchedule />
        </Grid>

        <Grid item xs={12} md={4}>
          <DashboardDetention />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <DashboardContainer />
        </Grid>

        <Grid item xs={12} md={6} lg={8}>
          <DashboardVessel />
        </Grid> */}
      </Grid>
    </Container>
  );
};

Dashboard.getLayout = (page: ReactNode) => (
  <PortalLayout pageTitle="Dashboard">{page}</PortalLayout>
);

export default Dashboard;
