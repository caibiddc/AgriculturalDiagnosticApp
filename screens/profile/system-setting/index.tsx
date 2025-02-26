import {SystemSettingsProps} from '@/routes/types';
import React from 'react';
import {Text, View} from 'react-native';

const SystemSettingsScreen: React.FC<SystemSettingsProps> = () => {
  return (
    <View>
      <Text>系统设置</Text>
      {/* 此处添加系统设置内容 */}
    </View>
  );
};

export default SystemSettingsScreen;
