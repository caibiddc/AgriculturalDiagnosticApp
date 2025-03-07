import {uploadDiseaseImage} from '@/api/modules/diagnosis';
import MainLayout from '@/components/layout/MainLayout';
import {EditPhotoIcon} from '@/components/modal/assets/icons/edit-photo';
import {Avatar, AvatarBadge, AvatarImage} from '@/components/ui/avatar';
import {Button, ButtonText} from '@/components/ui/button';
import {Center} from '@/components/ui/center';
import {Heading} from '@/components/ui/heading';
import {HStack} from '@/components/ui/hstack';
import {ChevronDownIcon, Icon} from '@/components/ui/icon';
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
import {Toast, ToastTitle, useToast} from '@/components/ui/toast';
import {VStack} from '@/components/ui/vstack';
import useImagePicker from '@/hooks/useImagePicker';
import {HomeScreenProps} from '@/routes/types';
import {isWeb} from '@gluestack-ui/nativewind-utils/IsWeb';
import {Sprout} from 'lucide-react-native';
import React, {useState} from 'react';
import {ScrollView} from 'react-native';

const MainContent: React.FC<HomeScreenProps> = () => {
  const toast = useToast();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const {image, takePhoto, choosePhoto, clearImage} = useImagePicker();
  const [options, setOptions] = useState<
    {
      label: string;
      value: string;
      disabled?: boolean;
    }[]
  >([
    {label: '苹果', value: '苹果'},
    {label: '水稻', value: '水稻'},
    {label: '小麦', value: '小麦'},
    {label: '甘薯', value: '甘薯'},
    {label: '马铃薯', value: '马铃薯'},
  ]);

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
        }}>
        <VStack className="mx-6 mt-6" space="md">
          <Heading>病害智能诊断</Heading>

          <Select className="pb-8">
            <SelectTrigger
              variant="outline"
              size="md"
              className="h-12 flex justify-between">
              <SelectInput placeholder="请选择植物" />
              <SelectIcon className="mr-4" as={ChevronDownIcon} />
            </SelectTrigger>
            <SelectPortal>
              {/* 遮罩 */}
              <SelectBackdrop />

              {/* 选项列表 */}
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

          {/* 图片上传 */}
          <Center className="w-full pb-8">
            <Pressable onPress={handleChoosePhoto}>
              <Avatar size="2xl" className="w-48 h-48">
                {image ? (
                  <AvatarImage source={image} />
                ) : (
                  <Icon as={Sprout} size="lg" className="text-primary-0" />
                )}
                <AvatarBadge className="justify-center items-center bg-background-500 w-12 h-12">
                  <Icon as={EditPhotoIcon} />
                </AvatarBadge>
              </Avatar>
            </Pressable>
          </Center>

          {/* 拍照 */}
          <Button
            size="md"
            variant="solid"
            action="primary"
            onPress={handleTakePhoto}>
            <ButtonText>拍照识别</ButtonText>
          </Button>

          <HStack className="justify-between" space="md">
            {/* 上传 */}
            <Button
              size="md"
              variant="solid"
              action="positive"
              className="flex-1"
              onPress={handleUploadImage}
              disabled={isUploading}>
              <ButtonText>{isUploading ? '上传中...' : '上传图片'}</ButtonText>
            </Button>

            {/* 重置 */}
            <Button
              size="md"
              variant="solid"
              action="negative"
              className="flex-1"
              onPress={() => clearImage()}>
              <ButtonText>重置</ButtonText>
            </Button>
          </HStack>
        </VStack>
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
