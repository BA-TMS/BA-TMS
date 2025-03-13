'use client';

import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import TruckDetails from '@/components/Forms/Truck/TruckDetails';

export default function AddTruckDetails() {
  return (
    <FullPageFormContainer title="Add Truck">
      <TruckDetails />
    </FullPageFormContainer>
  );
}
