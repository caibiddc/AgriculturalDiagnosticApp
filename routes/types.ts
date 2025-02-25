import {NativeStackScreenProps} from '@react-navigation/native-stack';

// 根 Stack 参数类型
export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  Splash: undefined;
  Home: undefined;
};

export type SignInProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;
export type SignUpProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;
export type ForgotPasswordProps = NativeStackScreenProps<
  RootStackParamList,
  'ForgotPassword'
>;
export type SplashProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;
export type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
