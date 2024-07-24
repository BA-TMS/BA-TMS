// slices/loadSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getLoads,
  addLoad as apiAddLoad,
  updateLoad as apiUpdateLoad,
} from '@/lib/dbActions';

interface Load {}

interface UpdateLoadPayload {
  id: string;
  updatedLoad: Load;
}

// Define Async Thunks
export const fetchLoads = createAsyncThunk('loads/fetchLoads', async () => {
  const data = await getLoads();
  return data.map((load: any) => ({
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
  async (load: Load) => {
    const newLoad = await apiAddLoad({ load });
    return newLoad;
  }
);

export const updateLoad = createAsyncThunk(
  'loads/updateLoad',
  async ({ id, updatedLoad }: UpdateLoadPayload) => {
    const load = await apiUpdateLoad(id, { formData: updatedLoad });
    return load;
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
      })
      .addCase(updateLoad.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (load) => load.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export default loadSlice.reducer;
