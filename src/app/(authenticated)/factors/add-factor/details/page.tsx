'use client';

import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import FactoringCompanyDetailsForm from '@/components/Forms/Factor/FactoringCompanyDetails';

export default function AddFactorDetails() {
  return (
    <FullPageFormContainer title="Add Factoring Company">
      <FactoringCompanyDetailsForm />
    </FullPageFormContainer>
  );
}
