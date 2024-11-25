'use client';

import { useContext } from 'react';
import { UserContext } from '@/Context/userContextProvider';
import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import AddUserForm from '@/components/Forms/Settings/AddUserForm';

// TODO: this page should only be accessible to admin

export default function AddUser() {
  const { user } = useContext(UserContext);
  console.log('USER', user);

  const orgName = user?.user_metadata.org_name;
  console.log('ORG NAME?', orgName);

  return (
    <FullPageFormContainer title="Invite New User">
      <AddUserForm company={orgName} />
    </FullPageFormContainer>
  );
}
