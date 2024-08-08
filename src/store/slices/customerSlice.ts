import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getCustomers } from '@/lib/dbActions';

interface CustomerData {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  address: string;
  addressAddOn: string | null;
  city: string;
  state: string;
  postCountry: string;
  postCode: string;
  telCountry: string;
  telephone: string;
}

// interface UpdatedCustomerPayload {
//   id: string;
//   updatedLoad: Partial<CustomerData>;
// }

interface CustomerState {
  items: CustomerData[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Define Async Thunks
export const fetchCustomers = createAsyncThunk<CustomerData[]>(
  'customers/fetchCustomers',
  async () => {
    const data = await getCustomers(); // get
    console.log('fetchCustomers', data);
    return data.map((customer: CustomerData) => ({
      ...customer,
    }));
  }
);

const customerSlice = createSlice({
  name: 'customers',
  initialState: <CustomerState>{
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchCustomers.fulfilled,
        (state, action: PayloadAction<CustomerData[]>) => {
          state.status = 'succeeded';
          state.items = action.payload;
        }
      )
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch loads';
      });
    //   .addCase(createLoad.fulfilled, (state, action: PayloadAction<Load>) => {
    //     state.items.push(action.payload);
    //   })
    //   .addCase(updateLoad.fulfilled, (state, action: PayloadAction<Load>) => {
    //     const index = state.items.findIndex(
    //       (load) => load.id === action.payload.id
    //     );
    //     if (index !== -1) {
    //       state.items[index] = action.payload;
    //     }
    //   });
  },
});

export default customerSlice.reducer;
