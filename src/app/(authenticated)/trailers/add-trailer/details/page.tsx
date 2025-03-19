'use client';

import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import TrailerDetails from '@/components/Forms/Trailer/TrailerDetails';

export default function AddTrailerDetails() {
  return (
    <FullPageFormContainer title="Add Trailer">
      <TrailerDetails />
    </FullPageFormContainer>
  );
}
