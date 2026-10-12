import {DiagnosisFeedback} from '@/api/interface/diagnosis';
import {getDiagnosisFeedbackDetail} from '@/api/modules/diagnosis';
import MainLayout from '@/components/layout/MainLayout';
import {Button, ButtonText} from '@/components/ui/button';
import {HStack} from '@/components/ui/hstack';
import {Icon} from '@/components/ui/icon';
import {Text} from '@/components/ui/text';
import {Toast, ToastTitle, useToast} from '@/components/ui/toast';
import {VStack} from '@/components/ui/vstack';
import {FeedbackDetailProps} from '@/routes/types';
import clsx from 'clsx';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  MessageSquare,
} from 'lucide-react-native';
import React, {useEffect, useState} from 'react';
import {ScrollView, RefreshControl} from 'react-native';

// 配置 dayjs
dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

const FEEDBACK_STATUS_COLOR = {
  pending: 'bg-warning-100 text-warning-700',
  processing: 'bg-info-100 text-info-700',
  resolved: 'bg-success-100 text-success-700',
  rejected: 'bg-error-100 text-error-700',
};

const FEEDBACK_STATUS_TEXT = {
  pending: '待处理',
  processing: '处理中',
  resolved: '已解决',
  rejected: '已拒绝',
};

const FeedbackDetailScreen: React.FC<FeedbackDetailProps> = ({
  route,
  navigation,
}) => {
  const toast = useToast();
  const [feedback, setFeedback] = useState<DiagnosisFeedback>();
  const [refreshing, setRefreshing] = useState(false);

  const fetchFeedbackDetail = async () => {
    try {
      const response = await getDiagnosisFeedbackDetail(
        route.params.feedbackId,
      );
      setFeedback(response.data);
    } catch (error) {
      console.error('获取反馈详情失败:', error);
      toast.show({
        placement: 'top right',
        render: ({id}) => (
          <Toast nativeID={id} variant="solid" action="error">
            <ToastTitle>获取反馈详情失败</ToastTitle>
          </Toast>
        ),
      });
    }
  };

  useEffect(() => {
    fetchFeedbackDetail();
  }, [route.params.feedbackId]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchFeedbackDetail();
    setRefreshing(false);
  };

  if (!feedback) {
    return null;
  }

  return (
    <MainLayout>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 160}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <VStack className="mx-6 mt-6" space="md">
          <VStack space="md" className="bg-background-50 rounded-xl p-4">
            <HStack className="items-center justify-between">
              <Text
                className={clsx(
                  'rounded-full px-3 py-1 text-sm font-medium',
                  FEEDBACK_STATUS_COLOR[
                    feedback.status as keyof typeof FEEDBACK_STATUS_COLOR
                  ],
                )}>
                {
                  FEEDBACK_STATUS_TEXT[
                    feedback.status as keyof typeof FEEDBACK_STATUS_TEXT
                  ]
                }
              </Text>
              <Text className="text-typography-500 text-sm">
                {dayjs(feedback.createdAt).fromNow()}
              </Text>
            </HStack>

            <HStack space="sm" className="items-center">
              <Icon as={MessageSquare} size="md" className="text-primary-500" />
              <Text className="text-typography-900 font-medium text-lg">
                反馈内容
              </Text>
            </HStack>

            <Text className="text-typography-600 text-base">
              {feedback.feedbackContent}
            </Text>

            <HStack space="sm" className="items-center">
              <Icon as={Calendar} size="sm" className="text-typography-500" />
              <Text className="text-typography-500">
                {dayjs(feedback.createdAt).format('YYYY-MM-DD HH:mm:ss')}
              </Text>
            </HStack>

            {feedback.expertComment && (
              <VStack space="sm">
                <HStack space="sm" className="items-center">
                  <Icon
                    as={CheckCircle}
                    size="md"
                    className="text-success-500"
                  />
                  <Text className="text-typography-900 font-medium text-lg">
                    专家回复
                  </Text>
                </HStack>
                <Text className="text-typography-600 text-base">
                  {feedback.expertComment}
                </Text>
              </VStack>
            )}

            {feedback.correctedResult && (
              <VStack space="sm">
                <HStack space="sm" className="items-center">
                  <Icon
                    as={AlertCircle}
                    size="md"
                    className="text-warning-500"
                  />
                  <Text className="text-typography-900 font-medium text-lg">
                    修正结果
                  </Text>
                </HStack>
                <Text className="text-typography-600 text-base">
                  {JSON.stringify(feedback.correctedResult, null, 2)}
                </Text>
              </VStack>
            )}
          </VStack>

          <Button
            className="w-full"
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: 'Profile' as any,
                  },
                ],
              })
            }>
            <ButtonText>返回个人信息页</ButtonText>
          </Button>
        </VStack>
      </ScrollView>
    </MainLayout>
  );
};

export default FeedbackDetailScreen;
