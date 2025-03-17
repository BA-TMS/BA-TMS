import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getOtherNums,
  addOtherNum,
  updateOtherNum as apiUpdateOtherNum,
} from '@/lib/actions/otherNumActions';
import { NumData, NumFormData } from '@/types/otherNumTypes';

interface UpdatedNumPayload {
  id: string;
  updatedNum: Partial<NumData>;
}

interface OtherNumState {
  items: NumData[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const formatron = function (otherNum: NumData) {
  return {
    ...otherNum,
    createdAt:
      otherNum.createdAt instanceof Date
        ? otherNum.createdAt.toDateString()
        : null,
    updatedAt:
      otherNum.updatedAt instanceof Date
        ? otherNum.updatedAt.toDateString()
        : null,
  } as unknown as NumData;
};

export const fetchOtherNums = createAsyncThunk<NumData[], string>(
  'other-numbers/fetchOtherNums',
  async (orgName) => {
    const data = await getOtherNums(orgName);

    return data.map((otherNum: NumData) => formatron(otherNum));
  }
);

export const createOtherNum = createAsyncThunk<NumData, NumFormData>(
  'other-numbers/createOtherNum',
  async (otherNum, { rejectWithValue }) => {
    try {
      const response = await addOtherNum({ otherNum });

      return formatron(response as NumData);
    } catch (error) {
      return rejectWithValue('Failed to create other number');
    }
  }
);

export const updateOtherNum = createAsyncThunk<NumData, UpdatedNumPayload>(
  'other-numbers/updateOtherNum',
  async ({ id, updatedNum }: UpdatedNumPayload, { rejectWithValue }) => {
    try {
      const response = await apiUpdateOtherNum(id, {
        otherNum: updatedNum as NumFormData,
      });

      return formatron(response as NumData);
    } catch (error) {
      return rejectWithValue('Failed to update number');
    }
  }
);

const otherNumSlice = createSlice({
  name: 'numbers',
  initialState: <OtherNumState>{
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOtherNums.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOtherNums.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchOtherNums.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch trucks';
      })
      .addCase(createOtherNum.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(createOtherNum.rejected, (state, action) => {
        const message = action.payload;
        state.status = 'failed';
        state.error = message as string;
      })
      .addCase(
        updateOtherNum.fulfilled,
        (state, action: PayloadAction<NumData>) => {
          const index = state.items.findIndex(
            (otherNum) => otherNum.id === action.payload.id
          );
          if (index !== -1) {
            state.items[index] = action.payload;
          }
        }
      )
      .addCase(updateOtherNum.rejected, (state, action) => {
        const message = action.payload;
        state.status = 'failed';
        state.error = message as string;
      });
  },
});

export default otherNumSlice.reducer;
