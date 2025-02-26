import {MyCollectionProps} from '@/routes/types';
import React from 'react';
import {Text, View} from 'react-native';

const MyCollectionScreen: React.FC<MyCollectionProps> = () => {
  return (
    <View>
      <Text>我的收藏</Text>
      {/* 此处添加收藏内容 */}
    </View>
  );
};

export default MyCollectionScreen;
