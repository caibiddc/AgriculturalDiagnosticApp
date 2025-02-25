import {Box} from '@/components/ui/box';
import {HStack} from '@/components/ui/hstack';
import {VStack} from '@/components/ui/vstack';
import {useAppSelector} from '@/hooks';
import {PropsWithChildren} from 'react';
import MobileHeader from './header/MobileHeader';
import Sidebar from './sidebar';

export interface DashboardLayoutProps extends PropsWithChildren<{}> {
  title: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({title, children}) => {
  const {isAuthenticated} = useAppSelector(state => state.auth);
  const {sidebar} = useAppSelector(state => state.global);

  //   function toggleSidebar() {
  //     setIsSidebarVisible(!isSidebarVisible);
  //   }

  return (
    <VStack className="h-full w-full bg-background-0">
      {isAuthenticated && (
        <Box className="md:hidden">
          <MobileHeader title={title} />
        </Box>
      )}
      {/* <Box className="hidden md:flex">
        <WebHeader toggleSidebar={toggleSidebar} title={props.title} />
      </Box> */}
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
