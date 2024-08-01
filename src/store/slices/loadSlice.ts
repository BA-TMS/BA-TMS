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

// export const createLoad = createAsyncThunk('loads/createLoad', async (load) => {
//   const newLoad = await apiAddLoad({ load });
//   return newLoad;
// });

export const createLoad = createAsyncThunk<Load, Load>(
  'loads/createLoad',
  async (load) => {
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
