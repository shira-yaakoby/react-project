
// src/store/UserSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserModel } from '../models/UserModel';

interface UserState {
  user: null |UserModel
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