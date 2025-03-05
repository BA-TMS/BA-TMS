'use client';

import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import TruckReview from '@/components/Forms/Truck/TruckReview';

export default function AddTruckReview() {
  return (
    <FullPageFormContainer title={'Add Truck'}>
      <TruckReview />
    </FullPageFormContainer>
  );
}
