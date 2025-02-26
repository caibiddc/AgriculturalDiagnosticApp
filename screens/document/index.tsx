import {Heading} from '@/components/ui/heading';
import {DocumentScreenProps} from '@/routes/types';
import React from 'react';
import {SafeAreaView} from 'react-native';
import MainLayout from '@/components/layout/MainLayout';

const DocumentScreen: React.FC<DocumentScreenProps> = () => {
  return (
    <SafeAreaView>
      <MainLayout>
        <Heading>Document</Heading>
      </MainLayout>
    </SafeAreaView>
  );
};

export default DocumentScreen;
