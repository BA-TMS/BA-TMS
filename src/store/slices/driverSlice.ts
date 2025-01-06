import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getDrivers, addDriver } from '@/lib/dbActions';
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
    organization: driver.organization.orgName,
    employer: driver.employer ? driver.employer.carrierName : null,
  } as unknown as DriverData;
};

export const fetchDrivers = createAsyncThunk<DriverData[], string>(
  'drivers/fetchDrivers',
  async (orgName) => {
    const data = await getDrivers(orgName);

    console.log('DATA', data);

    return data.map((driver) => formatron(driver as DriverData));
  }
);

export const createDriver = createAsyncThunk<DriverData, DriverFormData>(
  'drivers/createDriver',
  async (driver, { rejectWithValue }) => {
    try {
      const response = await addDriver({ driver });

      return formatron(response as DriverData);
    } catch (error) {
      return rejectWithValue('Failed to create driver');
    }
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
      })
      .addCase(createDriver.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(createDriver.rejected, (state, action) => {
        const message = action.payload;
        state.status = 'failed';
        state.error = message as string;
      });
  },
});

export default driverSlice.reducer;
