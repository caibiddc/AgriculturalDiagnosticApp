import {UserAgreementProps} from '@/routes/types';
import React from 'react';
import {Text, View} from 'react-native';

const UserAgreementScreen: React.FC<UserAgreementProps> = () => {
  return (
    <View>
      <Text>用户协议及服务条款</Text>
      {/* 此处添加用户协议内容 */}
    </View>
  );
};

export default UserAgreementScreen;
