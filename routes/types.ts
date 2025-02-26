import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

// 根 Stack 参数类型
export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  Splash: undefined;
  Main: undefined;
};

// 底部 Tab 参数类型
export type BottomTabParamList = {
  Home: undefined;
  Document: undefined;
  Profile: undefined;
};

// Stack 组件参数
export type SignInProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;
export type SignUpProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;
export type ForgotPasswordProps = NativeStackScreenProps<
  RootStackParamList,
  'ForgotPassword'
>;
export type SplashProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;

// Tab 组件参数
export type HomeScreenProps = BottomTabScreenProps<BottomTabParamList, 'Home'>;
export type DocumentScreenProps = BottomTabScreenProps<
  BottomTabParamList,
  'Document'
>;
export type ProfileScreenProps = BottomTabScreenProps<
  BottomTabParamList,
  'Profile'
>;
