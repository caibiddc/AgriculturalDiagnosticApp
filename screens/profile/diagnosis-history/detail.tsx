import {DiagnosisHistory} from '@/api/interface/diagnosis';
import {
  getDiagnosisHistory,
  getDiagnosisSupport,
  getDiagnosisStatus,
  startDiagnosisAsync,
} from '@/api/modules/diagnosis';
import FilePreviewCard from '@/components/card/FilePreviewCard';
import MainLayout from '@/components/layout/MainLayout';
import {Box} from '@/components/ui/box';
import {Button, ButtonText} from '@/components/ui/button';
import {HStack} from '@/components/ui/hstack';
import {Icon} from '@/components/ui/icon';
import {Pressable} from '@/components/ui/pressable';
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from '@/components/ui/select';
import {Text} from '@/components/ui/text';
import {Toast, ToastTitle, useToast} from '@/components/ui/toast';
import {VStack} from '@/components/ui/vstack';
import {DIAGNOSIS_STATUS_COLOR} from '@/constants';
import {DIAGNOSIS_CLASS_NAME_ZH_CN} from '@/constants/diagnosis';
import {DIAGNOSIS_STATUS_TEXT} from '@/constants/status';
import {DiagnosisDetailProps} from '@/routes/types';
import clsx from 'clsx';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  ChevronDownIcon,
  Crop,
  ExternalLink,
  MessageSquare,
} from 'lucide-react-native';
import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, RefreshControl} from 'react-native';

// 配置 dayjs
dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

type DiagnosisOption = {
  label: string;
  value: {serviceId: number; configId: number};
  disabled?: boolean;
};

const PAGE_SIZE = 10;

