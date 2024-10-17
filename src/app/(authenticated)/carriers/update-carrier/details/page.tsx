'use client';

import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import CarrierForm from '@/components/Forms/CarrierForm';

export default function UpdateLoadDetails() {
  return (
    <FullPageFormContainer title="Update External Carrier">
      <CarrierForm />
    </FullPageFormContainer>
  );
}
