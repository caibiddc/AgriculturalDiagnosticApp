import {removeNavigation, setNavigation} from '@/api';
import MobileFooter from '@/components/layout/footer/MobileFooter';
import {GluestackUIProvider} from '@/components/ui/gluestack-ui-provider';
import {useAppDispatch, useAppSelector} from '@/hooks';
import AppNavigator from '@/routes';
import {RootStackParamList} from '@/routes/types';
import {
  setAuthButtons,
  setAuthenticated,
  setAuthRouter,
  setToken,
} from '@/store/modules/authSlice';
import {localGet} from '@/utils';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {SafeAreaView, useColorScheme} from 'react-native';
import {Provider} from 'react-redux';
import './global.css';
import {store} from './store';

// 从 AsyncStorage 获取初始数据
const loadInitialData = async () => {
  const token = await localGet('auth_token');
  const isAuthenticated = (await localGet('is_authenticated')) || false;
  const authRouter = await localGet('auth_router');
  const authButtons = await localGet('auth_buttons');
  return {token, authRouter, authButtons, isAuthenticated};
};

function App(): React.JSX.Element {
  const {isAuthenticated} = useAppSelector(state => state.auth);
  return (
    <SafeAreaView className="h-full w-full">
      <AppNavigator />
      {isAuthenticated && <MobileFooter />}
    </SafeAreaView>
  );
}

function NavigationWrapper(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const navigationRef =
    React.useRef<NavigationContainerRef<RootStackParamList>>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    loadInitialData().then(
      ({token, authRouter, authButtons, isAuthenticated}) => {
        dispatch(setToken(token));
        dispatch(setAuthenticated(isAuthenticated));
        dispatch(setAuthRouter(authRouter));
        dispatch(setAuthButtons(authButtons));
      },
    );
    if (navigationRef.current) {
      setNavigation(navigationRef.current);
    }

    return () => {
      removeNavigation();
    };
  }, []);
  return (
    <GluestackUIProvider mode={isDarkMode ? 'dark' : 'light'}>
      <NavigationContainer ref={navigationRef}>
        <App />
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
