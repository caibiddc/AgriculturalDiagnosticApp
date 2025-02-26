import {Toast, ToastTitle, useToast} from '@/components/ui/toast';
import {VStack} from '@/components/ui/vstack';
import {Heading} from '@/components/ui/heading';
import {Text} from '@/components/ui/text';
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import {Input, InputField} from '@/components/ui/input';
import {ArrowLeftIcon, Icon} from '@/components/ui/icon';
import {Button, ButtonText} from '@/components/ui/button';
import {Keyboard} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {AlertTriangle} from 'lucide-react-native';
import {Pressable} from '@/components/ui/pressable';
import {AuthLayout} from '../../../components/layout/AuthLayout';
import {ForgotPasswordProps} from '@/routes/types';

const forgotPasswordSchema = z.object({
  email: z.string().min(1, '邮箱是必填项').email('请输入有效的邮箱地址'),
});

type forgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordScreen: React.FC<ForgotPasswordProps> = ({navigation}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<forgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const toast = useToast();

  const onSubmit = (_data: forgotPasswordSchemaType) => {
    toast.show({
      placement: 'bottom right',
      render: ({id}) => {
        return (
          <Toast nativeID={id} variant="solid" action="success">
            <ToastTitle>链接发送成功</ToastTitle>
          </Toast>
        );
      },
    });
    reset();
  };

  const handleKeyPress = () => {
    Keyboard.dismiss();
    handleSubmit(onSubmit)();
  };

  return (
    <VStack className="max-w-[440px] w-full" space="md">
      <VStack className="md:items-center" space="md">
        <Pressable
          onPress={() => {
            navigation.reset({
              index: 1,
              routes: [{name: 'Splash'}, {name: 'SignIn'}],
            });
          }}>
          <Icon
            as={ArrowLeftIcon}
            className="md:hidden stroke-background-800"
            size="xl"
          />
        </Pressable>
        <VStack>
          <Heading className="md:text-center" size="3xl">
            忘记密码?
          </Heading>
          <Text className="text-sm">输入与您的帐户关联的邮箱地址。</Text>
        </VStack>
      </VStack>

      <VStack space="xl" className="w-full ">
        <FormControl isInvalid={!!errors?.email} className="w-full">
          <FormControlLabel>
            <FormControlLabelText>邮箱</FormControlLabelText>
          </FormControlLabel>
          <Controller
            defaultValue=""
            name="email"
            control={control}
            rules={{
              validate: async value => {
                try {
                  await forgotPasswordSchema.parseAsync({email: value});
                  return true;
                } catch (error: any) {
                  return error.message;
                }
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input>
                <InputField
                  placeholder="请输入邮箱"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  onSubmitEditing={handleKeyPress}
                  returnKeyType="done"
                />
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorIcon as={AlertTriangle} />
            <FormControlErrorText>
              {errors?.email?.message}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
        <Button className="w-full" onPress={handleSubmit(onSubmit)}>
          <ButtonText className="font-medium">发送链接</ButtonText>
        </Button>
      </VStack>
    </VStack>
  );
};

export const ForgotPassword: React.FC<ForgotPasswordProps> = props => {
  return (
    <AuthLayout>
      <ForgotPasswordScreen {...props} />
    </AuthLayout>
  );
};
