
// src/store/UserSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  user: null | {
    id: number;
    name: string;
    email: string;
    isAdmin: boolean;
  };
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<UserState['user']>) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;