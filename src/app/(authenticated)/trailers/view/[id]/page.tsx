'use client';

import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import { RootState } from '@/store/store';
import { TruckData } from '@/types/truckTypes';
import { ViewTruckForm } from '@/components/Forms/Truck/ViewTruck';

// page uses dynamic routing as we don't know what the id is
// takes in the id to find the entry

export default function ViewTruck() {
  const pathname = usePathname();

  // slice the pathname to get the id
  const truckId = pathname.split('/view/')[1];

  // use the id to pull from redux
  const truck = useSelector((state: RootState) =>
    state.trucks.items.find((truck: TruckData) => truck.id === truckId)
  );

  return (
    <FullPageFormContainer title={'View Truck'}>
      <ViewTruckForm data={truck} />
    </FullPageFormContainer>
  );
}
