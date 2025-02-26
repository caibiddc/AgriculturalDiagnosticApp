import {useAppSelector} from '@/hooks';
import {ForgotPassword} from '@/screens/auth/forgot-password';
import SignIn from '@/screens/auth/signin';
import {SignUp} from '@/screens/auth/signup';
import {SplashScreen} from '@/screens/auth/splash-screen';
import DocumentScreen from '@/screens/document';
import HomeScreen from '@/screens/home';
import ProfileScreen from '@/screens/profile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BottomTabParamList, RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<BottomTabParamList>();

const TabNavigator = () => (
  <Tab.Navigator initialRouteName="Home">
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{title: '首页', headerShown: false}}
    />
    <Tab.Screen
      name="Document"
      component={DocumentScreen}
      options={{title: '病害百科', headerShown: false}}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{title: '个人信息', headerShown: false}}
    />
  </Tab.Navigator>
);

const MainStackNavigator = () => {
  // 从 Redux 中获取用户是否已认证的状态
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

  return (
    <Stack.Navigator initialRouteName={isAuthenticated ? 'Main' : 'Splash'}>
      {/* 如果已认证，允许访问 Home；否则跳转到登录页面 */}
      {isAuthenticated ? (
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{headerShown: false}}
        />
      ) : (
        <>
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{headerShown: false}}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default function AppNavigator() {
  return <MainStackNavigator />;
}
