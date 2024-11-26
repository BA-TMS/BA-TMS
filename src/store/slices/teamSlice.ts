import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
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

// Define Async Thunks
export const fetchTeam = createAsyncThunk<TeamMember[], string>(
  'team/fetchTeam',
  async (orgName) => {
    const data = await getTeam(orgName);
    return data.map((team: TeamMember) => formatron(team));
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
      });
  },
});

export const { setError } = teamSlice.actions;
export default teamSlice.reducer;
