// DiagnosisHistoryScreen.tsx
import {DiagnosisHistoryProps} from '@/routes/types';
import React from 'react';
import {View, Text} from 'react-native';

const DiagnosisHistoryScreen: React.FC<DiagnosisHistoryProps> = () => {
  return (
    <View>
      <Text>诊断历史</Text>
      {/* 此处添加诊断历史列表或其他内容 */}
    </View>
  );
};

export default DiagnosisHistoryScreen;
