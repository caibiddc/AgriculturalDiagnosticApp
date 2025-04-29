import {Divider} from '@/components/ui/divider';
import {HStack} from '@/components/ui/hstack';
import {Pressable} from '@/components/ui/pressable';
import {Text} from '@/components/ui/text';
import {VStack} from '@/components/ui/vstack';
import {ProfileParamList} from '@/routes/module/ProfileNavigator';
import {NavigationProp} from '@react-navigation/native';
import React from 'react';

export interface ProfileStatistics {
  navigation: NavigationProp<ProfileParamList & {CreatePassword: undefined}>;
  data?: {
    history: number;
    report: number;
  };
}

const ProfileStatistics: React.FC<ProfileStatistics> = ({navigation, data}) => {
  // 定义菜单项
  const menuItems = [
    {
      label: '诊断历史',
      navigateTo: 'DiagnosisHistory',
      value: data?.history || 0,
    },
    {label: '上报历史', navigateTo: 'ReportHistory', value: data?.report || 0},
  ] as const;

  return (
    <HStack className="items-center gap-1">
      {menuItems.map((item, index) => (
        <React.Fragment key={item.label}>
          <Pressable
            onPress={() => {
              navigation.navigate(item.navigateTo);
            }}>
            {({pressed}) => (
              <VStack
                className={`py-3 px-4 items-center ${
                  pressed ? 'bg-primary-500 rounded-lg' : ''
                }`}
                space="xs">
                <Text
                  className={`font-roboto font-semibold justify-center items-center ${
                    pressed ? 'text-white' : 'text-dark'
                  }`}>
                  {item.value}
                </Text>
                <Text
                  className={`text-xs font-roboto ${
                    pressed ? 'text-white' : 'text-dark'
                  }`}>
                  {item.label}
                </Text>
              </VStack>
            )}
          </Pressable>
          {index < menuItems.length - 1 && (
            <Divider orientation="vertical" className="h-10" />
          )}
        </React.Fragment>
      ))}
    </HStack>
  );
};

export default ProfileStatistics;
