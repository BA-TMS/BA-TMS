import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getShippers,
  // addshipperingCo,
  // updateshipper as apiUpdateshipper,
} from '@/lib/actions/shipperActions';
import { ShipperData } from '@/types/shipperTypes';

// interface UpdatedShipperPayload {
//   id: string;
//   updatedshipper: Partial<ShipperData>;
// }

interface ShipperState {
  items: ShipperData[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const formatron = function (shipper: ShipperData) {
  return {
    ...shipper,
    createdAt:
      shipper.createdAt instanceof Date
        ? shipper.createdAt.toDateString()
        : null,
    updatedAt:
      shipper.updatedAt instanceof Date
        ? shipper.updatedAt.toDateString()
        : null,
    consignee: shipper.consignee ? shipper.consignee.name : null,
  } as unknown as ShipperData;
};

export const fetchShippers = createAsyncThunk<ShipperData[], string>(
  'shippers/fetchShippers',
  async (orgName) => {
    const data = await getShippers(orgName);
    console.log(data);

    return data.map((shipper: ShipperData) => formatron(shipper));
  }
);

// export const createshipper = createAsyncThunk<ShipperData, shipperFormData>(
//   'shippers/createshipper',
//   async (shipper, { rejectWithValue }) => {
//     try {
//       const response = await addshipperingCo({ shipper });

//       return formatron(response as ShipperData);
//     } catch (error) {
//       return rejectWithValue('Failed to create shippering company');
//     }
//   }
// );

// export const updateshipper = createAsyncThunk<ShipperData, UpdatedShipperPayload>(
//   'shippers/updateshipper',
//   async ({ id, updatedshipper }: UpdatedShipperPayload, { rejectWithValue }) => {
//     try {
//       const response = await apiUpdateshipper(id, {
//         shipper: updatedshipper as shipperFormData,
//       });

//       return formatron(response as ShipperData);
//     } catch (error) {
//       return rejectWithValue('Failed to update shipper');
//     }
//   }
// );

const shipperSlice = createSlice({
  name: 'shippers',
  initialState: <ShipperState>{
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShippers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchShippers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchShippers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch shippers';
      });
    //   .addCase(createshipper.fulfilled, (state, action) => {
    //     state.items.push(action.payload);
    //   })
    //   .addCase(createshipper.rejected, (state, action) => {
    //     const message = action.payload;
    //     state.status = 'failed';
    //     state.error = message as string;
    //   })
    //   .addCase(
    //     updateshipper.fulfilled,
    //     (state, action: PayloadAction<ShipperData>) => {
    //       const index = state.items.findIndex(
    //         (shipper) => shipper.id === action.payload.id
    //       );
    //       if (index !== -1) {
    //         state.items[index] = action.payload;
    //       }
    //     }
    //   )
    //   .addCase(updateshipper.rejected, (state, action) => {
    //     const message = action.payload;
    //     state.status = 'failed';
    //     state.error = message as string;
    //   });
  },
});

export default shipperSlice.reducer;
