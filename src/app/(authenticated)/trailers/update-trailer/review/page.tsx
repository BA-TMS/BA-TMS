'use client';

import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import TruckReview from '@/components/Forms/Truck/TruckReview';

export default function UpdateTruckReview() {
  return (
    <FullPageFormContainer title={'Update Truck'}>
      <TruckReview />
    </FullPageFormContainer>
  );
}
