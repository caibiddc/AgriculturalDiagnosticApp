// DiagnosisHistoryScreen.tsx
import {DiagnosisHistory} from '@/api/interface/diagnosis';
import {
  getDiagnosisHistoryList,
  getDiagnosisHistory,
} from '@/api/modules/diagnosis';
import MainLayout from '@/components/layout/MainLayout';
import {Box} from '@/components/ui/box';
import {Button, ButtonText} from '@/components/ui/button';
import {Heading} from '@/components/ui/heading';
import {HStack} from '@/components/ui/hstack';
import {Icon} from '@/components/ui/icon';
import {Image} from '@/components/ui/image';
import {Pressable} from '@/components/ui/pressable';
import {Text} from '@/components/ui/text';
import {Toast, ToastTitle, useToast} from '@/components/ui/toast';
import {VStack} from '@/components/ui/vstack';
import {DiagnosisHistoryProps} from '@/routes/types';
import {isWeb} from '@gluestack-ui/nativewind-utils/IsWeb';
import {ArrowLeft, Calendar, Clock, Crop, Info} from 'lucide-react-native';
import React, {useEffect, useState} from 'react';
import {RefreshControl, ScrollView} from 'react-native';
import clsx from 'clsx';

const DiagnosisHistoryScreen: React.FC<DiagnosisHistoryProps> = ({
  route,
  navigation,
}) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [diagnosisList, setDiagnosisList] = useState<DiagnosisHistory[]>([]);
  const [selectedDiagnosis, setSelectedDiagnosis] =
    useState<DiagnosisHistory | null>(null);
  const [diagnosis, setDiagnosis] = useState<DiagnosisHistory>();

  const fetchDiagnosisHistory = async () => {
    try {
      const response = await getDiagnosisHistoryList({page: 1, pageSize: 10});
      setDiagnosisList(response.data?.list || []);
    } catch (error) {
      console.error('获取诊断历史失败:', error);
      toast.show({
        placement: 'top right',
        render: ({id}) => (
          <Toast nativeID={id} variant="solid" action="error">
            <ToastTitle>获取诊断历史失败</ToastTitle>
          </Toast>
        ),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDiagnosis = async () => {
    try {
      const response = await getDiagnosisHistory();
      if (response.data) {
        const diagnosis = response.data.find(
          (d: DiagnosisHistory) => d.id === route.params?.diagnosisId,
        );
        setDiagnosis(diagnosis);
      }
    } catch (error) {
      console.error('获取诊断详情失败:', error);
    }
  };

  useEffect(() => {
    fetchDiagnosisHistory();
    if (route.params?.diagnosisId) {
      fetchDiagnosis();
    }
  }, [route.params?.diagnosisId]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDiagnosisHistory();
    setRefreshing(false);
  };

  const renderDiagnosisList = () => (
    <VStack space="md" className="p-4">
      <Heading size="xl" className="text-typography-900">
        诊断历史
      </Heading>
      {diagnosisList.map(diagnosis => (
        <Pressable
          key={diagnosis.id}
          onPress={() => setSelectedDiagnosis(diagnosis)}
          className={clsx(
            'bg-background-50 rounded-xl p-4',
            'border border-outline-100',
            'active:bg-background-100',
          )}>
          <VStack space="sm">
            <HStack space="sm" className="items-center">
              <Icon as={Crop} size="md" className="text-primary-500" />
              <Text className="text-typography-900 font-medium">
                {diagnosis.diagnosisResult?.predictions?.[0]?.class_name ||
                  '未知病害'}
              </Text>
            </HStack>
            <HStack space="sm" className="items-center">
              <Icon as={Calendar} size="sm" className="text-typography-500" />
              <Text className="text-typography-500 text-sm">
                {new Date(diagnosis.createdAt).toLocaleDateString()}
              </Text>
              <Icon as={Clock} size="sm" className="text-typography-500 ml-2" />
              <Text className="text-typography-500 text-sm">
                {new Date(diagnosis.createdAt).toLocaleTimeString()}
              </Text>
            </HStack>
            <HStack space="sm" className="items-center">
              <Icon as={Info} size="sm" className="text-typography-500" />
              <Text className="text-typography-500 text-sm">
                置信度:{' '}
                {(
                  (diagnosis.diagnosisResult?.predictions?.[0]?.confidence ||
                    0) * 100
                ).toFixed(2)}
                %
              </Text>
            </HStack>
          </VStack>
        </Pressable>
      ))}
    </VStack>
  );

  const renderDiagnosisDetail = () => {
    if (!selectedDiagnosis) return null;

    const prediction = selectedDiagnosis.diagnosisResult?.predictions?.[0];
    const confidence = prediction?.confidence || 0;

    return (
      <VStack space="md" className="p-4">
        <HStack space="sm" className="items-center">
          <Pressable
            onPress={() => setSelectedDiagnosis(null)}
            className="p-2 rounded-full active:bg-background-100">
            <Icon as={ArrowLeft} size="md" className="text-typography-900" />
          </Pressable>
          <Heading size="xl" className="text-typography-900">
            诊断详情
          </Heading>
        </HStack>

        <Box className="bg-background-50 rounded-xl p-4 border border-outline-100">
          <VStack space="md">
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
                  className={clsx(
                    'h-full rounded-full',
                    confidence > 80 ? 'bg-success-500' : 'bg-warning-500',
                  )}
                  style={{width: `${confidence}%`}}
                />
              </Box>
              <Text className="text-typography-500 text-sm mt-1">
                {confidence.toFixed(2)}%
              </Text>
            </Box>

            <VStack space="sm">
              <Text className="text-typography-700 font-medium">诊断时间</Text>
              <HStack space="sm" className="items-center">
                <Icon as={Calendar} size="sm" className="text-typography-500" />
                <Text className="text-typography-500">
                  {new Date(selectedDiagnosis.createdAt).toLocaleString()}
                </Text>
              </HStack>
            </VStack>

            {selectedDiagnosis.diagnosisResult?.predictions?.map((p, index) => (
              <VStack key={index} space="sm">
                <Text className="text-typography-700 font-medium">
                  预测结果 {index + 1}
                </Text>
                <Box className="bg-background-0 rounded-lg p-3">
                  <Text className="text-typography-600">
                    病害名称: {p.class_name}
                  </Text>
                  <Text className="text-typography-600">
                    置信度: {(p.confidence * 100).toFixed(2)}%
                  </Text>
                  {p.type === 'detect' && (
                    <>
                      <Text className="text-typography-600">
                        检测区域: {p.bbox.x}, {p.bbox.y}, {p.bbox.width},{' '}
                        {p.bbox.height}
                      </Text>
                      <Text className="text-typography-600">
                        面积: {p.area}
                      </Text>
                    </>
                  )}
                </Box>
              </VStack>
            ))}
          </VStack>
        </Box>
      </VStack>
    );
  };

  return (
    <MainLayout>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: isWeb ? 0 : 160,
          flexGrow: 1,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {selectedDiagnosis ? renderDiagnosisDetail() : renderDiagnosisList()}
      </ScrollView>
    </MainLayout>
  );
};

export default DiagnosisHistoryScreen;
