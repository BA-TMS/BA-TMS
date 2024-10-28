'use client';

import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import { RootState } from '@/store/store';
import { CarrierData } from '@/types/carrierTypes';
import ViewCarrier from '@/components/Forms/Carrier/ViewCarrier';

// page uses dynamic routing as we don't know what the id is
// takes in the id to find the entry

export default function ViewCarrierPage() {
  const pathname = usePathname();

  // slice the pathname to get the id
  const carrierId = pathname.split('/view/')[1];

  // use the id to pull from redux
  const carrier = useSelector((state: RootState) =>
    state.carriers.items.find(
      (carrier: CarrierData) => carrier.id === carrierId
    )
  );

  return (
    <FullPageFormContainer title={'View External Carrier'}>
      <ViewCarrier data={carrier} />
    </FullPageFormContainer>
  );
}
