import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getOtherNums } from '@/lib/actions/otherNumActions';
import { NumData, NumFormData } from '@/types/otherNumTypes';

interface UpdatedNumPayload {
  id: string;
  updatedTruck: Partial<NumData>;
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

// export const createTruck = createAsyncThunk<NumData, TruckFormData>(
//   'trucks/createTruck',
//   async (truck, { rejectWithValue }) => {
//     try {
//       const response = await addTruck({ truck });

//       return formatron(response as NumData);
//     } catch (error) {
//       return rejectWithValue('Failed to create truck');
//     }
//   }
// );

// export const updateTruck = createAsyncThunk<NumData, UpdatedTruckPayload>(
//   'trucks/updateTruck',
//   async ({ id, updatedTruck }: UpdatedTruckPayload, { rejectWithValue }) => {
//     try {
//       const response = await apiUpdateTruck(id, {
//         truck: updatedTruck as TruckFormData,
//       });

//       return formatron(response as NumData);
//     } catch (error) {
//       return rejectWithValue('Failed to update truck');
//     }
//   }
// );

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
      });
    //   .addCase(createTruck.fulfilled, (state, action) => {
    //     state.items.push(action.payload);
    //   })
    //   .addCase(createTruck.rejected, (state, action) => {
    //     const message = action.payload;
    //     state.status = 'failed';
    //     state.error = message as string;
    //   })
    //   .addCase(
    //     updateTruck.fulfilled,
    //     (state, action: PayloadAction<NumData>) => {
    //       const index = state.items.findIndex(
    //         (truck) => truck.id === action.payload.id
    //       );
    //       if (index !== -1) {
    //         state.items[index] = action.payload;
    //       }
    //     }
    //   )
    //   .addCase(updateTruck.rejected, (state, action) => {
    //     const message = action.payload;
    //     state.status = 'failed';
    //     state.error = message as string;
    //   });
  },
});

export default otherNumSlice.reducer;
