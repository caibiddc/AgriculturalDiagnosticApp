import {DiagnosisHistory} from '@/api/interface/diagnosis';
import {getDiagnosisHistory} from '@/api/modules/diagnosis';
import MainLayout from '@/components/layout/MainLayout';
import {Box} from '@/components/ui/box';
import {Heading} from '@/components/ui/heading';
import {HStack} from '@/components/ui/hstack';
import {Icon} from '@/components/ui/icon';
import {Text} from '@/components/ui/text';
import {VStack} from '@/components/ui/vstack';
import {DiagnosisDetailProps} from '@/routes/types';
import {Calendar, Crop} from 'lucide-react-native';
import React, {useEffect, useState} from 'react';

const DiagnosisDetailScreen: React.FC<DiagnosisDetailProps> = ({
  route,
  navigation,
}) => {
  const [diagnosis, setDiagnosis] = useState<DiagnosisHistory>();

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
    if (route.params?.diagnosisId) {
      fetchDiagnosis();
    }
  }, [route.params?.diagnosisId]);

  if (!diagnosis) {
    return null;
  }

  const prediction = diagnosis.diagnosisResult?.predictions?.[0];
  const confidence = prediction?.confidence || 0;

  return (
    <MainLayout>
      <VStack space="md" className="p-4">
        <HStack space="sm" className="items-center">
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
              <Text className="text-typography-700 font-medium">诊断时间</Text>
              <HStack space="sm" className="items-center">
                <Icon as={Calendar} size="sm" className="text-typography-500" />
                <Text className="text-typography-500">
                  {new Date(diagnosis.createdAt).toLocaleString()}
                </Text>
              </HStack>
            </VStack>

            {diagnosis.diagnosisResult?.predictions?.map((p, index) => (
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
    </MainLayout>
  );
};

export default DiagnosisDetailScreen;
