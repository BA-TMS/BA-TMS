import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { signUpUser } from '@/app/(authenticated)/settings/actions';
import { TeamMember } from '@/types/teamTypes';
import { getTeam } from '@/app/(authenticated)/settings/actions';
import { Status, UserRole } from '@prisma/client';

interface TeamState {
  items: TeamMember[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const roleMap = {
  DISPATCHER: 'Dispatcher',
  SALES_REP: 'Sales Rep',
  ADMIN: 'Admin',
  OWNER: 'Owner',
};

const statusMap = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
};

const formatron = function (user: TeamMember) {
  return {
    ...user,
    createdAt:
      user.createdAt instanceof Date ? user.createdAt.toDateString() : null,
    updatedAt:
      user.updatedAt instanceof Date ? user.updatedAt.toDateString() : null,
    // add role and status
    role: roleMap[user.Permissions?.role as UserRole],
    status: statusMap[user.Permissions?.status as Status],
  } as unknown as TeamMember;
};

// fetch all users for a specific organization
export const fetchTeam = createAsyncThunk<TeamMember[], string>(
  'team/fetchTeam',
  async (orgName) => {
    const data = await getTeam(orgName);
    return data.map((team: TeamMember) => formatron(team));
  }
);

// add a new user to the organization
// do we need this function since the add happens on a different page?
export const addUser = createAsyncThunk<any, any>(
  'team/addUser',
  async (user, { rejectWithValue }) => {
    try {
      const response = await signUpUser(); // what do we pass in?

      return formatron(response as TeamMember);
    } catch (error) {
      return rejectWithValue('Failed to create team member');
    }
  }
);

// update a user
// do we need this one
export const updateUser = createAsyncThunk<any, any>(
  'team/updateUser',
  async (
    { id, updatedCarrier }: UpdatedCarrierPayload,
    { rejectWithValue }
  ) => {
    try {
      const response = await apiUpdatecarrier(id, {
        carrier: updatedCarrier as TeamMember,
      });

      return formatron(response as TeamMember);
    } catch (error) {
      return rejectWithValue('Failed to update carrier');
    }
  }
);

const teamSlice = createSlice({
  name: 'team',
  initialState: <TeamState>{
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setError: (state, action) => {
      state.error = action.payload; // update the error state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeam.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchTeam.fulfilled,
        (state, action: PayloadAction<TeamMember[]>) => {
          state.status = 'succeeded';
          state.items = action.payload;
        }
      )
      .addCase(fetchTeam.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch team';
      })
      //   .addCase(addUser.fulfilled, (state, action) => {
      //     state.items.push(action.payload);
      //   })
      //   .addCase(addUser.rejected, (state, action) => {
      //     const message = action.payload;
      //     state.status = 'failed';
      //     state.error = message as string;
      //   });
      .addCase(
        updateUser.fulfilled,
        (state, action: PayloadAction<TeamMember>) => {
          const index = state.items.findIndex(
            (user) => user.id === action.payload.id
          );
          if (index !== -1) {
            state.items[index] = action.payload;
          }
        }
      )
      .addCase(updateUser.rejected, (state, action) => {
        const message = action.payload;
        state.status = 'failed';
        state.error = message as string;
      });
  },
});

export const { setError } = teamSlice.actions;
export default teamSlice.reducer;
