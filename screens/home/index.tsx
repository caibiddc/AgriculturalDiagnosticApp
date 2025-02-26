import {Heading} from '@/components/ui/heading';
import {SafeAreaView} from '@/components/ui/safe-area-view';
import {HomeScreenProps} from '@/routes/types';
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  return (
    <SafeAreaView>
      <MainLayout>
        <Heading size="2xl">Main</Heading>
      </MainLayout>
    </SafeAreaView>
  );
};

export default HomeScreen;
