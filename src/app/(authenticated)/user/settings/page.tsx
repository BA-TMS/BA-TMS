'use client';

import Account from '@/components/User/Account';

const Settings = () => {
  interface User {
    id: string;
    app_metadata: any;
    user_metadata: any;
    aud: string;
    created_at: string;
  }

  const user: User = {
    id: '123',
    app_metadata: {},
    user_metadata: {},
    aud: 'example',
    created_at: '2022-01-01',
  };

  return (
    <>
      <Account user={user} />
    </>
  );
};

export default Settings;
