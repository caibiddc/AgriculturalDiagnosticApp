import SignIn from '@/screens/auth/signin';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import {SignUp} from '@/screens/auth/signup';
import {ForgotPassword} from '@/screens/auth/forgot-password';
import {SplashScreen} from '@/screens/auth/splash-screen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Splash">
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
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen name="Home" component={Home} /> */}
    </Stack.Navigator>
  );
}
