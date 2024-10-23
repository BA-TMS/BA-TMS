'use client';

import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import CarrierDetails from '@/components/Forms/Carrier/CarrierDetails';

export default function UpdateCarrierDetails() {
  return (
    <FullPageFormContainer title="Update External Carrier">
      <CarrierDetails />
    </FullPageFormContainer>
  );
}
