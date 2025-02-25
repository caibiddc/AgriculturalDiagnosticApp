import {HStack} from '@/components/ui/hstack';
import {Icon} from '@/components/ui/icon';
import {Pressable} from '@/components/ui/pressable';
import {Text} from '@/components/ui/text';
import {useAppNavigation} from '@/hooks';
import {cn} from '@gluestack-ui/nativewind-utils/cn';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {GlobeIcon, HomeIcon, UserIcon} from 'lucide-react-native';
import {Platform} from 'react-native';

// 定义 footerIcons 项的类型
type FooterIconItem = {
  iconText: string;
  iconName: React.ElementType; // React 组件类型，用于Icon
  screenName: string;
};

interface MobileFooterProps {
  footerIcons?: FooterIconItem[]; // 接收自定义图标和文本的 prop
}

const defaultFooterIcons: FooterIconItem[] = [
  {
    iconText: '首页',
    iconName: HomeIcon,
    screenName: 'Home',
  },
  {
    iconText: '病害百科',
    iconName: GlobeIcon,
    screenName: 'Document',
  },
  {
    iconText: '个人信息',
    iconName: UserIcon,
    screenName: 'Profile',
  },
] as const;

function MobileFooter({footerIcons = defaultFooterIcons}: MobileFooterProps) {
  const navigation = useAppNavigation();

  return (
    <HStack
      className={cn(
        'bg-background-0 justify-between w-full absolute left-0 bottom-0 right-0 p-3 overflow-hidden items-center  border-t-border-300  md:hidden border-t',
        {'pb-5': Platform.OS === 'ios'},
        {'pb-5': Platform.OS === 'android'},
      )}>
      {footerIcons.map((item, index) => (
        <Pressable
          key={index}
          className="px-0.5 flex-1 flex-col items-center"
          onPress={() => {
            //@ts-ignore
            navigation.navigate(item.screenName);
          }}>
          <Icon as={item.iconName} size="md" className="h-[32px] w-[65px]" />
          <Text className="text-xs text-center text-typography-600">
            {item.iconText}
          </Text>
        </Pressable>
      ))}
    </HStack>
  );
}

export default MobileFooter;
