import {useAppSelector} from '@/hooks';
import {ForgotPassword} from '@/screens/auth/forgot-password';
import SignIn from '@/screens/auth/signin';
import {SignUp} from '@/screens/auth/signup';
import {SplashScreen} from '@/screens/auth/splash-screen';
import HomeScreen from '@/screens/home'; // 假设你有一个 Home 页面
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList, RootTabParamList} from './types';
import DocumentScreen from '@/screens/document';
import ProfileScreen from '@/screens/profile';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Document" component={DocumentScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default function AppNavigator() {
  // 从 Redux 中获取用户是否已认证的状态
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

  return (
    <Stack.Navigator initialRouteName="Splash">
      {/* 如果已认证，允许访问 Home；否则跳转到登录页面 */}
      {isAuthenticated ? (
        <Stack.Screen
          name="Main"
          component={MainTabNavigator}
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
}
