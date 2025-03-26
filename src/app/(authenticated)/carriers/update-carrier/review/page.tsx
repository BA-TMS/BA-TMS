'use client';

import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import CarrierForm from '@/components/Forms/Carrier/CarrierForm';

export default function UpdateCarrierReview() {
  return (
    <FullPageFormContainer title="Add External Carrier">
      <CarrierForm />
    </FullPageFormContainer>
  );
}
