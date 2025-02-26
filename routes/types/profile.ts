import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ProfileParamList} from '../module/ProfileNavigator';

export type ProfileScreenProps = NativeStackScreenProps<
  ProfileParamList,
  'ProfileMain'
>;
export type DiagnosisHistoryProps = NativeStackScreenProps<
  ProfileParamList,
  'DiagnosisHistory'
>;
export type ReportHistoryProps = NativeStackScreenProps<
  ProfileParamList,
  'ReportHistory'
>;
export type MyCollectionProps = NativeStackScreenProps<
  ProfileParamList,
  'MyCollection'
>;
export type MyOrdersProps = NativeStackScreenProps<
  ProfileParamList,
  'MyOrders'
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
  ProfileParamList,
  'CreatePassword'
>;
export type AppFeedbackProps = NativeStackScreenProps<
  ProfileParamList,
  'AppFeedback'
>;
