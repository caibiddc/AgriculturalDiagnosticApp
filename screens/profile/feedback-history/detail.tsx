import {Text} from '@/components/ui/text';
import {VStack} from '@/components/ui/vstack';
import {FeedbackDetailProps} from '@/routes/types/profile';
import React from 'react';

const FeedbackDetailScreen: React.FC<FeedbackDetailProps> = ({
  route,
  navigation,
}) => {
  const {feedbackId} = route.params;
  return (
    <VStack>
      <Text>反馈详情</Text>
      <Text>{feedbackId}</Text>
    </VStack>
  );
};

export default FeedbackDetailScreen;
