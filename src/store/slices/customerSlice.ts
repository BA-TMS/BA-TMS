import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getCustomers,
  addCustomer,
  updateCustomer as apiUpdateCustomer,
} from '@/lib/dbActions';

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

interface UpdatedCustomerPayload {
  id: string;
  updatedLoad: Partial<CustomerData>;
}

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

export const createCustomer = createAsyncThunk<CustomerData, CustomerData>(
  'customers/createCustomer',
  async (customer: CustomerData, { rejectWithValue }) => {
    try {
      const response = await addCustomer({ customer });

      if (!response) {
        return rejectWithValue('Error creating customer');
      }

      return response; // is response of type CustomerData?
    } catch (error) {
      return rejectWithValue('Error creating customer');
    }
  }
);

export const updateCustomer = createAsyncThunk<
  CustomerData,
  UpdatedCustomerPayload
>(
  'customers/updateCustomer',
  async ({ id, updatedCustomer }: UpdatedCustomerPayload) => {
    const customer = await apiUpdateCustomer(id, { formData: updatedCustomer });
    return customer;
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
      })
      .addCase(
        createCustomer.fulfilled,
        (state, action: PayloadAction<CustomerData>) => {
          state.items.push(action.payload);
        }
      )
      .addCase(
        updateCustomer.fulfilled,
        (state, action: PayloadAction<CustomerData>) => {
          const index = state.items.findIndex(
            (customer) => customer.id === action.payload.id
          );
          if (index !== -1) {
            state.items[index] = action.payload;
          }
        }
      );
  },
});

export default customerSlice.reducer;
