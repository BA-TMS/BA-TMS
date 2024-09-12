import { configureStore } from '@reduxjs/toolkit';
import loadReducer from './slices/loadSlice';
import carrierReducer from './slices/carrierSlice';
import customerReducer from './slices/customerSlice';

const store = configureStore({
  reducer: {
    loads: loadReducer,
    carriers: carrierReducer,
    customers: customerReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
