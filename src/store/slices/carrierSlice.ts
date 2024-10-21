import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCarriers, addCarrier } from '@/lib/dbActions';
import { CarrierData } from '@/types/carrierTypes';

interface CarrierState {
  items: CarrierData[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const formatron = function (carrier: CarrierData) {
  return {
    ...carrier,
    // factor: customer.factor ? customer.factor.name : null,
    createdAt: carrier.createdAt ? carrier.createdAt.toISOString() : null,
    updatedAt: carrier.updatedAt ? carrier.updatedAt.toISOString() : null,
  } as unknown as CarrierData;
};

export const fetchCarriers = createAsyncThunk<CarrierData[]>(
  'carriers/fetchCarriers',
  async () => {
    const data = await getCarriers();
    console.log('SLICE CARRIERS', data);
    return data.map((carrier: CarrierData) => formatron(carrier));
  }
);

export const createCarrier = createAsyncThunk(
  'carriers/createCarrier',
  async (carrier: any) => {
    const newCarrier = await addCarrier({ carrier });
    return newCarrier;
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
