import {Heading} from '@/components/ui/heading';
import {SafeAreaView} from '@/components/ui/safe-area-view';
import {HomeScreenProps} from '@/routes/types';
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  return (
    <SafeAreaView>
      <DashboardLayout title="首页">
        <Heading size="2xl">Main</Heading>
      </DashboardLayout>
    </SafeAreaView>
  );
};

export default HomeScreen;
