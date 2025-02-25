import SignIn from '@/screens/auth/signin';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen name="SignUp" component={SignUpScreen} /> */}
      {/* <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} /> */}
      {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
    </Stack.Navigator>
  );
}
