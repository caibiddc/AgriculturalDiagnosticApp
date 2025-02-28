import {SlidersHorizontal} from 'lucide-react-native';
import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from '../ui/actionsheet';
import {Icon} from '../ui/icon';
import {Pressable} from '../ui/pressable';
import {VStack} from '../ui/vstack';

const Sidebar: React.FC = () => {
  return <VStack className="p-4 bg-typography-100" />;
};

interface FilterActionsheetProps {}

interface FilterActionsheetRef {
  open: () => void;
  close: () => void;
}

const FilterActionsheet = forwardRef<
  FilterActionsheetRef,
  FilterActionsheetProps
>((_, ref) => {
  const [actionsheetVisible, setActionsheetVisible] = useState(false);
  const handleClose = () => setActionsheetVisible(false);
  useImperativeHandle(ref, () => ({
    open: () => setActionsheetVisible(true),
    close: handleClose,
  }));
  return (
    <Actionsheet
      isOpen={actionsheetVisible}
      onClose={handleClose}
      snapPoints={[80]}>
      <ActionsheetBackdrop />
      <ActionsheetContent className="w-full ios:pb-20 android:pb-10">
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        <Sidebar />
      </ActionsheetContent>
    </Actionsheet>
  );
});

export type EncyclopediaFilterProps = Omit<
  React.ComponentProps<typeof Pressable>,
  'onPress'
>;

const EncyclopediaFilter: React.FC<EncyclopediaFilterProps> = props => {
  const filterActionsheetRef = useRef<FilterActionsheetRef>(null);
  const handleFilterPress = () => {
    filterActionsheetRef.current?.open();
  };
  return (
    <>
      <Pressable onPress={handleFilterPress} {...props}>
        {({pressed}) => (
          <VStack className="items-center">
            <Icon
              as={SlidersHorizontal}
              className={`${
                pressed ? 'text-typography-900' : 'text-typography-400'
              }`}
            />
          </VStack>
        )}
      </Pressable>
      <FilterActionsheet ref={filterActionsheetRef} />
    </>
  );
};

export default EncyclopediaFilter;
