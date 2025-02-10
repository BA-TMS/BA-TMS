'use client';

import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import FactoringCompanyReview from '@/components/Forms/Factor/FactoringCoReview';

// this is an intercepting route that builds a modal

export default function AddFactorReview() {
  return (
    <FullPageFormContainer title={'Add Factoring Company'}>
      <FactoringCompanyReview />
    </FullPageFormContainer>
  );
}
