'use client';

import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import CarrierDetails from '@/components/Forms/Carrier/CarrierDetails';

export default function AddCarrierDetails() {
  return (
    <FullPageFormContainer title="Add External Carrier">
      <CarrierDetails />
    </FullPageFormContainer>
  );
}
