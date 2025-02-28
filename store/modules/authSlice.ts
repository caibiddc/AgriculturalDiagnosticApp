import {localRemove, localSet} from '@/utils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  authRouter: string[];
  authButtons: {[propName: string]: any};
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  authRouter: [],
  authButtons: {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
      localSet('is_authenticated', action.payload);
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localSet('auth_token', action.payload);
    },
    removeToken(state) {
      state.token = null;
      localRemove('auth_token');
    },
    setAuthRouter: (state, action: PayloadAction<string[]>) => {
      state.authRouter = action.payload;
      localSet('auth_router', action.payload);
    },
    removeAuthRouter(state) {
      state.authRouter = [];
      localRemove('auth_router');
    },
    setAuthButtons: (
      state,
      action: PayloadAction<{[propName: string]: any}>,
    ) => {
      state.authButtons = action.payload;
      localSet('auth_buttons', action.payload);
    },
    removeAuthButtons(state) {
      state.authButtons = {};
      localRemove('auth_buttons');
    },
  },
});

// 导出 actions 和 reducer
export const {
  setToken,
  setAuthenticated,
  removeToken,
  setAuthRouter,
  setAuthButtons,
  removeAuthButtons,
  removeAuthRouter,
} = authSlice.actions;
export default authSlice.reducer;
