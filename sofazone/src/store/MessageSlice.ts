// src/store/MessageSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MessageModel } from '../models/MessageModel';

const initialState: MessageModel = {
  type: null,
  text: '',
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<MessageModel>) => {
      state.type = action.payload.type;
      state.text = action.payload.text;
    },
    clearMessage: (state) => {
      state.type = null;
      state.text = '';
    },
  },
});

export const { setMessage, clearMessage } = messageSlice.actions;
export default messageSlice.reducer;