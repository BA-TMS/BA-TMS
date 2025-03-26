'use client';

import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import CarrierInsuranceForm from '@/components/Forms/Carrier/CarrierInsurance';

export default function UpdateCarrierInsurance() {
  return (
    <FullPageFormContainer title="Update External Carrier">
      <CarrierInsuranceForm />
    </FullPageFormContainer>
  );
}
