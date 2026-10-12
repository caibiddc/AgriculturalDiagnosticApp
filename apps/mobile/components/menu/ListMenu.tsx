import {LucideIcon} from 'lucide-react-native';
import React from 'react';
import {Divider} from '../ui/divider';
import {Heading} from '../ui/heading';
import {HStack} from '../ui/hstack';
import {Icon} from '../ui/icon';
import {Pressable} from '../ui/pressable';
import {Text} from '../ui/text';
import {VStack} from '../ui/vstack';

interface ListItemType {
  iconName: LucideIcon | typeof Icon;
  subText: string;
  endIcon?: LucideIcon | typeof Icon;
  endContent?: React.ReactNode;
  onPress?: () => void;
}

export type ButtonMenuProps = {
  title?: string;
  items?: ListItemType[];
};

const ListMenu: React.FC<ButtonMenuProps> = ({title, items}) => {
  if (!items) return null;
  return (
    <VStack className="w-full" space="2xl">
      {title && (
        <Heading className="font-roboto" size="xl">
          {title}
        </Heading>
      )}
      <VStack className="py-2 px-4 border rounded-xl border-border-300 justify-between items-center">
        {items.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <Pressable onPress={item.onPress} className="w-full">
                {({pressed}) => (
                  <HStack
                    space="2xl"
                    className={`justify-between items-center w-full flex-1 py-3 px-2 ${
                      pressed && item.onPress ? 'bg-background-100 rounded' : ''
                    }`}>
                    <HStack className="items-center" space="md">
                      <Icon as={item.iconName} className="stroke-[#747474]" />
                      <Text size="lg">{item.subText}</Text>
                    </HStack>
                    {item.endContent
                      ? item.endContent
                      : item.endIcon && <Icon as={item.endIcon} />}
                  </HStack>
                )}
              </Pressable>
              {items.length - 1 !== index && <Divider className="my-1" />}
            </React.Fragment>
          );
        })}
      </VStack>
    </VStack>
  );
};

export default ListMenu;
