import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getCustomers,
  addCustomer,
  updateCustomer as apiUpdateCustomer,
} from '@/lib/dbActions';
import { CustomerData, CustomerFormData } from '@/types/customerTypes';

interface UpdatedCustomerPayload {
  id: string;
  updatedCustomer: Partial<CustomerData>;
}

interface CustomerState {
  items: CustomerData[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// customer format for UI
const formatron = function (customer: CustomerData) {
  return {
    ...customer,
    factor: customer.factor ? customer.factor.name : null,
    createdAt: customer.createdAt ? customer.createdAt.toISOString() : null,
    updatedAt: customer.updatedAt ? customer.updatedAt.toISOString() : null,
  } as unknown as CustomerData;
};

// Define Async Thunks
export const fetchCustomers = createAsyncThunk<CustomerData[]>(
  'customers/fetchCustomers',
  async () => {
    const data = await getCustomers();

    return data.map((customer: CustomerData) => formatron(customer));
  }
);

export const createCustomer = createAsyncThunk<CustomerData, CustomerFormData>(
  'customers/createCustomer',
  async (customer, { rejectWithValue }) => {
    try {
      const response = await addCustomer({ customer });

      return formatron(response);
    } catch (error) {
      return rejectWithValue('Failed to create customer');
    }
  }
);

export const updateCustomer = createAsyncThunk<
  CustomerData,
  UpdatedCustomerPayload
>(
  'customers/updateCustomer',
  async (
    { id, updatedCustomer }: UpdatedCustomerPayload,
    { rejectWithValue }
  ) => {
    try {
      const customer = await apiUpdateCustomer(id, {
        formData: updatedCustomer as CustomerFormData,
      });

      return formatron(customer);
    } catch (error) {
      return rejectWithValue('Failed to update customer');
    }
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
