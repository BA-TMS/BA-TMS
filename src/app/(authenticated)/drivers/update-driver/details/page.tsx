'use client';

import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import DriverForm from '@/components/Forms/Driver/DriverDetails';

// this is an intercepting route that builds a modal

export default function UpdateDriverDetails() {
  return (
    <FullPageFormContainer title={'Update Driver'}>
      <DriverForm />
    </FullPageFormContainer>
  );
}
