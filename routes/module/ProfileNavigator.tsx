import ProfileScreen from '@/screens/profile';
import AppFeedbackScreen from '@/screens/profile/app-feedback';
import DiagnosisHistoryScreen from '@/screens/profile/diagnosis-history';
import MyCollectionScreen from '@/screens/profile/my-collection';
import ReportHistoryScreen from '@/screens/profile/report-history';
import SystemSettingsScreen from '@/screens/profile/system-setting';
import UserAgreementScreen from '@/screens/profile/user-agreement';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export type ProfileParamList = {
  ProfileMain: undefined;
  DiagnosisHistory: undefined;
  ReportHistory: undefined;
  MyCollection: undefined;
  MyOrders: undefined;
  SystemSettings: undefined;
  UserAgreement: undefined;
  AppFeedback: undefined;
};

const Stack = createNativeStackNavigator<ProfileParamList>();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="ProfileMain">
      <Stack.Screen
        name="ProfileMain"
        component={ProfileScreen}
        options={{title: '个人信息'}}
      />
      <Stack.Screen
        name="DiagnosisHistory"
        component={DiagnosisHistoryScreen}
        options={{title: '诊断历史'}}
      />
      <Stack.Screen
        name="ReportHistory"
        component={ReportHistoryScreen}
        options={{title: '上报历史'}}
      />
      <Stack.Screen
        name="MyCollection"
        component={MyCollectionScreen}
        options={{title: '我的收藏'}}
      />
      <Stack.Screen
        name="SystemSettings"
        component={SystemSettingsScreen}
        options={{title: '系统设置'}}
      />
      <Stack.Screen
        name="UserAgreement"
        component={UserAgreementScreen}
        options={{title: '用户协议及服务条款'}}
      />
      <Stack.Screen
        name="AppFeedback"
        component={AppFeedbackScreen}
        options={{title: '应用反馈'}}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
