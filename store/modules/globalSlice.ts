import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {localGet, localSet} from '@/utils';

export interface ThemeConfigProp {
  isDark: boolean;
}

export interface ApiConfigProp {
  baseURL: string;
  protocol: 'http' | 'https';
}

// 定义菜单状态的类型
interface GlobalState {
  themeConfig: ThemeConfigProp;
  apiConfig: ApiConfigProp;
}

const initialState: GlobalState = {
  themeConfig: {
    isDark: false,
  },
  apiConfig: {
    baseURL: '10.114.248.186/api',
    protocol: 'http',
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
    // 设置API配置
    setApiConfig(state, action: PayloadAction<ApiConfigProp>) {
      state.apiConfig = action.payload;
      localSet('api_config', action.payload);
    },
  },
});

export const {setThemeConfig, setApiConfig} = globalSlice.actions;
export default globalSlice.reducer;
