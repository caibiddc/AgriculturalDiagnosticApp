import {Heading} from '@/components/ui/heading';
import {ProfileScreenProps} from '@/routes/types';
import React from 'react';
import {SafeAreaView} from 'react-native';

const ProfileScreen: React.FC<ProfileScreenProps> = () => {
  return (
    <SafeAreaView>
      <Heading>ProfileScreen</Heading>
    </SafeAreaView>
  );
};

export default ProfileScreen;
