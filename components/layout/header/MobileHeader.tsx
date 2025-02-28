import {HStack} from '@/components/ui/hstack';
import {ChevronLeftIcon, Icon} from '@/components/ui/icon';
import {Pressable} from '@/components/ui/pressable';
import {Text} from '@/components/ui/text';
import {useAppNavigation} from '@/hooks';
import {HeartIcon} from 'lucide-react-native';

interface MobileHeaderProps {
  title: string;
  onBackPress?: () => void; // 可选的自定义返回按钮点击事件
}

function MobileHeader({title, onBackPress}: MobileHeaderProps) {
  const navigation = useAppNavigation();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress(); // 调用传入的自定义返回函数
    } else {
      navigation.goBack(); // 默认返回上一页面
    }
  };

  return (
    <HStack
      className="py-6 px-4 border-b border-border-300 bg-background-0 items-center justify-between"
      space="md">
      <HStack className="items-center" space="sm">
        <Pressable onPress={handleBackPress}>
          <Icon as={ChevronLeftIcon} />
        </Pressable>
        <Text className="text-xl">{title}</Text>
      </HStack>
      <Icon as={HeartIcon} className="h-8 w-20" />
    </HStack>
  );
}

export default MobileHeader;
