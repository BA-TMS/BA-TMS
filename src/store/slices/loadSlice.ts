// slices/loadSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getLoads,
  addLoad as apiAddLoad,
  updateLoad as apiUpdateLoad,
  deleteLoad as apiDeleteLoad,
} from '@/lib/dbActions';
import { LoadData, LoadFormData } from '@/types/loadTypes';

interface UpdateLoadPayload {
  id: string;
  updatedLoad: Partial<LoadFormData>;
}

interface LoadState {
  items: LoadData[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Format a load to show its human-facing info.
const formatron = function (rawLoad: LoadData) {
  return {
    ...rawLoad,
    shipDate: rawLoad.shipDate ? rawLoad.shipDate.toDateString() : null,

    deliveryDate: rawLoad.deliveryDate
      ? rawLoad.deliveryDate.toDateString()
      : null,

    carrier: rawLoad.carrier ? rawLoad.carrier.name : null,
    driver: rawLoad.driver ? rawLoad.driver.name : null,
    customer: rawLoad.customer ? rawLoad.customer.companyName : null,
    shipper: rawLoad.shipper ? rawLoad.shipper.name : null,
    consignee: rawLoad.consignee ? rawLoad.consignee.name : null,
  } as unknown as LoadData; // it does not like date to string conversion when returning formatron;
};

// Define Async Thunks
export const fetchLoads = createAsyncThunk<LoadData[]>(
  'loads/fetchLoads',
  async () => {
    const data = await getLoads();
    return data.map((currLoad: LoadData) => formatron(currLoad));
  }
);

export const createLoad = createAsyncThunk<LoadData, LoadFormData>(
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

export const updateLoad = createAsyncThunk<LoadData, UpdateLoadPayload>(
  'loads/updateLoad',
  async ({ id, updatedLoad }: UpdateLoadPayload, { rejectWithValue }) => {
    try {
      const load = await apiUpdateLoad(id, { formData: updatedLoad });
      return formatron(load);
    } catch (error) {
      let message = 'Failed to Update Load';
      if (error instanceof Error) message = error.message;
      return rejectWithValue(message); // what is returned if there is an error - comes from error in db action
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
      .addCase(
        fetchLoads.fulfilled,
        (state, action: PayloadAction<LoadData[]>) => {
          state.status = 'succeeded';
          state.items = action.payload;
        }
      )
      .addCase(fetchLoads.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch loads';
      })
      .addCase(
        createLoad.fulfilled,
        (state, action: PayloadAction<LoadData>) => {
          state.items.push(action.payload);
        }
      )
      .addCase(
        updateLoad.fulfilled,
        (state, action: PayloadAction<LoadData>) => {
          const index = state.items.findIndex(
            (load) => load.id === action.payload.id
          );
          if (index !== -1) {
            state.items[index] = action.payload;
          }
        }
      )
      .addCase(updateLoad.rejected, (state, action) => {
        const message = action.payload;
        state.status = 'failed';
        state.error = message as string; // type coercion
      })
      .addCase(deleteLoad.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (load) => load.id !== action.meta.arg.toString()
        ); //property contains the id argument passed to the deleteLoad - id is sometimes a number, sometimes a string?
      });
  },
});

export default loadSlice.reducer;
