import {ResUserProfile} from '@/api/interface';
import {updateUserProfile, uploadAvatar} from '@/api/modules/user';
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
import {ChevronDownIcon, SquareX} from 'lucide-react-native';
import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Keyboard} from 'react-native';
import colors from 'tailwindcss/colors';
import {z} from 'zod';
import {Toast, ToastTitle, useToast} from '../ui/toast';
import {CameraSparklesIcon} from './assets/icons/camera-sparkles';
import {EditPhotoIcon} from './assets/icons/edit-photo';
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
} from '../ui/select';

type userSchemaDetails = z.infer<typeof userSchema>;

const userSchema = z.object({
  gender: z.string().optional(),
  name: z.string().min(0).max(100, '姓名不能超过100个字符').optional(),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, '手机号必须是有效的国际电话号码')
    .optional(),
  address: z.string().min(0).max(255, '地址不能超过255个字符').optional(),
});

export interface ProfileModalProps {
  onSave?: (_data: userSchemaDetails, avatar?: string) => void;
}

export interface ProfileModalRef {
  openModal: (value?: ResUserProfile) => void;
}

const ProfileModal = forwardRef<ProfileModalRef, ProfileModalProps>(
  ({onSave}, ref) => {
    useImperativeHandle(ref, () => ({
      openModal: handleOpenModal,
    }));
    const profileModalRef = useRef(null);
    const [showModal, setShowModal] = useState<boolean>(false);
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

    const handleOpenModal = (values?: ResUserProfile) => {
      if (values && values.profile) {
        setValue('gender', '' + values.profile.gender || '0');
        setValue('name', values.profile.name || '');
        setValue('phone', values.profile.phone || '');
        setValue('address', values.profile.address || '');
        setImageData(values.profile.avatar || '');
        setUsername(values.profile.name || '');
      }
      setShowModal(true);
    };

    // 打开相机拍照
    const handleTakePhoto = () => {
      takePhoto();
    };

    // 从相册选择图片
    const handleChoosePhoto = () => {
      choosePhoto();
    };

    const handleKeyPress = () => {
      Keyboard.dismiss();
    };

    const onSubmit = async (_data: userSchemaDetails) => {
      setSaveLoading(true);
      try {
        // @ts-ignore
        const profileResp = await updateUserProfile({
          ..._data,
          gender: parseInt(_data.gender || '0'),
        });
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
        image ? onSave?.(_data, image.uri) : onSave?.(_data);
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
        console.log('error', error);
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
      <Modal
        isOpen={showModal}
        onClose={onClose}
        finalFocusRef={profileModalRef}
        size="lg">
        <ModalBackdrop />
        <ModalContent>
          <Box
            className={
              'w-full h-[180px] md:h-[215px] pb-4 mt-4 md:pb-0 md:mt-0'
            }>
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
              {/* gender Field */}
              <FormControl isInvalid={!!errors.name} isDisabled={loading}>
                <FormControlLabel className="mb-2">
                  <FormControlLabelText>性别</FormControlLabelText>
                </FormControlLabel>
                <Controller
                  name="gender"
                  control={control}
                  render={({field: {onChange, onBlur, value}}) => (
                    <Select onValueChange={onChange} selectedValue={value}>
                      <SelectTrigger
                        variant="outline"
                        size="md"
                        className="h-12">
                        <SelectInput placeholder="Select" />
                        <SelectIcon className="mr-3" as={ChevronDownIcon} />
                      </SelectTrigger>
                      <SelectPortal>
                        <SelectBackdrop />
                        <SelectContent>
                          <SelectDragIndicatorWrapper>
                            <SelectDragIndicator />
                          </SelectDragIndicatorWrapper>
                          <SelectItem label="隐藏" value="0" />
                          <SelectItem label="男" value="1" />
                          <SelectItem label="女" value="2" />
                        </SelectContent>
                      </SelectPortal>
                    </Select>
                  )}
                />
                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} size="md" />
                  <FormControlErrorText>
                    {errors?.gender?.message}
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>

              {/* Name Field */}
              <FormControl isInvalid={!!errors.name} isDisabled={loading}>
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
              <FormControl isInvalid={!!errors.phone} isDisabled={loading}>
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
              <FormControl isInvalid={!!errors.address} isDisabled={loading}>
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
  },
);

export default ProfileModal;
