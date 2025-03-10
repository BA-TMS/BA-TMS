import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getTrailers,
  addTruck,
  updateTruck as apiUpdateTruck,
} from '@/lib/actions/trailerActions';
import { TrailerData, TrailerFormData } from '@/types/trailerTypes';

interface UpdatedTrailerPayload {
  id: string;
  updatedTruck: Partial<TrailerData>;
}

interface TrailerState {
  items: TrailerData[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const formatron = function (truck: TrailerData) {
  return {
    ...truck,
    createdAt:
      truck.createdAt instanceof Date ? truck.createdAt.toDateString() : null,
    updatedAt:
      truck.updatedAt instanceof Date ? truck.updatedAt.toDateString() : null,
    plateExpiry:
      truck.plateExpiry instanceof Date
        ? truck.plateExpiry.toDateString()
        : null,
    inspectionExpiry:
      truck.inspectionExpiry instanceof Date
        ? truck.inspectionExpiry.toDateString()
        : null,
    startDate:
      truck.startDate instanceof Date ? truck.startDate.toDateString() : null,
    deactivationDate:
      truck.deactivationDate instanceof Date
        ? truck.deactivationDate.toDateString()
        : null,
    dotExpiry:
      truck.dotExpiry instanceof Date ? truck.dotExpiry.toDateString() : null,
  } as unknown as TrailerData;
};

export const fetchTrailers = createAsyncThunk<TrailerData[], string>(
  'trailers/fetchTrailers',
  async (orgName) => {
    const data = await getTrailers(orgName);

    return data.map((trailer: TrailerData) => formatron(trailer));
  }
);

// export const createTruck = createAsyncThunk<TrailerData, TrailerFormData>(
//   'trucks/createTruck',
//   async (truck, { rejectWithValue }) => {
//     try {
//       const response = await addTruck({ truck });

//       return formatron(response as TrailerData);
//     } catch (error) {
//       return rejectWithValue('Failed to create truck');
//     }
//   }
// );

// export const updateTruck = createAsyncThunk<TrailerData, UpdatedTrailerPayload>(
//   'trucks/updateTruck',
//   async ({ id, updatedTruck }: UpdatedTrailerPayload, { rejectWithValue }) => {
//     try {
//       const response = await apiUpdateTruck(id, {
//         truck: updatedTruck as TrailerFormData,
//       });

//       return formatron(response as TrailerData);
//     } catch (error) {
//       return rejectWithValue('Failed to update truck');
//     }
//   }
// );

const trailerSlice = createSlice({
  name: 'trailers',
  initialState: <TrailerState>{
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrailers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTrailers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTrailers.rejected, (state, action) => {
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
    //     (state, action: PayloadAction<TrailerData>) => {
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

export default trailerSlice.reducer;
