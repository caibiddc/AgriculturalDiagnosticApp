import {Button, ButtonText} from '@/components/ui/button';
import {Icon} from '@/components/ui/icon';
import {VStack} from '@/components/ui/vstack';
import {SplashProps} from '@/routes/types';
import {useColorScheme} from 'nativewind';
import {AuthLayout} from '../layout';
import {GluestackIcon, GluestackIconDark} from './assets/icons/gluestack-icon';

const SplashScreenWithLeftBackground: React.FC<SplashProps> = ({
  navigation,
}) => {
  const {colorScheme} = useColorScheme();
  return (
    <VStack
      className="w-full max-w-[440px] items-center h-full justify-center"
      space="lg">
      {colorScheme === 'dark' ? (
        <Icon as={GluestackIconDark} className="w-[219px] h-10" />
      ) : (
        <Icon as={GluestackIcon} className="w-[219px] h-10" />
      )}
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
