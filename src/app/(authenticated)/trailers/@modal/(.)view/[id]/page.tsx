'use client';

import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import Modal from '@ui/Modal/Modal';
import { RootState } from '@/store/store';
import { TrailerData } from '@/types/trailerTypes';
import ViewTrailerForm from '@/components/Forms/Trailer/ViewTrailer';

// page uses dynamic routing as we don't know what the id is
// takes in the id to find the entry

export default function ViewTrailerModal() {
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
    <Modal title={'View Trailer'}>
      <ViewTrailerForm data={trailer} />
    </Modal>
  );
}
