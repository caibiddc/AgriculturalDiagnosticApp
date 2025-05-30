// AppFeedbackScreen.tsx
import {AppFeedbackProps} from '@/routes/types';
import React from 'react';
import {View, Text} from 'react-native';

const AppFeedbackScreen: React.FC<AppFeedbackProps> = () => {
  return (
    <View>
      <Text>应用反馈</Text>
      {/* 此处添加反馈表单或内容 */}
    </View>
  );
};

export default AppFeedbackScreen;
