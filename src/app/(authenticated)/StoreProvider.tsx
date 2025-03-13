'use client';

import { useEffect, useContext, useRef, useState } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '@/store/store';
import { UserContext } from '@/context/userContextProvider';
import Loader from '@/components/UI_Elements/PageLoader';
import { fetchLoads } from '@/store/slices/loadSlice';
import { fetchBrokers } from '@/store/slices/brokerSlice';
import { fetchCarriers } from '@/store/slices/carrierSlice';
import { fetchConsignees } from '@/store/slices/consigneeSlice';
import { fetchCustomers } from '@/store/slices/customerSlice';
import { fetchDrivers } from '@/store/slices/driverSlice';
import { fetchTeam } from '@/store/slices/teamSlice';
import { fetchFactors } from '@/store/slices/factorSlice';
import { fetchShippers } from '@/store/slices/shipperSlice';
import { fetchTrucks } from '@/store/slices/truckSlice';

// client component to create store and share using provider

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);
  const [isStoreReady, setIsStoreReady] = useState(false);
  const { organization } = useContext(UserContext);

  // create store instance the first time this component renders
  useEffect(() => {
    if (!storeRef.current) {
      storeRef.current = makeStore();
    }
  }, []);

  // dispatch actions when the store is created AND organization is available
  useEffect(() => {
    if (storeRef.current && organization && !isStoreReady) {
      storeRef.current.dispatch(fetchLoads(organization));
      storeRef.current.dispatch(fetchBrokers(organization));
      storeRef.current.dispatch(fetchCarriers(organization));
      storeRef.current.dispatch(fetchConsignees(organization));
      storeRef.current.dispatch(fetchCustomers(organization));
      storeRef.current.dispatch(fetchDrivers(organization));
      storeRef.current.dispatch(fetchFactors(organization));
      storeRef.current.dispatch(fetchShippers(organization));
      storeRef.current.dispatch(fetchTeam(organization));
      storeRef.current.dispatch(fetchTrucks(organization));

      // prevent redundant dispatches
      setIsStoreReady(true);
    }
  }, [organization, isStoreReady]); // only run when `organization` changes

  // wait for the store to be ready before rendering children
  if (!isStoreReady || !storeRef.current) {
    return <Loader />;
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
