import {Heading} from '@/components/ui/heading';
import {SafeAreaView} from '@/components/ui/safe-area-view';
import {HomeScreenProps} from '@/routes/types';
import React from 'react';

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  return (
    <SafeAreaView>
      <Heading size="2xl">Main</Heading>
    </SafeAreaView>
  );
};

export default HomeScreen;
