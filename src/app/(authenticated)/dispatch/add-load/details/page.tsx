'use client';

import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import LoadForm from '@/components/Forms/LoadForm';

// this is a regular page for /add-load (not a modal)

export default function AddLoadDetails() {
  return (
    <FullPageFormContainer title="Add Load">
      <LoadForm />
    </FullPageFormContainer>
  );
}
