import {
  getAvatar,
  getUserProfile,
  updateUserProfile,
  uploadAvatar,
} from '@/api/modules/user';
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from '@/components/ui/avatar';
import {Box} from '@/components/ui/box';
import {Button, ButtonSpinner, ButtonText} from '@/components/ui/button';
import {Center} from '@/components/ui/center';
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import {Heading} from '@/components/ui/heading';
import {AlertCircleIcon, Icon} from '@/components/ui/icon';
import {Image} from '@/components/ui/image';
import {Input, InputField} from '@/components/ui/input';
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
} from '@/components/ui/modal';
import {Pressable} from '@/components/ui/pressable';
import {VStack} from '@/components/ui/vstack';
import useImagePicker, {ImagePickerResult} from '@/hooks/useImagePicker';
import {zodResolver} from '@hookform/resolvers/zod';
import {SquareX} from 'lucide-react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Keyboard} from 'react-native';
import {z} from 'zod';
import {Toast, ToastTitle, useToast} from '../ui/toast';
import {CameraSparklesIcon} from './assets/icons/camera-sparkles';
import {EditPhotoIcon} from './assets/icons/edit-photo';
import colors from 'tailwindcss/colors';

type userSchemaDetails = z.infer<typeof userSchema>;

const userSchema = z.object({
  name: z.string().min(1, '姓名是必填项').max(100, '姓名不能超过100个字符'),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, '手机号必须是有效的国际电话号码'),
  address: z.string().min(1, '地址是必填项').max(255, '地址不能超过255个字符'),
});

