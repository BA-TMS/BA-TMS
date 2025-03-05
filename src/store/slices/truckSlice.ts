import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getTrucks,
  addTruck,
  updateTruck as apiUpdateTruck,
} from '@/lib/actions/truckActions';
import { TruckData, TruckFormData } from '@/types/truckTypes';

interface UpdatedTruckPayload {
  id: string;
  updatedTruck: Partial<TruckData>;
}

interface TruckState {
  items: TruckData[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const formatron = function (truck: TruckData) {
  return {
    ...truck,
    createdAt:
      truck.createdAt instanceof Date ? truck.createdAt.toDateString() : null,
    updatedAt:
      truck.updatedAt instanceof Date ? truck.updatedAt.toDateString() : null,
    plateExpiry:
      truck.plateExpiry instanceof Date
        ? truck.plateExpiry.toDateString()
        : null,
    inspectionExpiry:
      truck.inspectionExpiry instanceof Date
        ? truck.inspectionExpiry.toDateString()
        : null,
    startDate:
      truck.startDate instanceof Date ? truck.startDate.toDateString() : null,
    deactivationDate:
      truck.deactivationDate instanceof Date
        ? truck.deactivationDate.toDateString()
        : null,
    dotExpiry:
      truck.dotExpiry instanceof Date ? truck.dotExpiry.toDateString() : null,
  } as unknown as TruckData;
};

export const fetchTrucks = createAsyncThunk<TruckData[], string>(
  'trucks/fetchTrucks',
  async (orgName) => {
    const data = await getTrucks(orgName);

    return data.map((truck: TruckData) => formatron(truck));
  }
);

export const createTruck = createAsyncThunk<TruckData, TruckFormData>(
  'trucks/createTruck',
  async (truck, { rejectWithValue }) => {
    try {
      const response = await addTruck({ truck });

      return formatron(response as TruckData);
    } catch (error) {
      return rejectWithValue('Failed to create truck');
    }
  }
);

export const updateTruck = createAsyncThunk<TruckData, UpdatedTruckPayload>(
  'trucks/updateTruck',
  async ({ id, updatedTruck }: UpdatedTruckPayload, { rejectWithValue }) => {
    try {
      const response = await apiUpdateTruck(id, {
        truck: updatedTruck as TruckFormData,
      });

      return formatron(response as TruckData);
    } catch (error) {
      return rejectWithValue('Failed to update truck');
    }
  }
);

const truckSlice = createSlice({
  name: 'trucks',
  initialState: <TruckState>{
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrucks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTrucks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTrucks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch trucks';
      })
      .addCase(createTruck.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(createTruck.rejected, (state, action) => {
        const message = action.payload;
        state.status = 'failed';
        state.error = message as string;
      })
      .addCase(
        updateTruck.fulfilled,
        (state, action: PayloadAction<TruckData>) => {
          const index = state.items.findIndex(
            (truck) => truck.id === action.payload.id
          );
          if (index !== -1) {
            state.items[index] = action.payload;
          }
        }
      )
      .addCase(updateTruck.rejected, (state, action) => {
        const message = action.payload;
        state.status = 'failed';
        state.error = message as string;
      });
  },
});

export default truckSlice.reducer;
