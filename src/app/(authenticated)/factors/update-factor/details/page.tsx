'use client';

import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import FactoringCompanyDetailsForm from '@/components/Forms/Factor/FactoringCompanyDetails';

export default function UpdateFactorDetails() {
  return (
    <FullPageFormContainer title="Update Factoring Company">
      <FactoringCompanyDetailsForm />
    </FullPageFormContainer>
  );
}
