import {Box} from '@/components/ui/box';
import {HStack} from '@/components/ui/hstack';
import {VStack} from '@/components/ui/vstack';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {setSidebar} from '@/store/modules/globalSlice';
import {PropsWithChildren} from 'react';
import MobileHeader from './header/MobileHeader';
import WebHeader from './header/WebHeader';
import Sidebar from './sidebar';

export interface DashboardLayoutProps extends PropsWithChildren<{}> {
  title: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({title, children}) => {
  const {sidebar} = useAppSelector(state => state.global);
  const dispatch = useAppDispatch();

  function toggleSidebar() {
    dispatch(setSidebar(!sidebar));
  }

  return (
    <VStack className="h-full w-full bg-background-0">
      <Box className="md:hidden">
        <MobileHeader title={title} />
      </Box>
      <Box className="hidden md:flex">
        <WebHeader toggleSidebar={toggleSidebar} title={title} />
      </Box>
      <VStack className="h-full w-full">
        <HStack className="h-full w-full">
          <Box className="hidden md:flex h-full">{sidebar && <Sidebar />}</Box>
          <VStack className="w-full flex-1">{children}</VStack>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default DashboardLayout;
