import MainLayout from '@/components/layout/MainLayout';
import ListMenu from '@/components/menu/ListMenu';
import {ScrollView} from '@/components/ui/scroll-view';
import {Switch} from '@/components/ui/switch';
import {VStack} from '@/components/ui/vstack';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {SystemSettingsProps} from '@/routes/types';
import {setThemeConfig} from '@/store/modules/globalSlice';
import {isWeb} from '@gluestack-ui/nativewind-utils/IsWeb';
import {MoonStar} from 'lucide-react-native';
import React from 'react';
import colors from 'tailwindcss/colors';

const MainContent: React.FC<SystemSettingsProps> = ({navigation}) => {
  const {isDark} = useAppSelector(state => state.global.themeConfig);
  const dispatch = useAppDispatch();

  return (
    <VStack className="h-full w-full mb-16 md:mb-0">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: isWeb ? 0 : 160,
          flexGrow: 1,
        }}>
        <VStack className="mx-6 mt-6" space="2xl">
          <ListMenu
            title="联系我们"
            items={[
              {
                iconName: MoonStar,
                subText: '夜间模式',
                endContent: (
                  <Switch
                    size="md"
                    value={isDark}
                    trackColor={{
                      false: colors.neutral[300],
                      true: colors.neutral[600],
                    }}
                    onToggle={() => {
                      dispatch(setThemeConfig({isDark: !isDark}));
                    }}
                    thumbColor={colors.neutral[50]}
                    ios_backgroundColor={colors.neutral[300]}
                  />
                ),
              },
            ]}
          />
        </VStack>
      </ScrollView>
    </VStack>
  );
};

const SystemSettingsScreen: React.FC<SystemSettingsProps> = props => {
  return (
    <MainLayout>
      <MainContent {...props} />
    </MainLayout>
  );
};

export default SystemSettingsScreen;
