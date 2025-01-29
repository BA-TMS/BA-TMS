'use client';

import { useRef, useContext } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '@/store/store';
import { UserContext } from '@/context/userContextProvider';
import { fetchLoads } from '@/store/slices/loadSlice';
import { fetchBrokers } from '@/store/slices/brokerSlice';
import { fetchCarriers } from '@/store/slices/carrierSlice';
import { fetchCustomers } from '@/store/slices/customerSlice';
import { fetchDrivers } from '@/store/slices/driverSlice';
import { fetchTeam } from '@/store/slices/teamSlice';

// TODO- see how this works on login

// client component to create store and share using provider
export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null); // store is only created once

  // only fetch relevant entries from db
  const { organization } = useContext(UserContext);
  console.log('org', organization);

  if (!storeRef.current) {
    // create the store instance the first time this renders
    storeRef.current = makeStore();

    // will want to do these when we have an organization
    storeRef.current.dispatch(fetchLoads());
    storeRef.current.dispatch(fetchBrokers(organization)); // check this
    storeRef.current.dispatch(fetchCarriers());
    storeRef.current.dispatch(fetchCustomers());
    storeRef.current.dispatch(fetchDrivers(organization)); // check this
    storeRef.current.dispatch(fetchTeam(organization)); // check this
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
