import {useState} from 'react';
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
import {Input, InputField, InputIcon, InputSlot} from '@/components/ui/input';
import {ArrowLeftIcon, EyeIcon, EyeOffIcon, Icon} from '@/components/ui/icon';
import {Button, ButtonText} from '@/components/ui/button';
import {Keyboard} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {AlertTriangle} from 'lucide-react-native';
import {Pressable} from '@/components/ui/pressable';
import {AuthLayout} from '@/components/layout/AuthLayout';
import {CreatePasswordProps} from '@/routes/types';

const createPasswordSchema = z.object({
  password: z
    .string()
    .min(6, '密码长度必须至少为6个字符')
    .regex(new RegExp('.*[A-Z].*'), '必须包含一个大写字母')
    .regex(new RegExp('.*[a-z].*'), '必须包含一个小写字母')
    .regex(new RegExp('.*\\d.*'), '必须包含一个数字')
    .regex(
      new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
      '必须包含一个特殊字符',
    ),
  confirmpassword: z
    .string()
    .min(6, '密码长度必须至少为6个字符')
    .regex(new RegExp('.*[A-Z].*'), '必须包含一个大写字母')
    .regex(new RegExp('.*[a-z].*'), '必须包含一个小写字母')
    .regex(new RegExp('.*\\d.*'), '必须包含一个数字')
    .regex(
      new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
      '必须包含一个特殊字符',
    ),
});

type CreatePasswordSchemaType = z.infer<typeof createPasswordSchema>;

const CreatePasswordWithLeftBackground: React.FC<CreatePasswordProps> = ({
  navigation,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<CreatePasswordSchemaType>({
    resolver: zodResolver(createPasswordSchema),
  });
  const toast = useToast();

  const onSubmit = (data: CreatePasswordSchemaType) => {
    if (data.password === data.confirmpassword) {
      toast.show({
        placement: 'bottom right',
        render: ({id}) => {
          return (
            <Toast nativeID={id} variant="solid" action="success">
              <ToastTitle>成功</ToastTitle>
            </Toast>
          );
        },
      });
      reset();
    } else {
      toast.show({
        placement: 'bottom right',
        render: ({id}) => {
          return (
            <Toast nativeID={id} variant="solid" action="error">
              <ToastTitle>密码不匹配</ToastTitle>
            </Toast>
          );
        },
      });
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleState = () => {
    setShowPassword(showState => {
      return !showState;
    });
  };
  const handleConfirmPwState = () => {
    setShowConfirmPassword(showState => {
      return !showState;
    });
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
            navigation.pop();
          }}>
          <Icon
            as={ArrowLeftIcon}
            className="md:hidden stroke-background-800"
            size="xl"
          />
        </Pressable>
        <VStack>
          <Heading className="md:text-center" size="3xl">
            创建新密码
          </Heading>
          <Text className="md:text-center">新密码必须与以前使用的密码不同</Text>
        </VStack>
      </VStack>
      <VStack className="w-full">
        <VStack space="xl" className="w-full">
          <FormControl isInvalid={!!errors.password}>
            <FormControlLabel>
              <FormControlLabelText>密码</FormControlLabelText>
            </FormControlLabel>
            <Controller
              defaultValue=""
              name="password"
              control={control}
              rules={{
                validate: async value => {
                  try {
                    await createPasswordSchema.parseAsync({
                      password: value,
                    });
                    return true;
                  } catch (error: any) {
                    return error.message;
                  }
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input>
                  <InputField
                    className="text-sm"
                    placeholder="请输入密码"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onSubmitEditing={handleKeyPress}
                    returnKeyType="done"
                    type={showPassword ? 'text' : 'password'}
                  />
                  <InputSlot onPress={handleState} className="pr-3">
                    <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                  </InputSlot>
                </Input>
              )}
            />
            <FormControlError>
              <FormControlErrorIcon size="sm" as={AlertTriangle} />
              <FormControlErrorText>
                {errors?.password?.message}
              </FormControlErrorText>
            </FormControlError>
            <FormControlLabel>
              <FormControlLabelText className="text-typography-500">
                密码至少要包含 8 个字符
              </FormControlLabelText>
            </FormControlLabel>
          </FormControl>
          <FormControl isInvalid={!!errors.confirmpassword}>
            <FormControlLabel>
              <FormControlLabelText>确认密码</FormControlLabelText>
            </FormControlLabel>
            <Controller
              defaultValue=""
              name="confirmpassword"
              control={control}
              rules={{
                validate: async value => {
                  try {
                    await createPasswordSchema.parseAsync({
                      password: value,
                    });
                    return true;
                  } catch (error: any) {
                    return error.message;
                  }
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input>
                  <InputField
                    placeholder="确认密码"
                    className="text-sm"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onSubmitEditing={handleKeyPress}
                    returnKeyType="done"
                    type={showConfirmPassword ? 'text' : 'password'}
                  />

                  <InputSlot onPress={handleConfirmPwState} className="pr-3">
                    <InputIcon
                      as={showConfirmPassword ? EyeIcon : EyeOffIcon}
                    />
                  </InputSlot>
                </Input>
              )}
            />
            <FormControlError>
              <FormControlErrorIcon size="sm" as={AlertTriangle} />
              <FormControlErrorText>
                {errors?.confirmpassword?.message}
              </FormControlErrorText>
            </FormControlError>
            <FormControlLabel>
              <FormControlLabelText className="text-typography-500">
                两次密码必须相同
              </FormControlLabelText>
            </FormControlLabel>
          </FormControl>
        </VStack>

        <VStack className="mt-7 w-full">
          <Button className="w-full" onPress={handleSubmit(onSubmit)}>
            <ButtonText className="font-medium">更新密码</ButtonText>
          </Button>
        </VStack>
      </VStack>
    </VStack>
  );
};

const CreatePassword: React.FC<CreatePasswordProps> = props => {
  return (
    <AuthLayout>
      <CreatePasswordWithLeftBackground {...props} />
    </AuthLayout>
  );
};

export default CreatePassword;
