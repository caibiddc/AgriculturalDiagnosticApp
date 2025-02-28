import {Button, ButtonText} from '@/components/ui/button';
import {Heading} from '@/components/ui/heading';
import {Icon} from '@/components/ui/icon';
import {VStack} from '@/components/ui/vstack';
import {SplashProps} from '@/routes/types';
import {AuthLayout} from '../layout';
import {LogoIcon} from './assets/icons/logo-icon';

const SplashScreenWithLeftBackground: React.FC<SplashProps> = ({
  navigation,
}) => {
  return (
    <VStack
      className="w-full max-w-[440px] items-center h-full justify-center gap-16"
      space="lg">
      <VStack className="w-full items-center justify-between" space="lg">
        <Icon as={LogoIcon} className="w-full h-10" />
        <Heading size="2xl">病害智能诊断系统</Heading>
      </VStack>
      <VStack className="w-full" space="lg">
        <Button
          className="w-full"
          onPress={() => {
            navigation.navigate('SignIn');
          }}>
          <ButtonText className="font-medium">登陆</ButtonText>
        </Button>
        <Button
          onPress={() => {
            navigation.navigate('SignUp');
          }}>
          <ButtonText className="font-medium">注册</ButtonText>
        </Button>
      </VStack>
    </VStack>
  );
};

export const SplashScreen: React.FC<SplashProps> = props => {
  return (
    <AuthLayout>
      <SplashScreenWithLeftBackground {...props} />
    </AuthLayout>
  );
};
