import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getDrivers } from '@/lib/dbActions';
import { DriverFormData } from '@/types/driverTypes';

interface DriverState {
  items: DriverFormData[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export const fetchDrivers = createAsyncThunk(
  'drivers/fetchDrivers',
  async () => {
    const data = await getDrivers();

    // return data.map((carrier: CarrierData) => formatron(carrier));
    return data;
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
