import {AuthStackParamList} from '../module/AuthNavigator';
import {ProfileParamList} from '../module/ProfileNavigator';
import {BottomTabParamList} from '../module/TabNavigator';
import {NavigatorScreenParams} from '@react-navigation/native';

export * from './auth';
export * from './encyclopedia';
export * from './home';
export * from './profile';

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<BottomTabParamList>;
  DiseaseDetail: {diseaseId: number};
};
