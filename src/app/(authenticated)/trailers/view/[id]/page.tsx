'use client';

import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import { RootState } from '@/store/store';
import { TrailerData } from '@/types/trailerTypes';
import ViewTrailerForm from '@/components/Forms/Trailer/ViewTrailer';

// page uses dynamic routing as we don't know what the id is
// takes in the id to find the entry

export default function ViewTrailer() {
  const pathname = usePathname();

  // slice the pathname to get the id
  const trailerId = pathname.split('/view/')[1];

  // use the id to pull from redux
  const trailer = useSelector((state: RootState) =>
    state.trailers.items.find(
      (trailer: TrailerData) => trailer.id === trailerId
    )
  );

  return (
    <FullPageFormContainer title={'View Trailer'}>
      <ViewTrailerForm data={trailer} />
    </FullPageFormContainer>
  );
}
