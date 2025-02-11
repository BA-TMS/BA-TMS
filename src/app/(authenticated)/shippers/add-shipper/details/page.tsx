'use client';

import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import ShipperDetailsForm from '@/components/Forms/Shipper/ShipperDetails';

export default function AddShipperDetails() {
  return (
    <FullPageFormContainer title="Add Shipper">
      <ShipperDetailsForm />
    </FullPageFormContainer>
  );
}
