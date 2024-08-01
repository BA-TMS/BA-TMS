// slices/loadSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getLoads, addLoad as apiAddLoad } from '@/lib/dbActions';

// Format a load to show its human-facing info.
const formatron = function (rawLoad: any) {
  return {
    ...rawLoad,
    shipDate: rawLoad.shipDate ? rawLoad.shipDate.toDateString() : null,
    deliveryDate: rawLoad.deliveryDate
      ? rawLoad.deliveryDate.toDateString()
      : null,
    carrier: rawLoad.carrier.name,
    driver: rawLoad.driver ? rawLoad.driver.name : null,
    customer: rawLoad.customer.name,
    shipper: rawLoad.shipper ? rawLoad.shipper.name : null,
    consignee: rawLoad.consignee ? rawLoad.consignee.name : null,
  };
};

// Define Async Thunks
export const fetchLoads = createAsyncThunk(
  'loads/fetchLoads',
  async () => {
    const data = await getLoads();
    return data.map(load => ({
      ...load,
      shipDate: load.shipDate ? load.shipDate.toDateString() : null,
      deliveryDate: load.deliveryDate ? load.deliveryDate.toDateString() : null,
      carrier: load.carrier.name,
      driver: load.driver ? load.driver.name : null,
      customer: load.customer.name,
      shipper: load.shipper ? load.shipper.name : null,
      consignee: load.consignee ? load.consignee.name : null,
    }));
  }
);

export const createLoad = createAsyncThunk(
  'loads/createLoad',
  async (load: any) => {
    const newLoad = await apiAddLoad({ load });
    return formatron(newLoad);
  }
);

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
