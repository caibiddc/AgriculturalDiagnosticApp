import {HStack} from '@/components/ui/hstack';
import {Icon} from '@/components/ui/icon';
import {Pressable} from '@/components/ui/pressable';
import {Text} from '@/components/ui/text';
import {cn} from '@gluestack-ui/nativewind-utils/cn';
import {useNavigation} from '@react-navigation/native';
import {Platform} from 'react-native';

// 定义footerIcons项的类型
type FooterIconItem = {
  iconText: string;
  iconName: React.ElementType;
  screenName: string;
};

interface MobileFooterProps {
  footerIcons: FooterIconItem[];
}

function MobileFooter({footerIcons}: MobileFooterProps) {
  const navigation = useNavigation<any>();
  return (
    <HStack
      className={cn(
        'bg-background-0 justify-between w-full absolute left-0 bottom-0 right-0 p-3 overflow-hidden items-center  border-t-border-300  md:hidden border-t',
        {'pb-5': Platform.OS === 'ios'},
        {'pb-5': Platform.OS === 'android'},
      )}>
      {footerIcons.map((item, index) => {
        return (
          <Pressable
            className="px-0.5 flex-1 flex-col items-center"
            key={index}
            onPress={() => {
              navigation.navigate(item.screenName);
            }}>
            <Icon as={item.iconName} size="md" className="h-[32px] w-[65px]" />
            <Text className="text-xs text-center text-typography-600">
              {item.iconText}
            </Text>
          </Pressable>
        );
      })}
    </HStack>
  );
}

export default MobileFooter;
