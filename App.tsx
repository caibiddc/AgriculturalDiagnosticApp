import RequestHttp from '@/api';
import {RequestProvider, useRequest} from '@/components/request';
import {GluestackUIProvider} from '@/components/ui/gluestack-ui-provider';
import {useAppDispatch, useAppSelector} from '@/hooks';
import AppNavigator from '@/routes';
import {store} from '@/store';
import {
  setAuthButtons,
  setAuthenticated,
  setAuthRouter,
  setToken,
} from '@/store/modules/authSlice';
import {localGet} from '@/utils';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {SafeAreaView, useColorScheme} from 'react-native';
import {Provider} from 'react-redux';
import colors from 'tailwindcss/colors';
import './global.css';
import {setThemeConfig, setApiConfig} from './store/modules/globalSlice';

// 从 AsyncStorage 获取初始数据
const loadInitialData = async () => {
  const token = await localGet('auth_token');
  const isAuthenticated = (await localGet('is_authenticated')) || false;
  const authRouter = await localGet('auth_router');
  const authButtons = await localGet('auth_buttons');
  const savedApiConfig = await localGet('api_config');

  const defaultApiConfig = {
    baseURL: '10.114.248.186/api',
    protocol: 'http',
  };

  if (token) {
    return {
      token,
      isAuthenticated,
      authRouter,
      authButtons,
      apiConfig: savedApiConfig || defaultApiConfig,
    };
  } else {
    return {
      token: '',
      isAuthenticated: false,
      authRouter: '',
      authButtons: '',
      apiConfig: defaultApiConfig,
    };
  }
};

function App(): React.JSX.Element {
  const {toast} = useRequest();

  useEffect(() => {
    RequestHttp.initialize(toast);
  }, [toast]);

  return (
    <SafeAreaView className="h-full w-full">
      <AppNavigator />
    </SafeAreaView>
  );
}

const DarkTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.orange[500],
    background: colors.neutral[900],
    card: colors.neutral[800],
    text: colors.neutral[50],
    border: colors.neutral[700],
  },
};

function NavigationWrapper(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const {isDark} = useAppSelector(state => state.global.themeConfig);
  const dispatch = useAppDispatch();

  useEffect(() => {
    loadInitialData().then(
      ({token, authRouter, authButtons, isAuthenticated, apiConfig}) => {
        dispatch(setToken(token));
        dispatch(setAuthenticated(isAuthenticated));
        dispatch(setAuthRouter(authRouter));
        dispatch(setAuthButtons(authButtons));
        dispatch(setThemeConfig({isDark: isDarkMode}));
        dispatch(setApiConfig(apiConfig));
      },
    );
  }, []);

  return (
    <GluestackUIProvider mode={isDark ? 'dark' : 'light'}>
      <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
        <RequestProvider>
          <App />
        </RequestProvider>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}

function AppWrapper(): React.JSX.Element {
  return (
    <Provider store={store}>
      <NavigationWrapper />
    </Provider>
  );
}

export default AppWrapper;
