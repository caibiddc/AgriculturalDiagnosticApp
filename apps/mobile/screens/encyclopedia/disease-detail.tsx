import {Disease} from '@/api/interface/knowledge';
import {getDiseaseDetail} from '@/api/modules/Knowledge/disease';
import MainLayout from '@/components/layout/MainLayout';
import {Box} from '@/components/ui/box';
import {Heading} from '@/components/ui/heading';
import {HStack} from '@/components/ui/hstack';
import {Icon} from '@/components/ui/icon';
import {Image} from '@/components/ui/image';
import {Pressable} from '@/components/ui/pressable';
import {Text} from '@/components/ui/text';
import {VStack} from '@/components/ui/vstack';
import {TREATMENT_METHOD} from '@/constants/knowledge';
import {DiseaseDetailScreenProps} from '@/routes/types/encyclopedia';
import {
  ArrowLeft,
  Bug,
  Droplets,
  Leaf,
  Thermometer,
  Wind,
} from 'lucide-react-native';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';

const DiseaseDetailScreen: React.FC<DiseaseDetailScreenProps> = ({
  route,
  navigation,
}) => {
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
          {/* 返回按钮 */}
          <Pressable
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{name: 'EncyclopediaIndex'}],
              })
            }
            className="mb-2">
            <Icon as={ArrowLeft} size="xl" className="text-typography-900" />
          </Pressable>

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
                <Icon as={Leaf} size="xl" className="text-primary-500" />
              </Box>
            )}
          </Box>

          {/* 病害基本信息 */}
          <VStack space="sm" className="bg-background-50 p-4 rounded-xl">
            <Heading size="xl" className="text-typography-900">
              {disease.name}
            </Heading>
            {disease.alias && (
              <Text className="text-typography-600 text-base">
                别名：{disease.alias}
              </Text>
            )}
            <Text className="text-typography-700 text-base">
              所属作物：{disease.crop?.name || '未知'}
            </Text>
          </VStack>

          {/* 病害详情 */}
          <VStack space="sm" className="bg-background-50 p-4 rounded-xl">
            <HStack space="sm" className="items-center">
              <Icon as={Bug} size="md" className="text-primary-500" />
              <Heading size="md" className="text-typography-900">
                病害详情
              </Heading>
            </HStack>
            <Text className="text-typography-700 text-base leading-relaxed">
              {disease.cause}
            </Text>
          </VStack>

          {/* 传播途径 */}
          <VStack space="sm" className="bg-background-50 p-4 rounded-xl">
            <HStack space="sm" className="items-center">
              <Icon as={Wind} size="md" className="text-primary-500" />
              <Heading size="md" className="text-typography-900">
                传播途径
              </Heading>
            </HStack>
            <Text className="text-typography-700 text-base leading-relaxed">
              {disease.transmission}
            </Text>
          </VStack>

          {/* 症状 */}
          <VStack space="sm" className="bg-background-50 p-4 rounded-xl">
            <HStack space="sm" className="items-center">
              <Icon as={Leaf} size="md" className="text-primary-500" />
              <Heading size="md" className="text-typography-900">
                症状表现
              </Heading>
            </HStack>
            <VStack space="sm">
              {disease.symptoms.map((symptom, index) => (
                <Box
                  key={index}
                  className="bg-background-0 p-3 rounded-lg border border-outline-100">
                  <Text className="text-typography-700 text-base font-medium">
                    {symptom.stage}
                  </Text>
                  <Text className="text-typography-600 text-base mt-1">
                    {symptom.description}
                  </Text>
                  {symptom.imageUrl && (
                    <Box className="mt-2 aspect-video rounded-lg overflow-hidden">
                      <Image
                        source={{uri: symptom.imageUrl}}
                        alt={`${symptom.stage}症状`}
                        className="w-full h-full"
                      />
                    </Box>
                  )}
                </Box>
              ))}
            </VStack>
          </VStack>

          {/* 防治方法 */}
          <VStack space="sm" className="bg-background-50 p-4 rounded-xl">
            <HStack space="sm" className="items-center">
              <Icon as={Droplets} size="md" className="text-primary-500" />
              <Heading size="md" className="text-typography-900">
                防治方法
              </Heading>
            </HStack>
            <VStack space="sm">
              {disease.treatments.map((treatment, index) => (
                <Box
                  key={index}
                  className="bg-background-0 p-3 rounded-lg border border-outline-100">
                  <Text className="text-typography-700 text-base font-medium">
                    {TREATMENT_METHOD[treatment.type]}
                  </Text>
                  <Text className="text-typography-600 text-base mt-1">
                    {treatment.method}
                  </Text>
                  {treatment.recommendedProducts && (
                    <Text className="text-typography-500 text-sm mt-1">
                      推荐产品：{treatment.recommendedProducts}
                    </Text>
                  )}
                </Box>
              ))}
            </VStack>
          </VStack>

          {/* 环境因素 */}
          <VStack space="sm" className="bg-background-50 p-4 rounded-xl">
            <HStack space="sm" className="items-center">
              <Icon as={Thermometer} size="md" className="text-primary-500" />
              <Heading size="md" className="text-typography-900">
                环境因素
              </Heading>
            </HStack>
            <VStack space="sm">
              {disease.environmentFactors.map((factor, index) => (
                <Box
                  key={index}
                  className="bg-background-0 p-3 rounded-lg border border-outline-100">
                  <Text className="text-typography-700 text-base font-medium">
                    {factor.factor}
                  </Text>
                  <Text className="text-typography-600 text-base mt-1">
                    适宜范围：{factor.optimalRange}
                  </Text>
                </Box>
              ))}
            </VStack>
          </VStack>
        </VStack>
      </ScrollView>
    </MainLayout>
  );
};

export default DiseaseDetailScreen;
