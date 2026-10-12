import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../module/AuthNavigator';
import {ProfileParamList} from '../module/ProfileNavigator';
import {BottomTabParamList} from '../module/TabNavigator';

export type SignInProps = NativeStackScreenProps<AuthStackParamList, 'SignIn'>;
export type SignUpProps = NativeStackScreenProps<AuthStackParamList, 'SignUp'>;
export type ForgotPasswordProps = NativeStackScreenProps<
  AuthStackParamList,
  'ForgotPassword'
>;
export type SplashProps = NativeStackScreenProps<AuthStackParamList, 'Splash'>;
