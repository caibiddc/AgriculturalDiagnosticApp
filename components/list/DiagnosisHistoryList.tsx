import {DiagnosisHistory} from '@/api/interface';
import {ListItem} from '@rneui/themed';
import React from 'react';
import FilePreviewCard from '../card/FilePreviewCard';
import {Button, ButtonText} from '../ui/button';
import {Heading} from '../ui/heading';
import {Text} from '../ui/text';
import {VStack} from '../ui/vstack';

export type DiagnosisHistoryListProps = {
  diagnosisList?: DiagnosisHistory[];
  onCheckDetail?: (diagnosis: DiagnosisHistory) => void;
};

const DiagnosisHistoryList: React.FC<DiagnosisHistoryListProps> = ({
  diagnosisList = [],
  onCheckDetail,
}) => {
  return (
    <VStack className="mx-6 mt-6" space="md">
      <Heading>诊断历史</Heading>
      <VStack className="w-full" space="md">
        {diagnosisList.map(diagnosis => (
          <ListItem.Swipeable
            key={diagnosis.id}
            rightContent={
              <Button
                className="h-full"
                action="secondary"
                onPress={() => onCheckDetail?.(diagnosis)}>
                <ButtonText>查看</ButtonText>
              </Button>
            }>
            <FilePreviewCard file={diagnosis?.file} />
            <ListItem.Content>
              <VStack>
                <Text>{diagnosis?.status}</Text>
                <Text>{diagnosis?.file?.originalFileName}</Text>
                <Text>{diagnosis?.createdAt}</Text>
              </VStack>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem.Swipeable>
        ))}
      </VStack>
      <Button>
        <ButtonText>查看全部记录</ButtonText>
      </Button>
    </VStack>
  );
};

export default DiagnosisHistoryList;
