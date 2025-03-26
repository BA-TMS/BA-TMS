import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getConsignees,
  addConsignee,
  updateConsignee as apiUpdateConsignee,
} from '@/lib/actions/consigneeActions';
import { ConsigneeData, ConsigneeFormData } from '@/types/consigneeTypes';

interface UpdatedConsigneePayload {
  id: string;
  updatedConsignee: Partial<ConsigneeData>;
}

interface ConsigneeState {
  items: ConsigneeData[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const formatron = function (consignee: ConsigneeData) {
  return {
    ...consignee,
    createdAt:
      consignee.createdAt instanceof Date
        ? consignee.createdAt.toDateString()
        : null,
    updatedAt:
      consignee.updatedAt instanceof Date
        ? consignee.updatedAt.toDateString()
        : null,
    consignee: consignee.shipper ? consignee.shipper.name : null,
  } as unknown as ConsigneeData;
};

export const fetchConsignees = createAsyncThunk<ConsigneeData[], string>(
  'consignees/fetchConsignees',
  async (orgName) => {
    const data = await getConsignees(orgName);

    return data.map((consignee: ConsigneeData) => formatron(consignee));
  }
);

export const createConsignee = createAsyncThunk<
  ConsigneeData,
  ConsigneeFormData
>('consignees/createConsignee', async (consignee, { rejectWithValue }) => {
  try {
    const response = await addConsignee({ consignee });

    return formatron(response as ConsigneeData);
  } catch (error) {
    return rejectWithValue('Failed to create consignee');
  }
});

export const updateConsignee = createAsyncThunk<
  ConsigneeData,
  UpdatedConsigneePayload
>(
  'consignees/updateConsignee',
  async (
    { id, updatedConsignee }: UpdatedConsigneePayload,
    { rejectWithValue }
  ) => {
    try {
      const response = await apiUpdateConsignee(id, {
        consignee: updatedConsignee as ConsigneeFormData,
      });

      return formatron(response as ConsigneeData);
    } catch (error) {
      return rejectWithValue('Failed to update consignee');
    }
  }
);

const consigneeSlice = createSlice({
  name: 'consignees',
  initialState: <ConsigneeState>{
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchConsignees.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchConsignees.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchConsignees.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch consignees';
      })
      .addCase(createConsignee.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(createConsignee.rejected, (state, action) => {
        const message = action.payload;
        state.status = 'failed';
        state.error = message as string;
      })
      .addCase(
        updateConsignee.fulfilled,
        (state, action: PayloadAction<ConsigneeData>) => {
          const index = state.items.findIndex(
            (consignee) => consignee.id === action.payload.id
          );
          if (index !== -1) {
            state.items[index] = action.payload;
          }
        }
      )
      .addCase(updateConsignee.rejected, (state, action) => {
        const message = action.payload;
        state.status = 'failed';
        state.error = message as string;
      });
  },
});

export default consigneeSlice.reducer;
