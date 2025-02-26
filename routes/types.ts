import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from './module/AuthNavigator';
import {BottomTabParamList} from './module/TabNavigator';

export type SignInProps = NativeStackScreenProps<AuthStackParamList, 'SignIn'>;
export type SignUpProps = NativeStackScreenProps<AuthStackParamList, 'SignUp'>;
export type ForgotPasswordProps = NativeStackScreenProps<
  AuthStackParamList,
  'ForgotPassword'
>;
export type SplashProps = NativeStackScreenProps<AuthStackParamList, 'Splash'>;

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
