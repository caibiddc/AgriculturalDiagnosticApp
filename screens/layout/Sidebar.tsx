import {Icon} from '@/components/ui/icon';
import {Pressable} from '@/components/ui/pressable';
import {Text} from '@/components/ui/text';
import {VStack} from '@/components/ui/vstack';
import {LucideIcon, SettingsIcon} from 'lucide-react-native';
import {useState} from 'react';
import {ScrollView} from 'react-native';
import {DownloadIcon} from './icons/download';
import {FaqIcon} from './icons/faq';
import {NewsBlogIcon} from './icons/news-blog';
import {ProfileIcon} from './icons/profile';
import {SubscriptionIcon} from './icons/subscription';

type Icons = {
  iconName: LucideIcon | typeof Icon;
  iconText: string;
};
const SettingsList: Icons[] = [
  {
    iconName: ProfileIcon,
    iconText: 'Profile',
  },
  {
    iconName: SettingsIcon,
    iconText: 'Preferences',
  },
  {
    iconName: SubscriptionIcon,
    iconText: 'Subscription',
  },
];
const ResourcesList: Icons[] = [
  {
    iconName: DownloadIcon,
    iconText: 'Downloads',
  },
  {
    iconName: FaqIcon,
    iconText: 'FAQs',
  },
  {
    iconName: NewsBlogIcon,
    iconText: 'News & Blogs',
  },
];

const Sidebar = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [selectedIndexResources, setSelectedIndexResources] =
    useState<number>(0);
  const handlePress = (index: number) => {
    setSelectedIndex(index);
    // router.push("/profile/profile");
  };
  const handlePressResources = (index: number) => {
    setSelectedIndexResources(index);
    // router.push("/profile/profile");
  };
  return (
    <ScrollView className=" h-full" contentContainerStyle={{flexGrow: 1}}>
      <VStack
        className="h-full flex-1 w-[280px] py-4 pr-4 pl-8 items-center border-r border-border-300"
        space="xl">
        <VStack className="w-full px-2 pt-3 pb-4" space="xs">
          <Text className="text-typography-600 px-4 py-2">SETTINGS</Text>
          {SettingsList.map((item, index) => {
            return (
              <Pressable
                onPress={() => handlePress(index)}
                key={index}
                className={`flex-row px-4 py-3 items-center gap-2 rounded
              ${
                index === selectedIndex
                  ? 'bg-background-950 '
                  : 'bg-background-0'
              }
              `}>
                <Icon
                  as={item.iconName}
                  className={`
              ${
                index === selectedIndex
                  ? 'stroke-background-0 fill-background-800'
                  : 'stroke-background-800 fill-none'
              }
              `}
                />
                <Text
                  className={`
              ${
                index === selectedIndex
                  ? 'text-typography-0'
                  : 'text-typography-700'
              }

              `}>
                  {item.iconText}
                </Text>
              </Pressable>
            );
          })}
        </VStack>
        <VStack className="w-full px-2 pt-3 pb-4" space="xs">
          <Text className="text-typography-600 px-4 py-2">RESOURCES</Text>
          {ResourcesList.map((item, index) => {
            return (
              <Pressable
                onPress={() => handlePressResources(index)}
                key={index}
                className={`flex-row px-4 py-3 items-center gap-2 rounded
              ${
                index === selectedIndexResources
                  ? 'bg-background-950 '
                  : 'bg-background-0'
              }
              `}>
                <Icon
                  as={item.iconName}
                  className={`
              ${
                index === selectedIndexResources
                  ? 'stroke-background-0'
                  : 'stroke-background-800'
              }
              
              h-10 w-10
              `}
                />
                <Text
                  className={`
              ${
                index === selectedIndexResources
                  ? 'text-typography-0'
                  : 'text-typography-700'
              }

              `}>
                  {item.iconText}
                </Text>
              </Pressable>
            );
          })}
        </VStack>
      </VStack>
    </ScrollView>
  );
};

export default Sidebar;
