import {HStack} from '@/components/ui/hstack';
import {ChevronLeftIcon, Icon} from '@/components/ui/icon';
import {Pressable} from '@/components/ui/pressable';
import {Text} from '@/components/ui/text';
import {useNavigation} from '@react-navigation/native';
import {HeartIcon} from 'lucide-react-native';

interface MobileHeaderProps {
  title: string;
}

function MobileHeader(props: MobileHeaderProps) {
  const navigation = useNavigation<any>();
  return (
    <HStack
      className="py-6 px-4 border-b border-border-300 bg-background-0 items-center justify-between"
      space="md">
      <HStack className="items-center" space="sm">
        <Pressable
          onPress={() => {
            navigation.pop();
          }}>
          <Icon as={ChevronLeftIcon} />
        </Pressable>
        <Text className="text-xl">{props.title}</Text>
      </HStack>
      <Icon as={HeartIcon} className="h-8 w-20" />
    </HStack>
  );
}

export default MobileHeader;
