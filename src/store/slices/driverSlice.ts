import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getDrivers } from '@/lib/dbActions';
import { DriverFormData, DriverData } from '@/types/driverTypes';

interface DriverState {
  items: DriverData[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const formatron = function (driver: DriverData) {
  return {
    ...driver,
    createdAt:
      driver.createdAt instanceof Date ? driver.createdAt.toDateString() : null,
    updatedAt:
      driver.updatedAt instanceof Date ? driver.updatedAt.toDateString() : null,
  } as unknown as DriverData;
};

export const fetchDrivers = createAsyncThunk<DriverData[]>(
  'drivers/fetchDrivers',
  async () => {
    const data = await getDrivers();

    console.log('DATA', data);

    return data.map((driver: DriverData) => formatron(driver));
  }
);

const driverSlice = createSlice({
  name: 'drivers',
  initialState: <DriverState>{
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDrivers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDrivers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchDrivers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch drivers';
      });
  },
});

export default driverSlice.reducer;
