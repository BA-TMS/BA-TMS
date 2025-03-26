'use client';

import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import DriverTwoForm from '@/components/Forms/Driver/DriverTwo';

// this is an intercepting route that builds a modal

export default function UpdateDriverTeam() {
  return (
    <FullPageFormContainer title={'Update Second Driver'}>
      <DriverTwoForm />
    </FullPageFormContainer>
  );
}
