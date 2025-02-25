import {removeNavigation, setNavigation} from '@/api';
import {GluestackUIProvider} from '@/components/ui/gluestack-ui-provider';
import {useAppDispatch} from '@/hooks';
import AppNavigator from '@/routes';
import {RootStackParamList} from '@/routes/types';
import {
  setAuthButtons,
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
import {bottomTabsList} from './screens/layout/config';
import DashboardLayout from './screens/layout/DashboardLayout';
import MobileFooter from './screens/layout/MobileFooter';
import {store} from './store';

// 从 AsyncStorage 获取初始数据
const loadInitialData = async () => {
  const token = await localGet('auth_token');
  const authRouter = await localGet('auth_router');
  const authButtons = await localGet('auth_buttons');
  return {token, authRouter, authButtons};
};

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const navigationRef =
    React.useRef<NavigationContainerRef<RootStackParamList>>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    loadInitialData().then(({token, authRouter, authButtons}) => {
      // 初始化 store
      dispatch(setToken(token));
      dispatch(setAuthRouter(authRouter));
      dispatch(setAuthButtons(authButtons));
    });
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
        <SafeAreaView className="h-full w-full">
          <DashboardLayout title="Company Name" isSidebarVisible={true}>
            <AppNavigator />
          </DashboardLayout>
          <MobileFooter footerIcons={bottomTabsList} />
        </SafeAreaView>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}

function AppWrapper(): React.JSX.Element {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default AppWrapper;