export interface ProfileModalProps {
  showModal: boolean;
  setShowModal: any;
  onSave?: (_data: userSchemaDetails, avatar?: ImagePickerResult) => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  showModal,
  setShowModal,
  onSave,
}) => {
  const ref = useRef(null);
  const {
    control,
    formState: {errors},
    setValue,
    handleSubmit,
    reset,
  } = useForm<userSchemaDetails>({
    resolver: zodResolver(userSchema),
  });
  const {
    image,
    loading: imageLoading,
    takePhoto,
    choosePhoto,
    clearImage,
  } = useImagePicker();
  const toast = useToast();

  const [loading, setLoading] = useState<boolean>(false);
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [imageData, setImageData] = useState<string>();
  const [username, setUsername] = useState<string>('');

  const fetchAvatar = async () => {
    const response = await getAvatar();
    const reader = new FileReader();
    // 将 Blob 转换为 base64 编码
    reader.readAsDataURL(response);
    reader.onloadend = () => {
      const base64Image = reader.result as string;
      setImageData(base64Image);
    };
  };

  const fetchProfile = async () => {
    try {
      const response = await getUserProfile();
      if (response.code !== 200 || !response.data) {
        throw new Error(response.message);
      }
      setValue('name', response.data.name || '');
      setValue('phone', response.data.phone || '');
      setValue('address', response.data.address || '');
      setUsername(response.data.username);
    } catch (error) {
      toast.show({
        placement: 'top right',
        render: ({id}) => (
          <Toast nativeID={id} variant="solid" action="error">
            <ToastTitle>用户信息获取失败！</ToastTitle>
          </Toast>
        ),
      });
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

  useEffect(() => {
    const fetchData = async () => {
      if (showModal) {
        setLoading(true);
        await Promise.all([fetchAvatar(), fetchProfile()]);
        setLoading(false);
      }
    };
    fetchData();
  }, [showModal]);

  const handleKeyPress = () => {
    Keyboard.dismiss();
  };

  const onSubmit = async (_data: userSchemaDetails) => {
    setSaveLoading(true);
    try {
      // 更新用户信息
      const profileResp = await updateUserProfile(_data);
      if (profileResp.code !== 200) {
        throw new Error(profileResp.message);
      }
      // 头像上传处理
      if (image?.uri) {
        if (imageLoading) {
          return;
        } else {
          const formData = new FormData();
          formData.append('file', image);
          const avatarResp = await uploadAvatar(formData);
          if (avatarResp.code !== 200) {
            throw new Error(avatarResp.message);
          }
        }
      }
      toast.show({
        placement: 'top right',
        render: ({id}) => (
          <Toast nativeID={id} variant="solid" action="success">
            <ToastTitle>用户信息更新成功！</ToastTitle>
          </Toast>
        ),
      });
      image ? onSave?.(_data, image) : onSave?.(_data);
      setShowModal(false);
    } catch (error: any) {
      toast.show({
        placement: 'top right',
        render: ({id}) => (
          <Toast nativeID={id} variant="solid" action="error">
            <ToastTitle>{error.message}</ToastTitle>
          </Toast>
        ),
      });
    } finally {
      setSaveLoading(false);
    }
  };

  const onClose = () => {
    clearImage();
    reset();
    setShowModal(false);
    setSaveLoading(false);
    setLoading(false);
    setUsername('');
  };

  return (
    <Modal isOpen={showModal} onClose={onClose} finalFocusRef={ref} size="lg">
      <ModalBackdrop />
      <ModalContent>
        <Box
          className={'w-full h-[180px] md:h-[215px] pb-4 mt-4 md:pb-0 md:mt-0'}>
          <Image
            source={require('@/assets/profile/image2.png')}
            className="w-full h-full mt-8 rounded-2xl md:mt-0 md:rounded-none"
            alt="Banner Image"
          />
        </Box>
        <Pressable
          onPress={handleTakePhoto}
          className="absolute bg-background-500 rounded-full items-center justify-center h-8 w-8 right-12 md:right-6 top-48 md:top-44">
          <Icon as={CameraSparklesIcon} />
        </Pressable>
        <ModalHeader className="absolute w-full">
          <Heading size="2xl" className="text-typography-800 pt-4 pl-4">
            编辑个人信息
          </Heading>
          <ModalCloseButton className="top-2 md:top-0">
            <Icon
              as={SquareX}
              size="md"
              className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
            />
          </ModalCloseButton>
        </ModalHeader>
        <Center className="w-full absolute top-24 md:top-16">
          <Pressable onPress={handleChoosePhoto}>
            <Avatar size="2xl">
              <AvatarImage source={image?.uri ? image : {uri: imageData}} />
              {!imageData && (
                <AvatarFallbackText>{username}</AvatarFallbackText>
              )}
              <AvatarBadge className="justify-center items-center bg-background-500">
                <Icon as={EditPhotoIcon} />
              </AvatarBadge>
            </Avatar>
          </Pressable>
        </Center>
        <ModalBody className="px-3 py-3 md:px-10 md:py-6">
          <VStack space="2xl">
            {/* Name Field */}
            <FormControl isInvalid={!!errors.name}>
              <FormControlLabel className="mb-2">
                <FormControlLabelText>姓名</FormControlLabelText>
              </FormControlLabel>
              <Controller
                name="name"
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input>
                    <InputField
                      placeholder="请输入姓名"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      onSubmitEditing={handleKeyPress}
                      returnKeyType="done"
                    />
                  </Input>
                )}
              />
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} size="md" />
                <FormControlErrorText>
                  {errors?.name?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>

            {/* Phone Field */}
            <FormControl isInvalid={!!errors.phone}>
              <FormControlLabel className="mb-2">
                <FormControlLabelText>手机号码</FormControlLabelText>
              </FormControlLabel>
              <Controller
                name="phone"
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input>
                    <InputField
                      placeholder="请输入手机号"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      onSubmitEditing={handleKeyPress}
                      returnKeyType="done"
                    />
                  </Input>
                )}
              />
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} size="md" />
                <FormControlErrorText>
                  {errors?.phone?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>

            {/* Address Field */}
            <FormControl isInvalid={!!errors.address}>
              <FormControlLabel className="mb-2">
                <FormControlLabelText>地址</FormControlLabelText>
              </FormControlLabel>
              <Controller
                name="address"
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input>
                    <InputField
                      placeholder="请输入地址"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      onSubmitEditing={handleKeyPress}
                      returnKeyType="done"
                    />
                  </Input>
                )}
              />
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} size="md" />
                <FormControlErrorText>
                  {errors?.address?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
            {saveLoading ? (
              <Button disabled>
                <ButtonSpinner color={colors.gray[400]} />
                <ButtonText className="font-medium text-sm ml-2">
                  请稍等...
                </ButtonText>
              </Button>
            ) : (
              <Button onPress={handleSubmit(onSubmit)} className="flex-1 p-2">
                <ButtonText>保存更改</ButtonText>
              </Button>
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ProfileModal;
