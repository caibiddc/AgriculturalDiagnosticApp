import {configureStore} from '@reduxjs/toolkit';
import authReducer from './modules/authSlice';
import globalReducer from './modules/globalSlice';

// 创建 Redux store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    global: globalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
