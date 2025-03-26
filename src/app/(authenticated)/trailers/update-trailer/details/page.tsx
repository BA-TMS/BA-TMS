'use client';

import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import TrailerDetails from '@/components/Forms/Trailer/TrailerDetails';

export default function UpdateTrailerDetails() {
  return (
    <FullPageFormContainer title="Update Trailer">
      <TrailerDetails />
    </FullPageFormContainer>
  );
}
