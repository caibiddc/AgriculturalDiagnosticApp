import {DiagnosisHistory} from '@/api/interface/diagnosis';
import {getDiagnosisHistory} from '@/api/modules/diagnosis';
import FilePreviewCard from '@/components/card/FilePreviewCard';
import MainLayout from '@/components/layout/MainLayout';
import {Box} from '@/components/ui/box';
import {Heading} from '@/components/ui/heading';
import {HStack} from '@/components/ui/hstack';
import {Icon} from '@/components/ui/icon';
import {Text} from '@/components/ui/text';
import {VStack} from '@/components/ui/vstack';
import {DiagnosisDetailProps} from '@/routes/types';
import {DIAGNOSIS_STATUS_COLOR} from '@/constants';
import {ArrowLeft, Calendar, Crop} from 'lucide-react-native';
import React, {useEffect, useState} from 'react';
import {FlatList, Pressable, ScrollView} from 'react-native';
import clsx from 'clsx';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';
import {DIAGNOSIS_STATUS_TEXT} from '@/constants/status';

// 配置 dayjs
dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

const PAGE_SIZE = 10;

const DiagnosisDetailScreen: React.FC<DiagnosisDetailProps> = ({
  route,
  navigation,
}) => {
  const [diagnosis, setDiagnosis] = useState<DiagnosisHistory>();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchDiagnosis = async () => {
    try {
      const response = await getDiagnosisHistory();
      if (response.data) {
        const diagnosis = response.data.find(
          (d: DiagnosisHistory) => d.id === route.params?.diagnosisId,
        );
        setDiagnosis(diagnosis);
        setHasMore(
          (diagnosis?.diagnosisResult?.predictions?.length || 0) > PAGE_SIZE,
        );
      }
    } catch (error) {
      console.error('获取诊断详情失败:', error);
    }
  };

  useEffect(() => {
    if (route.params?.diagnosisId) {
      fetchDiagnosis();
    }
  }, [route.params?.diagnosisId]);

  const loadMore = () => {
    if (!isLoading && hasMore) {
      setCurrentPage(prev => prev + 1);
    }
  };

  if (!diagnosis) {
    return null;
  }

  const prediction = diagnosis.diagnosisResult?.predictions?.[0];
  const confidence = prediction?.confidence || 0;
  const predictions = diagnosis.diagnosisResult?.predictions || [];
  const displayedPredictions = predictions.slice(0, currentPage * PAGE_SIZE);

  const renderPredictionItem = ({
    item: p,
    index,
  }: {
    item: any;
    index: number;
  }) => (
    <VStack key={index} space="sm">
      <Text className="text-typography-700 font-medium">
        预测结果 {index + 1}
      </Text>
      <Box className="bg-background-0 rounded-lg p-3">
        <Text className="text-typography-600">病害名称: {p.class_name}</Text>
        <Text className="text-typography-600">
          置信度: {(p.confidence * 100).toFixed(2)}%
        </Text>
        {p.type === 'detect' && (
          <>
            <Text className="text-typography-600">
              检测区域: {p.bbox.x}, {p.bbox.y}, {p.bbox.width}, {p.bbox.height}
            </Text>
            <Text className="text-typography-600">面积: {p.area}</Text>
          </>
        )}
      </Box>
    </VStack>
  );

  return (
    <MainLayout>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 160}}>
        <VStack className="mx-6 mt-6" space="md">
          <HStack className="items-center">
            <Pressable
              onPress={() => navigation.goBack()}
              className="p-2 rounded-full active:bg-background-100">
              <Icon as={ArrowLeft} size="md" className="text-typography-900" />
            </Pressable>
            <Heading size="lg" className="text-typography-900 ml-2">
              诊断详情
            </Heading>
          </HStack>

          <Box className="bg-background-50 rounded-xl p-4 border border-outline-100">
            <VStack space="md">
              <FilePreviewCard fileId={diagnosis.fileId} />

              <HStack className="items-center justify-between">
                <Text
                  className={clsx(
                    'rounded-full px-3 py-1 text-sm font-medium',
                    DIAGNOSIS_STATUS_COLOR[
                      diagnosis.status as keyof typeof DIAGNOSIS_STATUS_COLOR
                    ],
                  )}>
                  {
                    DIAGNOSIS_STATUS_TEXT[
                      (diagnosis.status as keyof typeof DIAGNOSIS_STATUS_TEXT) ||
                        'pending'
                    ]
                  }
                </Text>
                <Text className="text-typography-500 text-sm">
                  {dayjs(diagnosis.createdAt).fromNow()}
                </Text>
              </HStack>

              <HStack space="sm" className="items-center">
                <Icon as={Crop} size="md" className="text-primary-500" />
                <Text className="text-typography-900 font-medium text-lg">
                  {prediction?.class_name || '未知病害'}
                </Text>
              </HStack>

              <Box className="bg-background-0 rounded-lg p-3">
                <Text className="text-typography-700 font-medium">置信度</Text>
                <Box className="h-2 bg-background-100 rounded-full mt-2">
                  <Box
                    className={`h-full rounded-full ${
                      confidence > 80 ? 'bg-success-500' : 'bg-warning-500'
                    }`}
                    style={{width: `${confidence * 100}%`}}
                  />
                </Box>
                <Text className="text-typography-500 text-sm mt-1">
                  {(confidence * 100).toFixed(2)}%
                </Text>
              </Box>

              <VStack space="sm">
                <Text className="text-typography-700 font-medium">
                  诊断时间
                </Text>
                <HStack space="sm" className="items-center">
                  <Icon
                    as={Calendar}
                    size="sm"
                    className="text-typography-500"
                  />
                  <Text className="text-typography-500">
                    {dayjs(diagnosis.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                  </Text>
                </HStack>
              </VStack>

              <FlatList
                data={displayedPredictions}
                renderItem={renderPredictionItem}
                keyExtractor={(_, index) => index.toString()}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
              />
            </VStack>
          </Box>
        </VStack>
      </ScrollView>
    </MainLayout>
  );
};

export default DiagnosisDetailScreen;
