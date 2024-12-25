'use client';

import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import DriverForm from '@/components/Forms/Driver/DriverForm';

export default function AddDriverDetails() {
  return (
    <FullPageFormContainer title="Add Driver">
      <DriverForm />
    </FullPageFormContainer>
  );
}
