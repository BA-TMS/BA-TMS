'use client';

import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import TruckIFTAForm from '@/components/Forms/Truck/TruckIFTA';

export default function AddTruckIFTA() {
  return (
    <FullPageFormContainer title="Add Truck">
      <TruckIFTAForm />
    </FullPageFormContainer>
  );
}
