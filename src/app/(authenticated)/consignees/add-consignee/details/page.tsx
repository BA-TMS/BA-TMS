'use client';

import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import ConsigneeDetailsForm from '@/components/Forms/Consignee/ConsigneeDetails';

export default function AddShipperDetails() {
  return (
    <FullPageFormContainer title="Add Consignee">
      <ConsigneeDetailsForm />
    </FullPageFormContainer>
  );
}
