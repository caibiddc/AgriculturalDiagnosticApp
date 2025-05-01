import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ProfileParamList} from '../module/ProfileNavigator';
import {RootStackParamList} from '../module/RootNavigator';

export type ProfileScreenProps = NativeStackScreenProps<
  ProfileParamList & {CreatePassword: undefined},
  'ProfileMain'
>;
export type DiagnosisHistoryProps = NativeStackScreenProps<
  ProfileParamList,
  'DiagnosisHistory'
>;
export type DiagnosisDetailProps = NativeStackScreenProps<
  ProfileParamList,
  'DiagnosisDetail'
>;
export type FeedbackHistoryProps = NativeStackScreenProps<
  ProfileParamList,
  'ReportHistory'
>;
export type SystemSettingsProps = NativeStackScreenProps<
  ProfileParamList,
  'SystemSettings'
>;
export type UserAgreementProps = NativeStackScreenProps<
  ProfileParamList,
  'UserAgreement'
>;
export type CreatePasswordProps = NativeStackScreenProps<
  RootStackParamList,
  'CreatePassword'
>;
export type AppFeedbackProps = NativeStackScreenProps<
  ProfileParamList,
  'AppFeedback'
>;
