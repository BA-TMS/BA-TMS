import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { FormattedTeamMember, TeamMember } from '@/types/teamTypes';
import { getTeam, updateUser } from '@/app/(authenticated)/settings/actions';
import { Status, UserRole } from '@prisma/client';

interface TeamState {
  items: TeamMember[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

interface Payload {
  id: string;
  updatedUser: {
    'First Name': string;
    'Last Name': string;
    Telephone?: string | null;
    Email: string;
    Role: string;
    Status: string;
  };
}

const roleMap = {
  DISPATCHER: 'Dispatcher',
  SALES_REP: 'Sales Rep',
  ADMIN: 'Admin',
  OWNER: 'Owner',
  USER: 'User',
  DEVELOPER: 'Developer',
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
    name: `${user.firstName} ${user.lastName}`, // in case we need to search full name
    // add role and status to get them out of nested object
    role: roleMap[user.Permissions?.role as UserRole],
    status: statusMap[user.Permissions?.status as Status],
  } as unknown as FormattedTeamMember;
};

// fetch all users for a specific organization
export const fetchTeam = createAsyncThunk<TeamMember[], string>(
  'team/fetchTeam',
  async (orgName) => {
    const data = await getTeam(orgName);
    return data.map((team: TeamMember) => formatron(team));
  }
);

// update a user
export const updateTeamMember = createAsyncThunk<FormattedTeamMember, Payload>(
  'team/updateUser',
  async ({ id, updatedUser }: Payload, { rejectWithValue }) => {
    try {
      const response = await updateUser(updatedUser, id);

      return formatron(response as FormattedTeamMember);
    } catch (error) {
      return rejectWithValue('Failed to update team member');
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
        updateTeamMember.fulfilled,
        (state, action: PayloadAction<TeamMember>) => {
          const index = state.items.findIndex(
            (user) => user.id === action.payload.id
          );
          if (index !== -1) {
            state.items[index] = action.payload;
          }
        }
      )
      .addCase(updateTeamMember.rejected, (state, action) => {
        const message = action.payload;
        state.status = 'failed';
        state.error = message as string;
      });
  },
});

export const { setError } = teamSlice.actions;
export default teamSlice.reducer;
