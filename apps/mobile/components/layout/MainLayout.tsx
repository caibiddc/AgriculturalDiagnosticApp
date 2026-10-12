import {VStack} from '@/components/ui/vstack';
import {PropsWithChildren} from 'react';

export interface DashboardLayoutProps extends PropsWithChildren<{}> {}

const MainLayout: React.FC<DashboardLayoutProps> = ({children}) => {
  return (
    <VStack className="h-full w-full bg-background-0">
      <VStack className="w-full flex-1">{children}</VStack>
    </VStack>
  );
};

export default MainLayout;
