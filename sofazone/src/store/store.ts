// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';
import userReducer from './UserSlice';
import messageReducer from './MessageSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    message: messageReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;