const DiagnosisDetailScreen: React.FC<DiagnosisDetailProps> = ({
  route,
  navigation,
}) => {
  const toast = useToast();
  const [diagnosis, setDiagnosis] = useState<DiagnosisHistory>();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedValue, setSelectedValue] = useState<{
    serviceId: number;
    configId: number;
  } | null>(null);
  const [options, setOptions] = useState<DiagnosisOption[]>([]);

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

  const fetchDiagnosisSupport = async () => {
    try {
      setIsLoading(true);
      const response = await getDiagnosisSupport();
      if (response.data) {
        const supportOptions = response.data.map(support => ({
          label: support.key,
          value: support.value,
        }));
        setOptions(supportOptions);
      }
    } catch (error) {
      console.error('获取诊断支持信息失败:', error);
      toast.show({
        placement: 'top right',
        render: ({id}) => (
          <Toast nativeID={id} variant="solid" action="error">
            <ToastTitle>获取诊断支持信息失败</ToastTitle>
          </Toast>
        ),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    if (!route.params?.diagnosisId) return;

    setRefreshing(true);
    try {
      const response = await getDiagnosisStatus(route.params.diagnosisId);
      if (response.data) {
        setDiagnosis(response.data);
        toast.show({
          placement: 'top right',
          render: ({id}) => (
            <Toast nativeID={id} variant="solid" action="success">
              <ToastTitle>更新成功！</ToastTitle>
            </Toast>
          ),
        });
      }
    } catch (error) {
      console.error('获取诊断状态失败:', error);
      toast.show({
        placement: 'top right',
        render: ({id}) => (
          <Toast nativeID={id} variant="solid" action="error">
            <ToastTitle>更新失败！</ToastTitle>
          </Toast>
        ),
      });
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (route.params?.diagnosisId) {
      fetchDiagnosis();
      fetchDiagnosisSupport();
    }
  }, [route.params?.diagnosisId]);

  const handleRediagnosis = async () => {
    if (!selectedValue) {
      toast.show({
        placement: 'top right',
        duration: 3000,
        render: ({id}) => (
          <Toast nativeID={`toast-${id}`} action="error" variant="solid">
            <ToastTitle>请先选择植物类型</ToastTitle>
          </Toast>
        ),
      });
      return;
    }

    try {
      await startDiagnosisAsync({
        diagnosisId: route.params?.diagnosisId,
        serviceId: selectedValue.serviceId,
        configId: selectedValue.configId,
      });

      toast.show({
        placement: 'top right',
        duration: 3000,
        render: ({id}) => (
          <Toast nativeID={`toast-${id}`} action="success" variant="solid">
            <ToastTitle>开始重新诊断，请稍后刷新查看结果</ToastTitle>
          </Toast>
        ),
      });
      await fetchDiagnosis();
    } catch (error) {
      console.log('Rediagnosis error: ', error);
      toast.show({
        placement: 'top right',
        duration: 3000,
        render: ({id}) => (
          <Toast nativeID={`toast-${id}`} action="error" variant="solid">
            <ToastTitle>重新诊断失败，请重试</ToastTitle>
          </Toast>
        ),
      });
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

  const renderMatchResultItem = ({
    item: matchResult,
    index,
  }: {
    item: any;
    index: number;
  }) => (
    <Pressable
      onPress={() =>
        navigation.navigate('Encyclopedia' as any, {
          screen: 'DiseaseDetail',
          params: {diseaseId: matchResult.disease.id},
        })
      }>
      {({pressed}) => (
        <Box
          className={clsx(
            'bg-background-0 rounded-lg p-4 mb-3 border border-outline-100',
            pressed && 'bg-background-50',
          )}>
          <VStack space="sm">
            <HStack className="items-center justify-between">
              <HStack className="items-center flex-1">
                <Icon as={Crop} size="md" className="text-primary-500 mr-2" />
                <Text className="text-typography-900 font-medium text-lg flex-1">
                  {matchResult.disease.name}
                </Text>
              </HStack>
              <Box className="flex-row items-center">
                <Text className="text-typography-600 mr-2">匹配度</Text>
                <Box className="bg-primary-100 rounded-full px-3 py-1">
                  <Text className="text-primary-600 font-medium">
                    {(matchResult.score * 100).toFixed(1)}%
                  </Text>
                </Box>
              </Box>
            </HStack>

            <HStack className="items-center justify-end">
              <Text className="text-primary-500 text-sm mr-1">查看详情</Text>
              <Icon as={ExternalLink} size="sm" className="text-primary-500" />
            </HStack>

            <VStack space="sm">
              <Text className="text-typography-700 font-medium">匹配规则</Text>
              {matchResult.matchedRules.map((rule: any, ruleIndex: number) => (
                <Box
                  key={ruleIndex}
                  className="bg-background-50 rounded-lg p-3 border border-outline-100">
                  <HStack className="items-center mb-1">
                    <Icon
                      as={rule.type === 'exact' ? CheckCircle : AlertCircle}
                      size="sm"
                      className={clsx(
                        'mr-2',
                        rule.type === 'exact'
                          ? 'text-success-500'
                          : 'text-warning-500',
                      )}
                    />
                    <VStack className="flex-1" space="xs">
                      <Text className="text-typography-700 font-medium break-words">
                        {rule.field}: {rule.value}
                      </Text>
                      <Text className="text-typography-500 text-sm">
                        规则类型: {rule.type}
                        {rule.weight && ` | 权重: ${rule.weight}`}
                      </Text>
                    </VStack>
                  </HStack>
                </Box>
              ))}
            </VStack>
          </VStack>
        </Box>
      )}
    </Pressable>
  );

  return (
    <MainLayout>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 160}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <VStack className="mx-6 mt-6" space="md">
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
                  {DIAGNOSIS_CLASS_NAME_ZH_CN[
                    prediction?.class_name as keyof typeof DIAGNOSIS_CLASS_NAME_ZH_CN
                  ] || '未知病害'}
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

              {diagnosis.diagnosisResult?.matchResults?.length > 0 && (
                <VStack space="sm">
                  <Text className="text-typography-900 font-medium text-lg">
                    知识库匹配结果
                  </Text>
                  <FlatList
                    data={diagnosis.diagnosisResult.matchResults}
                    renderItem={renderMatchResultItem}
                    keyExtractor={(_, index) => index.toString()}
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                  />
                </VStack>
              )}

              <VStack space="sm">
                <Text className="text-typography-900 font-medium text-lg">
                  模型预测结果
                </Text>
                <FlatList
                  data={displayedPredictions}
                  renderItem={renderPredictionItem}
                  keyExtractor={(_, index) => index.toString()}
                  scrollEnabled={false}
                  showsVerticalScrollIndicator={false}
                />
              </VStack>

              {/* 重新诊断区域 */}
              <VStack space="md" className="mt-4">
                <Text className="text-typography-900 font-medium text-lg">
                  重新诊断
                </Text>

                {/* 植物选择 */}
                <VStack space="sm">
                  <Text className="text-typography-700 font-medium">
                    选择植物类型
                  </Text>
                  <Select
                    className="pb-8"
                    onValueChange={value => {
                      const option = options.find(
                        opt =>
                          opt.value.serviceId === JSON.parse(value).serviceId &&
                          opt.value.configId === JSON.parse(value).configId,
                      );
                      if (option) {
                        setSelectedValue(option.value);
                      }
                    }}>
                    <SelectTrigger
                      variant="outline"
                      size="md"
                      className={clsx(
                        'h-12 flex justify-between rounded-xl border-2',
                        'border-primary-200 focus:border-primary-500',
                      )}>
                      <SelectInput
                        placeholder={isLoading ? '加载中...' : '请选择植物'}
                      />
                      <SelectIcon className="mr-4" as={ChevronDownIcon} />
                    </SelectTrigger>
                    <SelectPortal>
                      <SelectBackdrop />
                      <SelectContent>
                        <SelectDragIndicatorWrapper>
                          <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        {options.map((option, index) => (
                          <SelectItem
                            key={index}
                            label={option.label}
                            value={JSON.stringify(option.value)}
                            disabled={option.disabled}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </SelectPortal>
                  </Select>
                </VStack>

                {/* 重新诊断按钮 */}
                <Button
                  size="lg"
                  variant="solid"
                  action="primary"
                  className={clsx(
                    'h-14 rounded-xl',
                    'bg-primary-500 active:bg-primary-600',
                  )}
                  onPress={handleRediagnosis}>
                  <ButtonText>开始重新诊断</ButtonText>
                </Button>
              </VStack>

              {/* 反馈入口 */}
              <Button
                size="lg"
                variant="outline"
                action="secondary"
                className={clsx(
                  'h-14 rounded-xl',
                  'border-primary-200 active:border-primary-500',
                )}
                onPress={() =>
                  navigation.navigate('FeedbackSubmit', {
                    diagnosisId: diagnosis.id,
                  })
                }>
                <HStack space="sm" className="items-center">
                  <Icon
                    as={MessageSquare}
                    size="md"
                    className="text-primary-500"
                  />
                  <ButtonText>提交反馈</ButtonText>
                </HStack>
              </Button>
            </VStack>
          </Box>
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

export default DiagnosisDetailScreen;
