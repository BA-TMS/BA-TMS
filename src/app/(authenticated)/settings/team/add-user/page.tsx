'use client';

import { useContext } from 'react';
import { UserContext } from '@/context/userContextProvider';
import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import AddUserForm from '@/components/Forms/Settings/AddUserForm';

// TODO: this page should only be accessible to admin

export default function AddUser() {
  const { user } = useContext(UserContext);

  const orgName = user?.user_metadata.org_name;

  return (
    <FullPageFormContainer title="Invite New User">
      <AddUserForm company={orgName} />
    </FullPageFormContainer>
  );
}
