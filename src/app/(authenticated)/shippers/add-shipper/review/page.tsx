'use client';

import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import ShipperReviewForm from '@/components/Forms/Shipper/ShipperReview';

// this is an intercepting route that builds a modal

export default function AddShipperReview() {
  return (
    <FullPageFormContainer title={'Add Shipper'}>
      <ShipperReviewForm />
    </FullPageFormContainer>
  );
}
