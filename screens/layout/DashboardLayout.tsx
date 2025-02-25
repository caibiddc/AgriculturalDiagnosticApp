import {Box} from '@/components/ui/box';
import {HStack} from '@/components/ui/hstack';
import {VStack} from '@/components/ui/vstack';
import {useState} from 'react';
import MobileHeader from './MobileHeader';
import Sidebar from './Sidebar';

const DashboardLayout = (props: any) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(
    props.isSidebarVisible,
  );
  //   function toggleSidebar() {
  //     setIsSidebarVisible(!isSidebarVisible);
  //   }

  return (
    <VStack className="h-full w-full bg-background-0">
      <Box className="md:hidden">
        <MobileHeader title={props.title} />
      </Box>
      {/* <Box className="hidden md:flex">
        <WebHeader toggleSidebar={toggleSidebar} title={props.title} />
      </Box> */}
      <VStack className="h-full w-full">
        <HStack className="h-full w-full">
          <Box className="hidden md:flex h-full">
            {isSidebarVisible && <Sidebar />}
          </Box>
          <VStack className="w-full flex-1">{props.children}</VStack>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default DashboardLayout;
