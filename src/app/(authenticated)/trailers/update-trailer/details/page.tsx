'use client';

import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import TruckDetails from '@/components/Forms/Truck/TruckDetails';

export default function UpdateTruckDetails() {
  return (
    <FullPageFormContainer title="Update Truck">
      <TruckDetails />
    </FullPageFormContainer>
  );
}
