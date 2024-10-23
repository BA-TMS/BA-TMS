import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCarriers, addCarrier } from '@/lib/dbActions';
import { CarrierData, CarrierFormData } from '@/types/carrierTypes';

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

    CarrierInsurance: carrier.CarrierInsurance
      ? carrier.CarrierInsurance.id
      : null, // ?? see what this looks like
  } as unknown as CarrierData;
};

export const fetchCarriers = createAsyncThunk<CarrierData[]>(
  'carriers/fetchCarriers',
  async () => {
    const data = await getCarriers();

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
        state.error = action.error.message;
      })
      .addCase(createCarrier.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default carrierSlice.reducer;
