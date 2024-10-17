'use client';

import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import CarrierForm from '@/components/Forms/CarrierForm';

export default function AddCarrierDetails() {
  return (
    <FullPageFormContainer title="Add External Carrier">
      <CarrierForm />
    </FullPageFormContainer>
  );
}
