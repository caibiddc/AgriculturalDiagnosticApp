import {AuthStackParamList} from '../module/AuthNavigator';
import {ProfileParamList} from '../module/ProfileNavigator';
import {BottomTabParamList} from '../module/TabNavigator';

export * from './auth';
export * from './document';
export * from './home';
export * from './profile';

export type RootStackParamList = AuthStackParamList &
  ProfileParamList &
  BottomTabParamList;
