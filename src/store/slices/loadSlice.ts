// slices/loadSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getLoads,
  addLoad as apiAddLoad,
  updateLoad as apiUpdateLoad,
  deleteLoad as apiDeleteLoad,
} from '@/lib/dbActions';

interface Load {
  id: string;
  ownerId: string;
  loadNum: string;
  carrierId: string;
  driverId: string | null;
  customerId: string;
  originId: string | null;
  destId: string | null;
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
export const fetchLoads = createAsyncThunk<Load[]>(
  'loads/fetchLoads',
  async () => {
    const data = await getLoads();
    return data.map(currLoad => formatron(currLoad));
  }
);

export const createLoad = createAsyncThunk<Load, Load>(
  'loads/createLoad',
  async (load) => {
    const newLoad = await apiAddLoad({ load });
    return formatron(newLoad);
  }
);

export const updateLoad = createAsyncThunk<Load, UpdateLoadPayload>(
  'loads/updateLoad',
  async ({ id, updatedLoad }: UpdateLoadPayload) => {
    const load = await apiUpdateLoad(id, { formData: updatedLoad });
    return load;
  }
);

export const deleteLoad = createAsyncThunk(
  'loads/deleteLoad',
  async (id: number) => {
    const response = await apiDeleteLoad(id);
    return response;
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
      })
      .addCase(deleteLoad.fulfilled, (state, action) => {
        state.items = state.items.filter((load) => load.id !== action.meta.arg); //property contains the id argument passed to the deleteLoad
      });
  },
});

export default loadSlice.reducer;
