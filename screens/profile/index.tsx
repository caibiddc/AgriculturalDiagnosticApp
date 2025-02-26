import LogoutAlertDialog from '@/components/dialog/LogoutAlertDialog';
import {Avatar, AvatarBadge, AvatarImage} from '@/components/ui/avatar';
import {Box} from '@/components/ui/box';
import {Button, ButtonIcon, ButtonText} from '@/components/ui/button';
import {Center} from '@/components/ui/center';
import {Divider} from '@/components/ui/divider';
import {Heading} from '@/components/ui/heading';
import {HStack} from '@/components/ui/hstack';
import {EditIcon, Icon} from '@/components/ui/icon';
import {Text} from '@/components/ui/text';
import {VStack} from '@/components/ui/vstack';
import {ProfileScreenProps} from '@/routes/types';
import {isWeb} from '@gluestack-ui/nativewind-utils/IsWeb';
import {
  ChevronRightIcon,
  GlobeIcon,
  InboxIcon,
  LucideIcon,
  PhoneIcon,
} from 'lucide-react-native';
import React, {useState} from 'react';
import {Image, ScrollView} from 'react-native';
import MainLayout from '@/components/layout/MainLayout';

interface UserStats {
  friends: string;
  friendsText: string;
  followers: string;
  followersText: string;
  rewards: string;
  rewardsText: string;
  posts: string;
  postsText: string;
}
const userData: UserStats[] = [
  {
    friends: '45K',
    friendsText: 'Friends',
    followers: '500M',
    followersText: 'Followers',
    rewards: '40',
    rewardsText: 'Rewards',
    posts: '346',
    postsText: 'Posts',
  },
];

interface AccountCardType {
  iconName: LucideIcon | typeof Icon;
  subText: string;
  endIcon: LucideIcon | typeof Icon;
}
const accountData: AccountCardType[] = [
  {
    iconName: InboxIcon,
    subText: 'Settings',
    endIcon: ChevronRightIcon,
  },
  {
    iconName: GlobeIcon,
    subText: 'Notifications',
    endIcon: ChevronRightIcon,
  },
  {
    iconName: PhoneIcon,
    subText: 'Rewards',
    endIcon: ChevronRightIcon,
  },
];

const MainContent: React.FC = () => {
  const [openLogoutAlertDialog, setOpenLogoutAlertDialog] = useState(false);
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
              height={100}
              width={100}
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
                  source={require('@/assets/profile/image.png')}
                />
                <AvatarBadge />
              </Avatar>
              <VStack className="gap-1 w-full items-center">
                <Text size="2xl" className="font-roboto text-dark">
                  mmdxiaoxin
                </Text>
                <Text className="font-roboto text-sm text-typograpphy-700">
                  中国
                </Text>
              </VStack>
              <>
                {userData.map((item, index) => {
                  return (
                    <HStack className="items-center gap-1" key={index}>
                      <VStack className="py-3 px-4 items-center" space="xs">
                        <Text className="text-dark font-roboto font-semibold justify-center items-center">
                          {item.friends}
                        </Text>
                        <Text className="text-dark text-xs font-roboto">
                          {item.friendsText}
                        </Text>
                      </VStack>
                      <Divider orientation="vertical" className="h-10" />
                      <VStack className="py-3 px-4 items-center" space="xs">
                        <Text className="text-dark font-roboto font-semibold">
                          {item.followers}
                        </Text>
                        <Text className="text-dark text-xs font-roboto">
                          {item.followersText}
                        </Text>
                      </VStack>
                      <Divider orientation="vertical" className="h-10" />
                      <VStack className="py-3 px-4 items-center" space="xs">
                        <Text className="text-dark font-roboto font-semibold">
                          {item.rewards}
                        </Text>
                        <Text className="text-dark text-xs font-roboto">
                          {item.rewardsText}
                        </Text>
                      </VStack>
                      <Divider orientation="vertical" className="h-10" />
                      <VStack className="py-3 px-4 items-center" space="xs">
                        <Text className="text-dark font-roboto font-semibold">
                          {item.posts}
                        </Text>
                        <Text className="text-dark text-xs font-roboto">
                          {item.postsText}
                        </Text>
                      </VStack>
                    </HStack>
                  );
                })}
              </>
              <Button
                variant="outline"
                action="secondary"
                onPress={() => {
                  // setShowModal(true)
                }}
                className="gap-3 relative">
                <ButtonText className="text-dark">Edit Profile</ButtonText>
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
                    Invite & get rewards
                  </Text>
                  <Text className="font-roboto text-sm md:text-[16px]">
                    Your code r45dAsdeK8
                  </Text>
                </VStack>
              </HStack>
              <Button className="p-0 md:py-2 md:px-4 bg-background-0 active:bg-background-0 md:bg-background-900 ">
                <ButtonText className="md:text-typography-0 text-typography-800 text-sm">
                  Invite
                </ButtonText>
              </Button>
            </HStack>
            <Heading className="font-roboto" size="xl">
              Account
            </Heading>
            <VStack className="py-2 px-4 border rounded-xl border-border-300 justify-between items-center">
              {accountData.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <HStack
                      space="2xl"
                      className="justify-between items-center w-full flex-1 py-3 px-2">
                      <HStack className="items-center" space="md">
                        <Icon as={item.iconName} className="stroke-[#747474]" />
                        <Text size="lg">{item.subText}</Text>
                      </HStack>
                      <Icon as={item.endIcon} />
                    </HStack>
                    {accountData.length - 1 !== index && (
                      <Divider className="my-1" />
                    )}
                  </React.Fragment>
                );
              })}
            </VStack>
            <Heading className="font-roboto" size="xl">
              Preferences
            </Heading>
            <VStack className="py-2 px-4 border rounded-xl border-border-300 justify-between items-center">
              {accountData.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <HStack
                      space="2xl"
                      className="justify-between items-center w-full flex-1 py-3 px-2"
                      key={index}>
                      <HStack className="items-center" space="md">
                        <Icon as={item.iconName} className="stroke-[#747474]" />
                        <Text size="lg">{item.subText}</Text>
                      </HStack>
                      <Icon as={item.endIcon} />
                    </HStack>
                    {accountData.length - 1 !== index && (
                      <Divider className="my-1" />
                    )}
                  </React.Fragment>
                );
              })}
            </VStack>
          </VStack>
          <Button
            onPress={() => {
              setOpenLogoutAlertDialog(true);
            }}>
            <ButtonText className="font-medium">退出登陆</ButtonText>
          </Button>
        </VStack>

        <LogoutAlertDialog
          openLogoutAlertDialog={openLogoutAlertDialog}
          setOpenLogoutAlertDialog={setOpenLogoutAlertDialog}
        />
      </ScrollView>
    </VStack>
  );
};

const ProfileScreen: React.FC<ProfileScreenProps> = () => {
  return (
    <MainLayout>
      <MainContent />
    </MainLayout>
  );
};

export default ProfileScreen;
