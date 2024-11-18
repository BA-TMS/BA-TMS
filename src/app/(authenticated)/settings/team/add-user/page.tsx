'use client';

import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import AddUserForm from '@/components/Forms/Settings/AddUserForm';

// TODO: this page should only be accessible to admin

export default function AddUser() {
  return (
    <FullPageFormContainer title="Invite New User">
      <AddUserForm />
    </FullPageFormContainer>
  );
}
