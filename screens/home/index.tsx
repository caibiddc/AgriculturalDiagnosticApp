import {DiagnosisHistory} from '@/api/interface/diagnosis';
import {getCrops} from '@/api/modules/Knowledge/crop';
import {
  getDiagnosisHistoryList,
  uploadDiseaseImage,
} from '@/api/modules/diagnosis';
import MainLayout from '@/components/layout/MainLayout';
import DiagnosisHistoryList from '@/components/list/DiagnosisHistoryList';
import {Button, ButtonText} from '@/components/ui/button';
import {Heading} from '@/components/ui/heading';
import {HStack} from '@/components/ui/hstack';
import {ChevronDownIcon, Icon} from '@/components/ui/icon';
import {Image} from '@/components/ui/image';
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
import useImagePicker from '@/hooks/useImagePicker';
import {HomeScreenProps} from '@/routes/types';
import {isWeb} from '@gluestack-ui/nativewind-utils/IsWeb';
import clsx from 'clsx';
import {Camera, Image as ImageIcon, Sprout} from 'lucide-react-native';
import React, {useEffect, useState} from 'react';
import {RefreshControl, ScrollView} from 'react-native';

const MainContent: React.FC<HomeScreenProps> = ({navigation}) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const {image, takePhoto, choosePhoto, clearImage} = useImagePicker();
  const [options, setOptions] = useState<
    {
      label: string;
      value: string;
      disabled?: boolean;
    }[]
  >([]);
  const [diagnosisList, setDiagnosisList] = useState<DiagnosisHistory[]>([]);

  // 获取作物列表
  const fetchCrops = async () => {
    try {
      setIsLoading(true);
      const response = await getCrops();
      if (response.data) {
        const cropOptions = response.data.map(crop => ({
          label: crop.name,
          value: crop.name,
        }));
        setOptions(cropOptions);
      }
    } catch (error) {
      console.error('获取作物列表失败:', error);
      toast.show({
        placement: 'top right',
        render: ({id}) => (
          <Toast nativeID={id} variant="solid" action="error">
            <ToastTitle>获取作物列表失败</ToastTitle>
          </Toast>
        ),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDiagnosisHistory = async () => {
    try {
      const response = await getDiagnosisHistoryList({page: 1, pageSize: 3});
      setDiagnosisList(response.data?.list || []);
    } catch (error) {
      console.log('Fetch diagnosis history error: ', error);
    }
  };

  useEffect(() => {
    fetchCrops();
    fetchDiagnosisHistory();
  }, []);

  // 处理下拉刷新
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchDiagnosisHistory();
      toast.show({
        placement: 'top right',
        render: ({id}) => (
          <Toast nativeID={id} variant="solid" action="success">
            <ToastTitle>更新成功！</ToastTitle>
          </Toast>
        ),
      });
    } catch (error) {
      toast.show({
        placement: 'top right',
        render: ({id}) => (
          <Toast nativeID={id} variant="solid" action="error">
            <ToastTitle>刷新失败！</ToastTitle>
          </Toast>
        ),
      });
    } finally {
      setRefreshing(false);
    }
  };

  // 打开相机拍照
  const handleTakePhoto = () => {
    takePhoto();
  };

  // 从相册选择图片
  const handleChoosePhoto = () => {
    choosePhoto();
  };

  // 上传图片到服务器
  const handleUploadImage = async () => {
    setIsUploading(true);
    if (!image) {
      toast.show({
        placement: 'top right',
        duration: 3000,
        render: ({id}) => (
          <Toast nativeID={`toast-${id}`} action="error" variant="solid">
            <ToastTitle>请先选择图片</ToastTitle>
          </Toast>
        ),
      });
      setIsUploading(false);
      return;
    }
    try {
      console.log('Uploading image: ', image);
      await uploadDiseaseImage(image);
      toast.show({
        placement: 'top right',
        duration: 3000,
        render: ({id}) => (
          <Toast nativeID={`toast-${id}`} action="success" variant="solid">
            <ToastTitle>上传成功</ToastTitle>
          </Toast>
        ),
      });
      await fetchDiagnosisHistory();
    } catch (error) {
      console.log('Upload error: ', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <VStack className="h-full w-full mb-16 md:mb-0">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: isWeb ? 0 : 160,
          flexGrow: 1,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <VStack className="mx-6 mt-6" space="2xl">
          {/* 标题区域 */}
          <VStack space="md">
            <Heading size="2xl" className="text-typography-900">
              病害智能诊断
            </Heading>
            <Text className="text-typography-600 text-base">
              上传植物图片，快速识别病害类型
            </Text>
          </VStack>

          {/* 植物选择 */}
          <VStack space="md">
            <Text className="text-typography-700 font-medium">
              选择植物类型
            </Text>
            <Select className="pb-8">
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
                      label={option.value}
                      value={option.value}
                      disabled={option.disabled}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>
          </VStack>

          {/* 图片上传区域 */}
          <VStack space="md" className="items-center">
            <Text className="text-typography-700 font-medium">
              上传植物图片
            </Text>
            <Pressable
              onPress={handleChoosePhoto}
              className={clsx(
                'relative w-48 h-48 rounded-full',
                'bg-background-50 border-2 border-dashed border-primary-200',
                'items-center justify-center',
                'active:bg-background-100',
              )}>
              {image ? (
                <Image source={image} className="w-full h-full rounded-full" />
              ) : (
                <VStack space="md" className="items-center">
                  <Icon as={Sprout} size="xl" className="text-primary-500" />
                  <Text className="text-typography-500 text-sm">
                    点击上传图片
                  </Text>
                </VStack>
              )}
            </Pressable>
          </VStack>

          {/* 操作按钮 */}
          <VStack space="md">
            <Button
              size="lg"
              variant="solid"
              action="primary"
              onPress={handleTakePhoto}
              className={clsx(
                'h-14 rounded-xl',
                'bg-primary-500 active:bg-primary-600',
              )}>
              <Icon as={Camera} size="md" className="mr-2 text-primary-0" />
              <ButtonText>拍照识别</ButtonText>
            </Button>

            <HStack space="md">
              <Button
                size="lg"
                variant="solid"
                action="positive"
                className={clsx(
                  'flex-1 h-14 rounded-xl',
                  'bg-success-500 active:bg-success-600',
                )}
                onPress={handleUploadImage}
                disabled={isUploading}>
                <Icon
                  as={ImageIcon}
                  size="md"
                  className="mr-2 text-primary-0"
                />
                <ButtonText>
                  {isUploading ? '上传中...' : '上传图片'}
                </ButtonText>
              </Button>

              <Button
                size="lg"
                variant="solid"
                action="negative"
                className={clsx(
                  'flex-1 h-14 rounded-xl',
                  'bg-error-500 active:bg-error-600',
                )}
                onPress={() => clearImage()}>
                <ButtonText>重置</ButtonText>
              </Button>
            </HStack>
          </VStack>
        </VStack>

        {/* 诊断历史列表 */}
        <DiagnosisHistoryList
          diagnosisList={diagnosisList}
          onCheckAll={() => {
            navigation.navigate('Profile', {
              screen: 'DiagnosisHistory',
            });
          }}
        />
      </ScrollView>
    </VStack>
  );
};

const HomeScreen: React.FC<HomeScreenProps> = props => {
  return (
    <MainLayout>
      <MainContent {...props} />
    </MainLayout>
  );
};

export default HomeScreen;
