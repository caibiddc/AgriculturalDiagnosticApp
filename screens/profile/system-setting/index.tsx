import MainLayout from '@/components/layout/MainLayout';
import ListMenu from '@/components/menu/ListMenu';
import {Button, ButtonText} from '@/components/ui/button';
import {ChevronDownIcon} from '@/components/ui/icon';
import {Input, InputField} from '@/components/ui/input';
import {ScrollView} from '@/components/ui/scroll-view';
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from '@/components/ui/select';
import {Switch} from '@/components/ui/switch';
import {VStack} from '@/components/ui/vstack';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {SystemSettingsProps} from '@/routes/types';
import {setApiConfig, setThemeConfig} from '@/store/modules/globalSlice';
import {localGet} from '@/utils';
import {isWeb} from '@gluestack-ui/nativewind-utils/IsWeb';
import {MoonStar, Server} from 'lucide-react-native';
import React, {useEffect, useState} from 'react';
import colors from 'tailwindcss/colors';
import {Heading} from '@/components/ui/heading';
import {HStack} from '@/components/ui/hstack';
import {Icon} from '@/components/ui/icon';
import {Text} from '@/components/ui/text';

const MainContent: React.FC<SystemSettingsProps> = ({navigation}) => {
  const {themeConfig, apiConfig} = useAppSelector(state => state.global);
  const dispatch = useAppDispatch();
  const [baseURL, setBaseURL] = useState(apiConfig.baseURL);
  const [protocol, setProtocol] = useState<'http' | 'https'>(
    apiConfig.protocol,
  );

  useEffect(() => {
    const loadApiConfig = async () => {
      const savedConfig = await localGet('api_config');
      if (savedConfig) {
        setBaseURL(savedConfig.baseURL);
        setProtocol(savedConfig.protocol);
      }
    };
    loadApiConfig();
  }, []);

  const handleSaveApiConfig = () => {
    dispatch(
      setApiConfig({
        baseURL,
        protocol,
      }),
    );
  };

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
            title="主题设置"
            items={[
              {
                iconName: MoonStar,
                subText: '夜间模式',
                endContent: (
                  <Switch
                    size="md"
                    value={themeConfig.isDark}
                    trackColor={{
                      false: colors.neutral[300],
                      true: colors.neutral[600],
                    }}
                    onToggle={() => {
                      dispatch(setThemeConfig({isDark: !themeConfig.isDark}));
                    }}
                    thumbColor={colors.neutral[50]}
                    ios_backgroundColor={colors.neutral[300]}
                  />
                ),
              },
            ]}
          />

          <VStack className="w-full" space="2xl">
            <Heading className="font-roboto" size="xl">
              API配置
            </Heading>
            <VStack
              className="py-4 px-6 border rounded-xl border-border-300"
              space="lg">
              <HStack className="items-center" space="md">
                <Icon as={Server} className="stroke-[#747474]" />
                <Text size="lg">服务器地址</Text>
              </HStack>
              <VStack space="sm" className="w-full">
                <Select
                  selectedValue={protocol}
                  onValueChange={value =>
                    setProtocol(value as 'http' | 'https')
                  }>
                  <SelectTrigger variant="outline" size="md">
                    <SelectInput placeholder="选择协议" className="h-12" />
                    <SelectIcon>
                      <ChevronDownIcon />
                    </SelectIcon>
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      <SelectItem label="HTTP" value="http" />
                      <SelectItem label="HTTPS" value="https" />
                    </SelectContent>
                  </SelectPortal>
                </Select>
                <Input
                  variant="outline"
                  size="md"
                  isDisabled={false}
                  isInvalid={false}
                  isReadOnly={false}>
                  <InputField
                    placeholder="输入服务器地址"
                    value={baseURL}
                    onChangeText={setBaseURL}
                  />
                </Input>
                <Button
                  size="md"
                  variant="solid"
                  action="primary"
                  isDisabled={false}
                  isFocusVisible={false}
                  onPress={handleSaveApiConfig}>
                  <ButtonText>保存配置</ButtonText>
                </Button>
              </VStack>
            </VStack>
          </VStack>
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
