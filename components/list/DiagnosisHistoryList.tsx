import {DiagnosisHistory} from '@/api/interface';
import {DIAGNOSIS_STATUS_COLOR} from '@/constants';
import {DIAGNOSIS_STATUS_TEXT} from '@/constants/status';
import clsx from 'clsx';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';
import {ChevronRight, Clock, History} from 'lucide-react-native';
import React from 'react';
import {GestureResponderEvent} from 'react-native';
import FilePreviewCard from '../card/FilePreviewCard';
import {Button, ButtonText} from '../ui/button';
import {Heading} from '../ui/heading';
import {HStack} from '../ui/hstack';
import {Icon} from '../ui/icon';
import {Pressable} from '../ui/pressable';
import {Text} from '../ui/text';
import {VStack} from '../ui/vstack';

// 配置 dayjs
dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

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
    <VStack className="mx-6 mt-6" space="lg">
      <HStack className="items-center justify-between">
        <HStack space="sm" className="items-center">
          <Icon as={History} size="xl" className="text-primary-500" />
          <Heading size="xl" className="text-typography-900">
            诊断历史
          </Heading>
        </HStack>
        <Button
          variant="outline"
          size="sm"
          onPress={onCheckAll}
          className="px-3 py-1.5">
          <ButtonText className="text-primary-500 font-medium">
            查看全部
          </ButtonText>
          <Icon as={ChevronRight} size="sm" className="text-primary-500 ml-1" />
        </Button>
      </HStack>

      <VStack className="w-full" space="md">
        {diagnosisList.length === 0 ? (
          <VStack
            className="items-center justify-center py-12 bg-background-50 rounded-2xl"
            space="md">
            <Icon as={Clock} size="xl" className="text-typography-400" />
            <Text className="text-typography-500 text-base">暂无诊断记录</Text>
          </VStack>
        ) : (
          diagnosisList.map(diagnosis => (
            <Pressable
              key={diagnosis.id}
              onPress={() => onCheckDetail?.(diagnosis)}
              className={clsx(
                'flex-row items-center p-4',
                'rounded-2xl bg-background-0',
                'border border-outline-200',
                'active:bg-background-50',
                'shadow-sm',
              )}>
              <FilePreviewCard fileId={diagnosis?.fileId} />
              <VStack className="flex-1 ml-4" space="sm">
                <HStack className="items-center justify-between">
                  <Text
                    className={clsx(
                      'rounded-full px-3 py-1 text-sm font-medium',
                      DIAGNOSIS_STATUS_COLOR[
                        diagnosis?.status as keyof typeof DIAGNOSIS_STATUS_COLOR
                      ],
                    )}>
                    {
                      DIAGNOSIS_STATUS_TEXT[
                        (diagnosis?.status as keyof typeof DIAGNOSIS_STATUS_TEXT) ||
                          'pending'
                      ]
                    }
                  </Text>
                  <Text className="text-typography-500 text-sm">
                    {dayjs(diagnosis?.createdAt).fromNow()}
                  </Text>
                </HStack>
                <Text className="text-typography-700 text-base font-medium">
                  点击查看诊断详情
                </Text>
              </VStack>
              <Icon
                as={ChevronRight}
                size="md"
                className="text-typography-400 ml-4"
              />
            </Pressable>
          ))
        )}
      </VStack>
    </VStack>
  );
};

export default DiagnosisHistoryList;
