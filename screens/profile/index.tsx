import {ResUserProfile} from '@/api/interface';
import {getAvatar, getUserProfile} from '@/api/modules/user';
import LogoutAlertDialog from '@/components/dialog/LogoutAlertDialog';
import MainLayout from '@/components/layout/MainLayout';
import MenuList from '@/components/menu/MenuList';
import {Avatar, AvatarBadge, AvatarImage} from '@/components/ui/avatar';
import {Box} from '@/components/ui/box';
import {Button, ButtonIcon, ButtonText} from '@/components/ui/button';
import {Center} from '@/components/ui/center';
import {Divider} from '@/components/ui/divider';
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
import React, {useEffect, useState} from 'react';
import {Image, ScrollView} from 'react-native';

const MainContent: React.FC<ProfileScreenProps> = ({navigation}) => {
  const toast = useToast();

  const [openDialog, setOpenDialog] = useState(false);
  const [imageData, setImageData] = useState<string>();
  const [profileData, setProfileData] = useState<ResUserProfile>({
    username: '未知',
    address: '未知',
  } as ResUserProfile);
  const [userData, setUserData] = useState({
    history: 23,
    report: 123,
    star: 40,
    order: 1,
  });

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
      setProfileData(response.data);
    } catch (error) {
      toast.show({
        placement: 'top right',
        render: ({id}) => (
          <Toast nativeID={id} variant="solid" action="success">
            <ToastTitle>用户信息获取失败！</ToastTitle>
          </Toast>
        ),
      });
    }
  };

  useEffect(() => {
    fetchAvatar();
    fetchProfile();
  }, []);

  return (
    <VStack className="h-full w-full mb-16 md:mb-0">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: isWeb ? 0 : 160,
          flexGrow: 1,
        }}>
        <VStack className="h-full w-full pb-8" space="2xl">
          <Box className="relative w-full md:h-[478px] h-[380px]">
            <Image
              source={require('@/assets/profile/image2.png')}
              style={{width: '100%', height: '100%'}}
              alt="Banner Image"
            />
          </Box>
          <HStack className="absolute pt-6 px-10 hidden md:flex">
            <Text className="text-typography-900 font-roboto">
              home &gt; {` `}
            </Text>
            <Text className="font-semibold text-typography-900 ">profile</Text>
          </HStack>
          <Center className="absolute md:mt-14 mt-6 w-full md:px-10 md:pt-6 pb-4">
            <VStack space="lg" className="items-center">
              <Avatar size="2xl" className="bg-primary-600">
                <AvatarImage
                  alt="Profile Image"
                  style={{width: '100%', height: '100%'}}
                  source={{uri: imageData}}
                />
                <AvatarBadge />
              </Avatar>
              <VStack className="gap-1 w-full items-center">
                <Text size="2xl" className="font-roboto text-dark">
                  {profileData.username}
                </Text>
                <Text className="font-roboto text-sm text-typograpphy-700">
                  {profileData.address}
                </Text>
              </VStack>
              <HStack className="items-center gap-1">
                <VStack className="py-3 px-4 items-center" space="xs">
                  <Text className="text-dark font-roboto font-semibold justify-center items-center">
                    {userData.history}
                  </Text>
                  <Text className="text-dark text-xs font-roboto">
                    诊断历史
                  </Text>
                </VStack>
                <Divider orientation="vertical" className="h-10" />
                <VStack className="py-3 px-4 items-center" space="xs">
                  <Text className="text-dark font-roboto font-semibold">
                    {userData.report}
                  </Text>
                  <Text className="text-dark text-xs font-roboto">
                    上报历史
                  </Text>
                </VStack>
                <Divider orientation="vertical" className="h-10" />
                <VStack className="py-3 px-4 items-center" space="xs">
                  <Text className="text-dark font-roboto font-semibold">
                    {userData.star}
                  </Text>
                  <Text className="text-dark text-xs font-roboto">
                    我的收藏
                  </Text>
                </VStack>
                <Divider orientation="vertical" className="h-10" />
                <VStack className="py-3 px-4 items-center" space="xs">
                  <Text className="text-dark font-roboto font-semibold">
                    {userData.order}
                  </Text>
                  <Text className="text-dark text-xs font-roboto">
                    我的订单
                  </Text>
                </VStack>
              </HStack>
              <Button
                variant="outline"
                action="secondary"
                onPress={() => {
                  // setShowModal(true)
                }}
                className="gap-3 relative">
                <ButtonText className="text-dark">编辑信息</ButtonText>
                <ButtonIcon as={EditIcon} />
              </Button>
            </VStack>
          </Center>
          <VStack className="mx-6" space="2xl">
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
            <MenuList
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
            <MenuList
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
        <LogoutAlertDialog
          openLogoutAlertDialog={openDialog}
          setOpenLogoutAlertDialog={setOpenDialog}
        />
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
