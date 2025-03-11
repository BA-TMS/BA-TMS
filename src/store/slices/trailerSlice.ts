import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getTrailers,
  addTrailer,
  updateTrailer as apiUpdateTrailer,
} from '@/lib/actions/trailerActions';
import { TrailerData, TrailerFormData } from '@/types/trailerTypes';

interface UpdatedTrailerPayload {
  id: string;
  updatedTrailer: Partial<TrailerData>;
}

interface TrailerState {
  items: TrailerData[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const formatron = function (trailer: TrailerData) {
  return {
    ...trailer,
    createdAt:
      trailer.createdAt instanceof Date
        ? trailer.createdAt.toDateString()
        : null,
    updatedAt:
      trailer.updatedAt instanceof Date
        ? trailer.updatedAt.toDateString()
        : null,
    plateExpiry:
      trailer.plateExpiry instanceof Date
        ? trailer.plateExpiry.toDateString()
        : null,
    inspectionExpiry:
      trailer.inspectionExpiry instanceof Date
        ? trailer.inspectionExpiry.toDateString()
        : null,
  } as unknown as TrailerData;
};

export const fetchTrailers = createAsyncThunk<TrailerData[], string>(
  'trailers/fetchTrailers',
  async (orgName) => {
    const data = await getTrailers(orgName);

    return data.map((trailer: TrailerData) => formatron(trailer));
  }
);

export const createTrailer = createAsyncThunk<TrailerData, TrailerFormData>(
  'trailers/createTrailer',
  async (trailer, { rejectWithValue }) => {
    try {
      const response = await addTrailer({ trailer });

      return formatron(response as TrailerData);
    } catch (error) {
      return rejectWithValue('Failed to create trailer');
    }
  }
);

export const updateTrailer = createAsyncThunk<
  TrailerData,
  UpdatedTrailerPayload
>(
  'trailers/updateTrailer',
  async (
    { id, updatedTrailer }: UpdatedTrailerPayload,
    { rejectWithValue }
  ) => {
    try {
      const response = await apiUpdateTrailer(id, {
        trailer: updatedTrailer as TrailerFormData,
      });

      return formatron(response as TrailerData);
    } catch (error) {
      return rejectWithValue('Failed to update trailer');
    }
  }
);

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
        state.error = action.error.message || 'Failed to fetch trailers';
      })
      .addCase(createTrailer.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(createTrailer.rejected, (state, action) => {
        const message = action.payload;
        state.status = 'failed';
        state.error = message as string;
      })
      .addCase(
        updateTrailer.fulfilled,
        (state, action: PayloadAction<TrailerData>) => {
          const index = state.items.findIndex(
            (trailer) => trailer.id === action.payload.id
          );
          if (index !== -1) {
            state.items[index] = action.payload;
          }
        }
      )
      .addCase(updateTrailer.rejected, (state, action) => {
        const message = action.payload;
        state.status = 'failed';
        state.error = message as string;
      });
  },
});

export default trailerSlice.reducer;
