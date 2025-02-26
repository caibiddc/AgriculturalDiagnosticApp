import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '@/screens/auth/signin';
import {SignUp} from '@/screens/auth/signup';
import {ForgotPassword} from '@/screens/auth/forgot-password';
import {SplashScreen} from '@/screens/auth/splash-screen';

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  Splash: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => (
  <Stack.Navigator initialRouteName="Splash">
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
  </Stack.Navigator>
);

export default AuthNavigator;
