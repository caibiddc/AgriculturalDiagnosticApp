import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface GlobalState {
  sidebar: boolean;
}

const initialState: GlobalState = {
  sidebar: false,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setSidebar(state, action: PayloadAction<boolean>) {
      state.sidebar = action.payload;
    },
  },
});

// 导出 actions 和 reducer
export const {setSidebar} = globalSlice.actions;
export default globalSlice.reducer;
