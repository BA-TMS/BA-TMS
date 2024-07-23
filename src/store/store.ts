import { configureStore } from '@reduxjs/toolkit';
import loadReducer from './slices/loadSlice';


const store = configureStore({
  reducer: {
    loads: loadReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
