import { configureStore } from '@reduxjs/toolkit';
import loadReducer from './slices/loadSlice';
import brokerReducer from './slices/brokerSlice';
import carrierReducer from './slices/carrierSlice';
import consigneeReducer from './slices/consigneeSlice';
import customerReducer from './slices/customerSlice';
import driverReducer from './slices/driverSlice';
import factorReducer from './slices/factorSlice';
import otherNumReducer from './slices/otherNumSlice';
import shipperReducer from './slices/shipperSlice';
import trailerReducer from './slices/trailerSlice';
import truckReducer from './slices/truckSlice';
import teamReducer from './slices/teamSlice';

// create a factory function that creates a store instance per request
export const makeStore = () => {
  return configureStore({
    reducer: {
      loads: loadReducer,
      brokers: brokerReducer,
      carriers: carrierReducer,
      consignees: consigneeReducer,
      customers: customerReducer,
      drivers: driverReducer,
      factors: factorReducer,
      otherNumbers: otherNumReducer,
      shippers: shipperReducer,
      team: teamReducer,
      trailers: trailerReducer,
      trucks: truckReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
