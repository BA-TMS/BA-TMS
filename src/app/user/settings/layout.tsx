'use client';
import { Container, Tab, Tabs, Box, BoxProps } from '@mui/material';
import { useState } from 'react';
import SettingsPage from './general/page';
import Link from 'next/link';


// icons
import Iconify from '@/components/iconify/Iconify';
//


// ----------------------------------------------------------------------

/*type Labels = {
    general?: string;
    change_password?: string;
    team?: string;
}

const useGeneralLabels = () => {
    // Fix next hydration.
    const { translate } = useLocales();
}*/

export default function UserSettingsLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    // const [sidebarOpen, setSidebarOpen] = useState(false);
  
    // const [loading, setLoading] = useState<boolean>(true);
  
    // useEffect(() => {
    //   setTimeout(() => setLoading(false), 1000);
    // }, []);

    return (
      <Container disableGutters sx={{padding: 0, margin: 0}}>
        <Tabs>
          <Link href="/user/settings/general">
            <Tab sx={{'color': 'white', padding: 2, minHeight: "unset"}} label="general" iconPosition="start" icon={<Iconify icon="ic:round-account-box" />} />
          </Link>
          
          <Link href="/user/settings/change-password">
            <Tab sx={{'color': 'white', padding: 2, marginLeft: 5, minHeight: "unset"}} label="change-password" iconPosition="start" icon={<Iconify icon="ic:round-vpn-key" />} />
          </Link>
          
          <Link href="/user/settings/team">
            <Tab sx={{'color': 'white', padding: 2, marginLeft: 5, minHeight: "unset"}} label="team" iconPosition="start" icon={<Iconify icon="ic:round-vpn-key"/>} />
          </Link>
        </Tabs>
        {children}
      </Container>
    );
  }