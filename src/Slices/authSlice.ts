import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean
}

const initialState: AuthState = { 
  isLoggedIn: false 
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    }
  },
});

export const { login, logout } = authSlice.actions;
export const selectAuth = (state: any) => state.auth;
export default authSlice.reducer;