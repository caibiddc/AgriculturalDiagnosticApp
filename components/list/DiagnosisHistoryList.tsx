import {DiagnosisHistory} from '@/api/interface';
import {DIAGNOSIS_STATUS_COLOR, DiagnosisStatusMapper} from '@/constants';
import {ListItem} from '@rneui/themed';
import clsx from 'clsx';
import React from 'react';
import {GestureResponderEvent} from 'react-native';
import FilePreviewCard from '../card/FilePreviewCard';
import {Button, ButtonText} from '../ui/button';
import {Heading} from '../ui/heading';
import {Text} from '../ui/text';
import {VStack} from '../ui/vstack';

export type DiagnosisHistoryListProps = {
  diagnosisList?: DiagnosisHistory[];
  onCheckDetail?: (diagnosis: DiagnosisHistory) => void;
  onCheckAll?: (event?: GestureResponderEvent) => void;
};

const DiagnosisHistoryList: React.FC<DiagnosisHistoryListProps> = ({
  diagnosisList = [],
  onCheckDetail,
  onCheckAll,
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
            <FilePreviewCard fileId={diagnosis?.fileId} />
            <ListItem.Content>
              <VStack>
                <Text
                  className={clsx(
                    'rounded-full',
                    'px-2',
                    'py-1',
                    DIAGNOSIS_STATUS_COLOR[
                      diagnosis?.status as keyof typeof DIAGNOSIS_STATUS_COLOR
                    ],
                  )}>
                  {
                    DiagnosisStatusMapper[
                      (diagnosis?.status as keyof typeof DiagnosisStatusMapper) ||
                        'pending'
                    ]
                  }
                </Text>
                <Text>{diagnosis?.createdAt}</Text>
              </VStack>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem.Swipeable>
        ))}
      </VStack>
      <Button action="secondary" onPress={onCheckAll}>
        <ButtonText>查看全部记录</ButtonText>
      </Button>
    </VStack>
  );
};

export default DiagnosisHistoryList;
