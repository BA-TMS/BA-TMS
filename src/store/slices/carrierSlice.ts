import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getCarriers,
  addCarrier,
  updateCarrier as apiUpdatecarrier,
} from '@/lib/dbActions';
import { CarrierData, CarrierFormData } from '@/types/carrierTypes';

interface UpdatedCarrierPayload {
  id: string;
  updatedCarrier: Partial<CarrierData>;
}

interface CarrierState {
  items: CarrierData[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const formatron = function (carrier: CarrierData) {
  return {
    ...carrier,
    factor: carrier.factor ? carrier.factor.name : null,
    createdAt:
      carrier.createdAt instanceof Date
        ? carrier.createdAt.toISOString()
        : null,
    updatedAt:
      carrier.updatedAt instanceof Date
        ? carrier.updatedAt.toISOString()
        : null,
  } as unknown as CarrierData;
};

export const fetchCarriers = createAsyncThunk<CarrierData[]>(
  'carriers/fetchCarriers',
  async () => {
    const data = await getCarriers();
    console.log('GET CARRIERS', data);
    return data.map((carrier: CarrierData) => formatron(carrier));
  }
);

export const createCarrier = createAsyncThunk<CarrierData, CarrierFormData>(
  'carriers/createCarrier',
  async (carrier, { rejectWithValue }) => {
    try {
      const response = await addCarrier({ carrier });

      return formatron(response);
    } catch (error) {
      return rejectWithValue('Failed to create carrier');
    }
  }
);

export const updateCarrier = createAsyncThunk<
  CarrierData,
  UpdatedCarrierPayload
>(
  'carriers/updateCarrier',
  async (
    { id, updatedCarrier }: UpdatedCarrierPayload,
    { rejectWithValue }
  ) => {
    try {
      const response = await apiUpdatecarrier(id, {
        carrier: updatedCarrier as CarrierFormData,
      });

      return formatron(response);
    } catch (error) {
      return rejectWithValue('Failed to update carrier');
    }
  }
);

const carrierSlice = createSlice({
  name: 'carriers',
  initialState: <CarrierState>{
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
        state.error = action.error.message || 'Failed to fetch carriers';
      })
      .addCase(createCarrier.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(createCarrier.rejected, (state, action) => {
        const message = action.payload;
        state.status = 'failed';
        state.error = message as string;
      })
      .addCase(
        updateCarrier.fulfilled,
        (state, action: PayloadAction<CarrierData>) => {
          const index = state.items.findIndex(
            (carrier) => carrier.id === action.payload.id
          );
          if (index !== -1) {
            state.items[index] = action.payload;
          }
        }
      )
      .addCase(updateCarrier.rejected, (state, action) => {
        const message = action.payload;
        state.status = 'failed';
        state.error = message as string;
      });
  },
});

export default carrierSlice.reducer;
