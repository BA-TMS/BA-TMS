// slices/loadSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getLoads,
  addLoad as apiAddLoad,
  updateLoad as apiUpdateLoad,
  deleteLoad as apiDeleteLoad,
} from '@/lib/dbActions';

interface Load {
  id: string | undefined;
  ownerId: string;
  loadNum: string;
  payOrderNum: string;
  shipDate: Date | null;
  deliveryDate: Date | null;
  carrierId: string;
  driverId: string | null;
  customerId: string;
  originId: string | null;
  destId: string | null;
  status: string;
  carrier: { name: string };
  driver: { name: string } | null;
  customer: { companyName: string } | null;
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
const formatron = function (rawLoad: Load) {
  return {
    ...rawLoad,
    shipDate: rawLoad.shipDate ? rawLoad.shipDate.toDateString() : null,

    deliveryDate: rawLoad.deliveryDate
      ? rawLoad.deliveryDate.toDateString()
      : null,

    carrier: rawLoad.carrier.name,
    driver: rawLoad.driver ? rawLoad.driver.name : null,
    customer: rawLoad.customer ? rawLoad.customer.companyName : null,
    shipper: rawLoad.shipper ? rawLoad.shipper.name : null,
    consignee: rawLoad.consignee ? rawLoad.consignee.name : null,
  } as unknown as Load; // it does not like date to string conversion when returning formatron;
};

// Define Async Thunks
export const fetchLoads = createAsyncThunk<Load[]>(
  'loads/fetchLoads',
  async () => {
    const data = await getLoads();
    return data.map((currLoad: Load) => formatron(currLoad));
  }
);

export const createLoad = createAsyncThunk<Load, Load>(
  'loads/createLoad',
  async (load, { rejectWithValue }) => {
    try {
      const newLoad = await apiAddLoad({ load });

      return formatron(newLoad);
    } catch (error) {
      return rejectWithValue('Failed to create new Load');
    }
  }
);

export const updateLoad = createAsyncThunk<Load, UpdateLoadPayload>(
  'loads/updateLoad',
  async ({ id, updatedLoad }: UpdateLoadPayload, { rejectWithValue }) => {
    try {
      const load = await apiUpdateLoad(id, { formData: updatedLoad });
      return formatron(load);
    } catch (error) {
      return rejectWithValue('Failed to update Load');
    }
  }
);

// may need to handle errors here too
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
        state.items = state.items.filter(
          (load) => load.id !== action.meta.arg.toString()
        ); //property contains the id argument passed to the deleteLoad - id is sometimes a number, sometimes a string?
      });
  },
});

export default loadSlice.reducer;
