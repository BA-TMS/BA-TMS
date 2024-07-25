// slices/loadSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getLoads,
  addLoad as apiAddLoad,
  updateLoad as apiUpdateLoad,
} from '@/lib/dbActions';

interface Load {
  id: number;
  ownerId: number;
  loadNum: number;
  carrierId: number;
  driverId: number | null;
  customerId: number;
  originId: number | null;
  destId: number | null;
  status: string;
  shipDate: Date | null;
  deliveryDate: Date | null;
  carrier: { name: string };
  driver: { name: string } | null;
  customer: { name: string };
  shipper: { name: string } | null;
  consignee: { name: string } | null;
}

interface UpdateLoadPayload {
  id: string;
  updatedLoad: Partial<Load>;
}

interface LoadState {
  items: Load[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Define Async Thunks
export const fetchLoads = createAsyncThunk<Load[]>(
  'loads/fetchLoads',
  async () => {
    const data = await getLoads();
    return data.map((load: Load) => ({
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

export const createLoad = createAsyncThunk<Load, Load>(
  'loads/createLoad',
  async (load: Load) => {
    const newLoad = await apiAddLoad({ load });
    return newLoad;
  }
);

export const updateLoad = createAsyncThunk<Load, UpdateLoadPayload>(
  'loads/updateLoad',
  async ({ id, updatedLoad }: UpdateLoadPayload) => {
    const load = await apiUpdateLoad(id, { formData: updatedLoad });
    return load;
  }
);

const loadSlice = createSlice({
  name: 'loads',
  initialState: <LoadState>{
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
      .addCase(fetchLoads.fulfilled, (state, action: PayloadAction<Load[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchLoads.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch loads';
      })
      .addCase(createLoad.fulfilled, (state, action: PayloadAction<Load>) => {
        state.items.push(action.payload);
      })
      .addCase(updateLoad.fulfilled, (state, action: PayloadAction<Load>) => {
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
