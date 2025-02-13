import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getShippers,
  addShipper,
  updateShipper as apiUpdateShipper,
} from '@/lib/actions/shipperActions';
import { ShipperData, ShipperFormData } from '@/types/shipperTypes';

interface UpdatedShipperPayload {
  id: string;
  updatedShipper: Partial<ShipperData>;
}

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

    return data.map((shipper: ShipperData) => formatron(shipper));
  }
);

export const createShipper = createAsyncThunk<ShipperData, ShipperFormData>(
  'shippers/createShipper',
  async (shipper, { rejectWithValue }) => {
    try {
      const response = await addShipper({ shipper });

      return formatron(response as ShipperData);
    } catch (error) {
      return rejectWithValue('Failed to create shipper');
    }
  }
);

export const updateShipper = createAsyncThunk<
  ShipperData,
  UpdatedShipperPayload
>(
  'shippers/updateShipper',
  async (
    { id, updatedShipper }: UpdatedShipperPayload,
    { rejectWithValue }
  ) => {
    try {
      const response = await apiUpdateShipper(id, {
        shipper: updatedShipper as ShipperFormData,
      });

      return formatron(response as ShipperData);
    } catch (error) {
      return rejectWithValue('Failed to update shipper');
    }
  }
);

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
      })
      .addCase(createShipper.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(createShipper.rejected, (state, action) => {
        const message = action.payload;
        state.status = 'failed';
        state.error = message as string;
      })
      .addCase(
        updateShipper.fulfilled,
        (state, action: PayloadAction<ShipperData>) => {
          const index = state.items.findIndex(
            (shipper) => shipper.id === action.payload.id
          );
          if (index !== -1) {
            state.items[index] = action.payload;
          }
        }
      )
      .addCase(updateShipper.rejected, (state, action) => {
        const message = action.payload;
        state.status = 'failed';
        state.error = message as string;
      });
  },
});

export default shipperSlice.reducer;
