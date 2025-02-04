import { configureStore } from '@reduxjs/toolkit';
import loadReducer from './slices/loadSlice';
import brokerReducer from './slices/brokerSlice';
import carrierReducer from './slices/carrierSlice';
import customerReducer from './slices/customerSlice';
import driverReducer from './slices/driverSlice';
import teamReducer from './slices/teamSlice';

const store = configureStore({
  reducer: {
    loads: loadReducer,
    brokers: brokerReducer,
    carriers: carrierReducer,
    customers: customerReducer,
    drivers: driverReducer,
    team: teamReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
