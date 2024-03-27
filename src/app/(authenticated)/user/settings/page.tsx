'use client';

import Account from '@/components/User/Account';

const Settings = () => {
  interface User {
    id: string;
    app_metadata: any;
    user_metadata: any;
    aud: string;
    created_at: string;
    profile_url: string;
  }

  const user: User = {
    id: '123',
    app_metadata: {},
    user_metadata: {},
    aud: 'example',
    created_at: '2022-01-01',
    profile_url:
      'https://plus.unsplash.com/premium_photo-1711305772086-d45053d4bb69?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  };

  return (
    <>
      <Account user={user} />
    </>
  );
};

export default Settings;
