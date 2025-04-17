import {Disease} from '@/api/interface/knowledge';
import {getDiseaseDetail} from '@/api/modules/Knowledge/disease';
import MainLayout from '@/components/layout/MainLayout';
import {Box} from '@/components/ui/box';
import {Heading} from '@/components/ui/heading';
import {Icon} from '@/components/ui/icon';
import {Image} from '@/components/ui/image';
import {Text} from '@/components/ui/text';
import {VStack} from '@/components/ui/vstack';
import {DiseaseDetailScreenProps} from '@/routes/types/encyclopedia';
import {Sprout} from 'lucide-react-native';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';

const DiseaseDetailScreen: React.FC<DiseaseDetailScreenProps> = ({route}) => {
  const {diseaseId} = route.params;
  const [disease, setDisease] = useState<Disease | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchDiseaseDetail = async () => {
      try {
        setIsLoading(true);
        const response = await getDiseaseDetail(diseaseId);
        if (response.data) {
          setDisease(response.data);
        }
      } catch (error) {
        console.error('获取病害详情失败:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDiseaseDetail();
  }, [diseaseId]);

  if (isLoading || !disease) {
    return (
      <MainLayout>
        <Box className="flex-1 items-center justify-center">
          <Text>加载中...</Text>
        </Box>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <ScrollView className="flex-1">
        <VStack space="lg" className="p-4">
          {/* 病害图片 */}
          <Box className="w-full aspect-video rounded-xl overflow-hidden bg-background-50">
            {disease.crop?.imageUrl && !imageError ? (
              <Image
                source={{uri: disease.crop.imageUrl}}
                alt={disease.name}
                className="w-full h-full"
                onError={() => setImageError(true)}
              />
            ) : (
              <Box className="flex-1 items-center justify-center">
                <Icon as={Sprout} size="xl" className="text-primary-500" />
              </Box>
            )}
          </Box>

          {/* 病害基本信息 */}
          <VStack space="md">
            <Heading size="xl">{disease.name}</Heading>
            <Text className="text-typography-600">{disease.alias}</Text>
          </VStack>

          {/* 病害详情 */}
          <VStack space="md">
            <Heading size="md">病害详情</Heading>
            <Text className="text-typography-700">{disease.cause}</Text>
          </VStack>

          {/* 传播途径 */}
          <VStack space="md">
            <Heading size="md">传播途径</Heading>
            <Text className="text-typography-700">{disease.transmission}</Text>
          </VStack>

          {/* 症状 */}
          <VStack space="md">
            <Heading size="md">症状</Heading>
            {disease.symptoms.map((symptom, index) => (
              <Text key={index} className="text-typography-700">
                • {symptom.description}
              </Text>
            ))}
          </VStack>

          {/* 防治方法 */}
          <VStack space="md">
            <Heading size="md">防治方法</Heading>
            {disease.treatments.map((treatment, index) => (
              <Text key={index} className="text-typography-700">
                • {treatment.method}
              </Text>
            ))}
          </VStack>

          {/* 环境因素 */}
          <VStack space="md">
            <Heading size="md">环境因素</Heading>
            {disease.environmentFactors.map((factor, index) => (
              <Text key={index} className="text-typography-700">
                • {factor.optimalRange}
              </Text>
            ))}
          </VStack>
        </VStack>
      </ScrollView>
    </MainLayout>
  );
};

export default DiseaseDetailScreen;
