'use client';

import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import ShipperDetailsForm from '@/components/Forms/Shipper/ShipperDetails';

export default function UpdateShipperDetails() {
  return (
    <FullPageFormContainer title="Update Shipper">
      <ShipperDetailsForm />
    </FullPageFormContainer>
  );
}
