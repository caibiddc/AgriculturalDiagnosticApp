import {Heading} from '@/components/ui/heading';
import {DocumentScreenProps} from '@/routes/types';
import React from 'react';
import {SafeAreaView} from 'react-native';
import DashboardLayout from '@/components/layout/DashboardLayout';

const DocumentScreen: React.FC<DocumentScreenProps> = () => {
  return (
    <SafeAreaView>
      <DashboardLayout title="病害百科">
        <Heading>Document</Heading>
      </DashboardLayout>
    </SafeAreaView>
  );
};

export default DocumentScreen;
