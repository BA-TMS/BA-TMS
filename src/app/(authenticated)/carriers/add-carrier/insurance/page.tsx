'use client';

import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import CarrierInsuranceForm from '@/components/Forms/Carrier/CarrierInsurance';

export default function AddCarrierInsurance() {
  return (
    <FullPageFormContainer title="Add External Carrier">
      <CarrierInsuranceForm />
    </FullPageFormContainer>
  );
}
