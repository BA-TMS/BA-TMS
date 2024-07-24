import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCarriers, addCarrier } from '@/lib/dbActions';

export const fetchCarriers = createAsyncThunk(
  'carriers/fetCarriers',
  async () => {
    const data = await getCarriers();
    return data;
  }
);

export const createCarrier = createAsyncThunk(
  'carriers/createCarrier',
  async (carrier: any) => {
    const newCarrier = await addCarrier({ carrier });
    return newCarrier;
  }
);

const carrierSlice = createSlice({
  name: 'carriers',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarriers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCarriers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCarriers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createCarrier.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default carrierSlice.reducer;
