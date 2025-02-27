import {createSlice, PayloadAction} from '@reduxjs/toolkit';
export interface ThemeConfigProp {
  isDark: boolean;
}

// 定义菜单状态的类型
interface GlobalState {
  themeConfig: ThemeConfigProp;
}

const initialState: GlobalState = {
  themeConfig: {
    isDark: false,
  },
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    // 设置主题配置
    setThemeConfig(state, action: PayloadAction<ThemeConfigProp>) {
      state.themeConfig = action.payload;
    },
  },
});

export const {setThemeConfig} = globalSlice.actions;
export default globalSlice.reducer;
