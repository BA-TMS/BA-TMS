import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getFactors,
  addFactoringCo,
  updateFactor as apiUpdateFactor,
} from '@/lib/actions/factorActions';
import { FactorData, FactorFormData } from '@/types/factorTypes';

interface UpdatedFactorPayload {
  id: string;
  updatedFactor: Partial<FactorData>;
}

interface FactorState {
  items: FactorData[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const formatron = function (factor: FactorData) {
  return {
    ...factor,
    createdAt:
      factor.createdAt instanceof Date ? factor.createdAt.toDateString() : null,
    updatedAt:
      factor.updatedAt instanceof Date ? factor.updatedAt.toDateString() : null,
  } as unknown as FactorData;
};

export const fetchFactors = createAsyncThunk<FactorData[], string>(
  'factors/fetchFactors',
  async (orgName) => {
    const data = await getFactors(orgName);

    return data.map((factor: FactorData) => formatron(factor));
  }
);

export const createFactor = createAsyncThunk<FactorData, FactorFormData>(
  'factors/createFactor',
  async (factor, { rejectWithValue }) => {
    try {
      const response = await addFactoringCo({ factor });

      return formatron(response as FactorData);
    } catch (error) {
      return rejectWithValue('Failed to create factoring company');
    }
  }
);

export const updateFactor = createAsyncThunk<FactorData, UpdatedFactorPayload>(
  'factors/updateFactor',
  async ({ id, updatedFactor }: UpdatedFactorPayload, { rejectWithValue }) => {
    try {
      const response = await apiUpdateFactor(id, {
        factor: updatedFactor as FactorFormData,
      });

      return formatron(response as FactorData);
    } catch (error) {
      return rejectWithValue('Failed to update factor');
    }
  }
);

const factorSlice = createSlice({
  name: 'factors',
  initialState: <FactorState>{
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFactors.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFactors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchFactors.rejected, (state, action) => {
        state.status = 'failed';
        state.error =
          action.error.message || 'Failed to fetch factoring companies';
      })
      .addCase(createFactor.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(createFactor.rejected, (state, action) => {
        const message = action.payload;
        state.status = 'failed';
        state.error = message as string;
      })
      .addCase(
        updateFactor.fulfilled,
        (state, action: PayloadAction<FactorData>) => {
          const index = state.items.findIndex(
            (factor) => factor.id === action.payload.id
          );
          if (index !== -1) {
            state.items[index] = action.payload;
          }
        }
      )
      .addCase(updateFactor.rejected, (state, action) => {
        const message = action.payload;
        state.status = 'failed';
        state.error = message as string;
      });
  },
});

export default factorSlice.reducer;
