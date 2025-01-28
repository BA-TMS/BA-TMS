import { configureStore } from '@reduxjs/toolkit';
import loadReducer from './slices/loadSlice';
import brokerReducer from './slices/brokerSlice';
import carrierReducer from './slices/carrierSlice';
import customerReducer from './slices/customerSlice';
import driverReducer from './slices/driverSlice';
import teamReducer from './slices/teamSlice';

// create a factory function that creates a store instance per request
export const makeStore = () => {
  return configureStore({
    reducer: {
      loads: loadReducer,
      brokers: brokerReducer,
      carriers: carrierReducer,
      customers: customerReducer,
      drivers: driverReducer,
      team: teamReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
