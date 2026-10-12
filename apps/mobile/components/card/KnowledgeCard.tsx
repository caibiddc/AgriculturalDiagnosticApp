import {useAppSelector} from '@/hooks';
import {Box} from '../ui/box';
import {HStack} from '../ui/hstack';
import {ChevronRightIcon, Icon} from '../ui/icon';
import {Image} from '../ui/image';
import {Pressable} from '../ui/pressable';
import {Text} from '../ui/text';
import {useState} from 'react';
import {Sprout} from 'lucide-react-native';

export interface Knowledge {
  title: string;
  url?: string;
  description?: string;
}

export interface KnowledgeCardProps {
  knowledge: Knowledge;
  onPress: () => void;
}

const KnowledgeCard: React.FC<KnowledgeCardProps> = ({knowledge, onPress}) => {
  const {isDark} = useAppSelector(state => state.global.themeConfig);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Pressable
      className={`flex-1 rounded-xl bg-background-0 w-full h-full sm:gap-2 gap-1 flex flex-col lg:p-4 ${
        isDark === false
          ? 'lg:shadow-[0px_0px_4.374px_0px_rgba(38,38,38,0.10)] data-[hover=true]:lg:border data-[hover=true]:border-outline-100'
          : 'lg:shadow-soft-1 lg:border border-outline-50 data-[hover=true]:border-outline-200'
      }`}
      onPress={onPress}>
      <Box className="rounded-lg bg-background-50 px-3 lg:px-6 py-[14px] lg:py-7 aspect-[17/12]">
        {knowledge.url && !imageError ? (
          <Image
            source={{
              uri: knowledge.url,
            }}
            alt={knowledge.title}
            className={`flex-1 rounded lg:rounded-md shadow-[0px_0px_1.998px_0px_rgba(38,38,38,0.10)]`}
            onError={handleImageError}
          />
        ) : (
          <Box className="flex-1 items-center justify-center">
            <Icon as={Sprout} size="xl" className="text-primary-500" />
          </Box>
        )}
      </Box>
      <HStack className="justify-between px-1.5 mt-1">
        <Text className="text-typography-900 font-medium sm:text-base text-sm lg:text-xl">
          {knowledge.title}
        </Text>
        <Icon
          as={ChevronRightIcon}
          size="sm"
          className="text-background-400 lg:hidden"
        />
      </HStack>
    </Pressable>
  );
};

export default KnowledgeCard;
