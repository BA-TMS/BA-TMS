import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getBrokers,
  // addbroker,
  // updatebroker as apiUpdatebroker,
} from '@/lib/dbActions';
import { BrokerData, BrokerFormData } from '@/types/brokerTypes';

interface UpdatedBrokerPayload {
  id: string;
  updatedbroker: Partial<BrokerData>;
}

interface BrokerState {
  items: BrokerData[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const formatron = function (broker: BrokerData) {
  return {
    ...broker,
    createdAt:
      broker.createdAt instanceof Date ? broker.createdAt.toDateString() : null,
    updatedAt:
      broker.updatedAt instanceof Date ? broker.updatedAt.toDateString() : null,
  } as unknown as BrokerData;
};

export const fetchbrokers = createAsyncThunk<BrokerData[]>(
  'brokers/fetchBrokers',
  async () => {
    const data = await getBrokers();

    return data.map((broker: BrokerData) => formatron(broker));
  }
);

// export const createbroker = createAsyncThunk<brokerData, brokerFormData>(
//   'brokers/createbroker',
//   async (broker, { rejectWithValue }) => {
//     try {
//       const response = await addbroker({ broker });

//       return formatron(response as brokerData);
//     } catch (error) {
//       return rejectWithValue('Failed to create broker');
//     }
//   }
// );

// export const updatebroker = createAsyncThunk<brokerData, UpdatedbrokerPayload>(
//   'brokers/updatebroker',
//   async ({ id, updatedbroker }: UpdatedbrokerPayload, { rejectWithValue }) => {
//     try {
//       const response = await apiUpdatebroker(id, {
//         broker: updatedbroker as brokerFormData,
//       });

//       return formatron(response as brokerData);
//     } catch (error) {
//       return rejectWithValue('Failed to update broker');
//     }
//   }
// );

const brokerSlice = createSlice({
  name: 'brokers',
  initialState: <BrokerState>{
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchbrokers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchbrokers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchbrokers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch brokers';
      });
    // .addCase(createbroker.fulfilled, (state, action) => {
    //   state.items.push(action.payload);
    // })
    // .addCase(createbroker.rejected, (state, action) => {
    //   const message = action.payload;
    //   state.status = 'failed';
    //   state.error = message as string;
    // })
    // .addCase(
    //   updatebroker.fulfilled,
    //   (state, action: PayloadAction<brokerData>) => {
    //     const index = state.items.findIndex(
    //       (broker) => broker.id === action.payload.id
    //     );
    //     if (index !== -1) {
    //       state.items[index] = action.payload;
    //     }
    //   }
    // )
    // .addCase(updatebroker.rejected, (state, action) => {
    //   const message = action.payload;
    //   state.status = 'failed';
    //   state.error = message as string;
    // });
  },
});

export default brokerSlice.reducer;
