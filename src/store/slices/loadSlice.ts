// slices/loadSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getLoads,
  addLoad as apiAddLoad,
  deleteLoad as apiDeleteLoad,
} from '@/lib/dbActions';

// Define Async Thunks
export const fetchLoads = createAsyncThunk('loads/fetchLoads', async () => {
  const data = await getLoads();
  return data.map((load) => ({
    ...load,
    shipDate: load.shipDate ? load.shipDate.toDateString() : null,
    deliveryDate: load.deliveryDate ? load.deliveryDate.toDateString() : null,
    carrier: load.carrier.name,
    driver: load.driver ? load.driver.name : null,
    customer: load.customer.name,
    shipper: load.shipper ? load.shipper.name : null,
    consignee: load.consignee ? load.consignee.name : null,
  }));
});

export const createLoad = createAsyncThunk(
  'loads/createLoad',
  async (load: any) => {
    const newLoad = await apiAddLoad({ load });
    return newLoad;
  }
);

export const deleteLoad = createAsyncThunk('loads/deleteLoad', async (id) => {
  // need to see what the load is
  console.log('delete load id ', id);
  const response = await apiDeleteLoad(id);
  return response;
});

const loadSlice = createSlice({
  name: 'loads',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoads.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoads.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchLoads.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createLoad.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default loadSlice.reducer;
