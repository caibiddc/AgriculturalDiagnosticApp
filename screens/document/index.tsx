import {Heading} from '@/components/ui/heading';
import {DocumentScreenProps} from '@/routes/types';
import React from 'react';
import {SafeAreaView} from 'react-native';

const DocumentScreen: React.FC<DocumentScreenProps> = () => {
  return (
    <SafeAreaView>
      <Heading>DocumentScreen</Heading>
    </SafeAreaView>
  );
};

export default DocumentScreen;
