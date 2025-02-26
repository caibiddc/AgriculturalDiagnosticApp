import {Icon} from '@/components/ui/icon';
import {Pressable} from '@/components/ui/pressable';
import {Text} from '@/components/ui/text';
import {VStack} from '@/components/ui/vstack';
import {HomeIcon, LucideIcon} from 'lucide-react-native';
import {useState} from 'react';
import {ScrollView} from 'react-native';
import {NewsBlogIcon} from '../icons/news-blog';
import {ProfileIcon} from '../icons/profile';
import {useAppNavigation} from '@/hooks';

type Icons = {
  iconName: LucideIcon | typeof Icon;
  iconText: string;
  screenName: string;
};
const SidebarList: Icons[] = [
  {
    iconName: HomeIcon,
    iconText: '首页',
    screenName: 'Home',
  },
  {
    iconName: NewsBlogIcon,
    iconText: '病害百科',
    screenName: 'Document',
  },
  {
    iconName: ProfileIcon,
    iconText: '个人信息',
    screenName: 'Profile',
  },
];

const Sidebar = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const navigation = useAppNavigation();

  const handlePress = (index: number) => {
    setSelectedIndex(index);
    // @ts-ignore
    navigation.navigate(SidebarList[index].screenName);
  };

  return (
    <ScrollView className=" h-full" contentContainerStyle={{flexGrow: 1}}>
      <VStack
        className="h-full flex-1 w-[280px] py-4 pr-4 pl-8 items-center border-r border-border-300"
        space="xl">
        <VStack className="w-full px-2 pt-3 pb-4" space="xs">
          <Text className="text-typography-600 px-4 py-2">菜单导航</Text>
          {SidebarList.map((item, index) => {
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
      </VStack>
    </ScrollView>
  );
};

export default Sidebar;
