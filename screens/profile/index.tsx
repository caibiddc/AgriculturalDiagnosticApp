import {ResUserProfile} from '@/api/interface';
import {getAvatar, getUserProfile} from '@/api/modules/user';
import LogoutAlertDialog from '@/components/dialog/LogoutAlertDialog';
import MainLayout from '@/components/layout/MainLayout';
import ListMenu from '@/components/menu/ListMenu';
import ProfileModal, {ProfileModalRef} from '@/components/modal/ProfileModal';
import ProfileStatistics from '@/components/statistics/ProfileStatistics';
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from '@/components/ui/avatar';
import {Box} from '@/components/ui/box';
import {Button, ButtonIcon, ButtonText} from '@/components/ui/button';
import {Center} from '@/components/ui/center';
import {HStack} from '@/components/ui/hstack';
import {EditIcon} from '@/components/ui/icon';
import {Text} from '@/components/ui/text';
import {Toast, ToastTitle, useToast} from '@/components/ui/toast';
import {VStack} from '@/components/ui/vstack';
import {ProfileScreenProps} from '@/routes/types';
import {isWeb} from '@gluestack-ui/nativewind-utils/IsWeb';
import {
  ChevronRightIcon,
  CircleHelp,
  LogOut,
  MessageSquareMore,
  RotateCcw,
  Settings,
} from 'lucide-react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Image, RefreshControl, ScrollView} from 'react-native';

const MainContent: React.FC<ProfileScreenProps> = ({navigation}) => {
  const toast = useToast();

  const profileRef = useRef<ProfileModalRef>(null);

  const [refreshing, setRefreshing] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [profileData, setProfileData] = useState<ResUserProfile>();
  const [userData, setUserData] = useState({
    history: 23,
    report: 123,
    star: 40,
    order: 1,
  });

  const fetchProfile = async () => {
    try {
      const profileRes = await getUserProfile();
      if (profileRes.code !== 200 || !profileRes.data) {
        throw new Error(profileRes.message);
      }
      setProfileData(profileRes.data);
      const avatarRes = await getAvatar();
      // 将 Blob 转换为 base64
      const reader = new FileReader();
      reader.readAsDataURL(avatarRes);
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
    } catch (error) {
      console.log(error);
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

  // 处理下拉刷新
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchProfile();
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

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <VStack className="h-full w-full mb-16 md:mb-0">
      {/* 退出确认 */}
      <LogoutAlertDialog
        openLogoutAlertDialog={openDialog}
        setOpenLogoutAlertDialog={setOpenDialog}
      />
      {/* 编辑信息弹窗 */}
      <ProfileModal
        ref={profileRef}
        onSave={(data, avatar) => {
          // @ts-ignore
          setProfileData(prev => {
            return {
              ...prev,
              profile: {
                ...prev?.profile,
                ...data,
              },
            };
          });
          if (avatar) {
            setImageUrl(avatar);
          }
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: isWeb ? 0 : 160,
          flexGrow: 1,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <VStack className="h-full w-full pb-8" space="2xl">
          {/* 信息栏背景 */}
          <Box className="relative w-full md:h-[478px] h-[380px]">
            <Image
              source={require('@/assets/profile/image2.png')}
              style={{width: '100%', height: '100%'}}
              alt="Banner Image"
            />
          </Box>
          <Center className="absolute md:mt-14 mt-6 w-full md:px-10 md:pt-6 pb-4">
            {/* 头像及个人信息 */}
            <VStack space="lg" className="items-center">
              <Avatar size="2xl" className="bg-primary-600">
                <AvatarImage
                  alt="Profile Image"
                  style={{width: '100%', height: '100%'}}
                  source={{uri: imageUrl}}
                />
                {!imageUrl && (
                  <AvatarFallbackText>
                    {profileData?.username}
                  </AvatarFallbackText>
                )}
                {imageUrl && <AvatarBadge />}
              </Avatar>
              <VStack className="gap-1 w-full items-center">
                <Text size="2xl" className="font-roboto text-dark">
                  {profileData?.username}
                </Text>
                <Text className="font-roboto text-sm text-typograpphy-700">
                  {profileData?.profile?.address}
                </Text>
              </VStack>
              {/* 数据统计组件 */}
              <ProfileStatistics navigation={navigation} data={userData} />
              {/* 编辑信息按钮 */}
              <Button
                variant="outline"
                action="secondary"
                onPress={() => {
                  if (profileRef.current) {
                    profileRef.current.openModal(profileData);
                  }
                }}
                className="gap-3 relative">
                <ButtonText className="text-dark">编辑信息</ButtonText>
                <ButtonIcon as={EditIcon} />
              </Button>
            </VStack>
          </Center>
          <VStack className="mx-6" space="2xl">
            {/* 专家问诊 */}
            <HStack
              className="py-5 px-6 border rounded-xl border-border-300 justify-between items-center"
              space="2xl">
              <HStack space="2xl" className="items-center">
                <Box className="md:h-20 md:w-20 h-10 w-10">
                  <Image
                    source={require('@/assets/profile/image1.png')}
                    style={{width: '100%', height: '100%'}}
                    alt="Promo Image"
                  />
                </Box>
                <VStack>
                  <Text className="text-typography-900 text-lg" size="lg">
                    专家问诊
                  </Text>
                  <Text className="font-roboto text-sm md:text-[16px]">
                    对系统智能诊断不满意？
                  </Text>
                </VStack>
              </HStack>
              <Button className="p-0 md:py-2 md:px-4 bg-background-0 active:bg-background-0 md:bg-background-900 ">
                <ButtonText className="md:text-typography-0 text-typography-800 text-sm">
                  联系专家
                </ButtonText>
              </Button>
            </HStack>
            {/* 个人账户菜单 */}
            <ListMenu
              title="个人账户"
              items={[
                {
                  iconName: Settings,
                  subText: '系统设置',
                  endIcon: ChevronRightIcon,
                  onPress: () => {
                    navigation.navigate('SystemSettings');
                  },
                },
                {
                  iconName: RotateCcw,
                  subText: '修改密码',
                  endIcon: ChevronRightIcon,
                  onPress: () => {
                    navigation.navigate('CreatePassword');
                  },
                },
                {
                  iconName: LogOut,
                  subText: '退出登陆',
                  endIcon: ChevronRightIcon,
                  onPress: () => {
                    setOpenDialog(true);
                  },
                },
              ]}
            />
            {/* 联系我们菜单 */}
            <ListMenu
              title="联系我们"
              items={[
                {
                  iconName: CircleHelp,
                  subText: '用户协议及服务条款',
                  endIcon: ChevronRightIcon,
                  onPress: () => {
                    navigation.navigate('UserAgreement');
                  },
                },
                {
                  iconName: MessageSquareMore,
                  subText: '应用反馈',
                  endIcon: ChevronRightIcon,
                  onPress: () => {
                    navigation.navigate('AppFeedback');
                  },
                },
              ]}
            />
          </VStack>
        </VStack>
      </ScrollView>
    </VStack>
  );
};

const ProfileScreen: React.FC<ProfileScreenProps> = props => {
  return (
    <MainLayout>
      <MainContent {...props} />
    </MainLayout>
  );
};

export default ProfileScreen;
