/************************************************************************
 *   Purpose: Page components utilized from imports.                     *
 *   Notes: Protected page with protected components.                    *
 ************************************************************************/
import 'tailwindcss/tailwind.css';

import PortalLayout from '../../../components/portal/PortalLayout';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs/page';
import { PATH } from '../../../routes/paths';
import { Container } from '@mui/material';
// import { useSettingsContext } from '../../components/settings';
// import { useLocales } from '../../locales/page';
import { ReactNode } from 'react';
// import { TableSkeleton } from 'src/components/table';

// import EmptyTable from 'src/sections/empty/list/emptyTable';

const EmptyTablePage: any = ({}) => {
  // const { themeStretch } = useSettingsContext();
  // const { translate } = useLocales();

  return (
    // <Container maxWidth={themeStretch ? false : 'xl'}>
    <Container maxWidth="xl">
      <CustomBreadcrumbs
        heading={'empty_receiving'}
        links={[
          // { name: 'General', href: `${PATH.dashboard}` },
          { name: 'General', href: 'dashboard' },
          { name: 'empty_receiving' },
        ]}
      />
      {/* <EmptyTable /> */}
    </Container>
  );
};

// EmptyTablePage.getLayout = (page: ReactNode) => (
//   <PortalLayout pageTitle="Empty Receiving Schedules">{page}</PortalLayout>
// );

export default EmptyTablePage;
