import {MyOrdersProps} from '@/routes/types';
import React from 'react';
import {View, Text} from 'react-native';

const MyOrdersScreen: React.FC<MyOrdersProps> = () => {
  return (
    <View>
      <Text>我的订单</Text>
      {/* 此处添加订单列表或其他内容 */}
    </View>
  );
};

export default MyOrdersScreen;
