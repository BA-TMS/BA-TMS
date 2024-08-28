import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getCustomers,
  addCustomer,
  updateCustomer as apiUpdateCustomer,
} from '@/lib/dbActions';
import { CustomerData } from '@/types/customerTypes';

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
  console.log('FORMATRON', customer.factor);
  return {
    ...customer,
    factor: customer.factor ? customer.factor.name : null,
  };
};

// Define Async Thunks
export const fetchCustomers = createAsyncThunk<CustomerData[]>(
  'customers/fetchCustomers',
  async () => {
    const data = await getCustomers();

    // return data.map((customer: CustomerData) => ({
    //   ...customer,
    //   factor: customer.factor?.name,
    // }));
    console.log('fetch customers', data);
    return data.map((customer: CustomerData) => formatron(customer));
  }
);

export const createCustomer = createAsyncThunk<CustomerData, CustomerData>(
  'customers/createCustomer',
  async (customer: CustomerData) => {
    try {
      const response = await addCustomer({ customer });
      console.log('new customer', response);
      return response; // is response of type CustomerData?
    } catch (error) {
      return console.log('Error creating customer');
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
    console.log('updated customer', customer);
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
