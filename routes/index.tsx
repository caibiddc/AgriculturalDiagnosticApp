import {useAppSelector} from '@/hooks';
import {ForgotPassword} from '@/screens/auth/forgot-password';
import SignIn from '@/screens/auth/signin';
import {SignUp} from '@/screens/auth/signup';
import {SplashScreen} from '@/screens/auth/splash-screen';
import HomeScreen from '@/screens/home'; // 假设你有一个 Home 页面
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  // 从 Redux 中获取用户是否已认证的状态
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

  return (
    <Stack.Navigator initialRouteName="Splash">
      {/* 如果已认证，允许访问 Home；否则跳转到登录页面 */}
      {isAuthenticated ? (
        <Stack.Screen
          name="Home"
          component={HomeScreen}
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
