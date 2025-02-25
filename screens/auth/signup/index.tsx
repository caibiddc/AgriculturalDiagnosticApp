import React, {useState} from 'react';
import {Toast, ToastTitle, useToast} from '@/components/ui/toast';
import {HStack} from '@/components/ui/hstack';
import {VStack} from '@/components/ui/vstack';
import {Heading} from '@/components/ui/heading';
import {Text} from '@/components/ui/text';
import {LinkText} from '@/components/ui/link';
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import {Input, InputField, InputIcon, InputSlot} from '@/components/ui/input';
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from '@/components/ui/checkbox';
import {
  ArrowLeftIcon,
  CheckIcon,
  EyeIcon,
  EyeOffIcon,
  Icon,
} from '@/components/ui/icon';
import {Button, ButtonText, ButtonIcon} from '@/components/ui/button';
import {Keyboard} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {AlertTriangle} from 'lucide-react-native';
import {Pressable} from '@/components/ui/pressable';
import {AuthLayout} from '../layout';
import {SignUpProps} from '@/routes/types';
import {Link} from '@react-navigation/native';

const signUpSchema = z.object({
  email: z.string().min(1, '邮箱是必填项').email('请输入有效的邮箱地址'),
  password: z
    .string()
    .min(6, '密码必须至少为6个字符')
    .regex(new RegExp('.*[A-Z].*'), '密码中必须包含一个大写字母')
    .regex(new RegExp('.*[a-z].*'), '密码中必须包含一个小写字母')
    .regex(new RegExp('.*\\d.*'), '密码中必须包含一个数字')
    .regex(
      new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
      '密码中必须包含一个特殊字符',
    ),
  confirmpassword: z
    .string()
    .min(6, '密码必须至少为6个字符')
    .regex(new RegExp('.*[A-Z].*'), '密码中必须包含一个大写字母')
    .regex(new RegExp('.*[a-z].*'), '密码中必须包含一个小写字母')
    .regex(new RegExp('.*\\d.*'), '密码中必须包含一个数字')
    .regex(
      new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
      '密码中必须包含一个特殊字符',
    ),
  rememberme: z.boolean().optional(),
});
type SignUpSchemaType = z.infer<typeof signUpSchema>;

const SignUpWithLeftBackground: React.FC<SignUpProps> = ({navigation}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
  });
  const toast = useToast();

  const onSubmit = (data: SignUpSchemaType) => {
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
            navigation.goBack();
          }}>
          <Icon
            as={ArrowLeftIcon}
            className="md:hidden stroke-background-800"
            size="xl"
          />
        </Pressable>
        <VStack>
          <Heading className="md:text-center" size="3xl">
            注册
          </Heading>
          <Text>注册并开始使用 Gluestack</Text>
        </VStack>
      </VStack>
      <VStack className="w-full">
        <VStack space="xl" className="w-full">
          <FormControl isInvalid={!!errors.email}>
            <FormControlLabel>
              <FormControlLabelText>邮箱</FormControlLabelText>
            </FormControlLabel>
            <Controller
              name="email"
              defaultValue=""
              control={control}
              rules={{
                validate: async value => {
                  try {
                    await signUpSchema.parseAsync({email: value});
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
                    placeholder="请输入邮箱"
                    type="text"
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
              <FormControlErrorIcon size="md" as={AlertTriangle} />
              <FormControlErrorText>
                {errors?.email?.message}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
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
                    await signUpSchema.parseAsync({
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
                    await signUpSchema.parseAsync({
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
          </FormControl>

          <Controller
            name="rememberme"
            defaultValue={false}
            control={control}
            render={({field: {onChange, value}}) => (
              <Checkbox
                size="sm"
                value="记住我"
                isChecked={value}
                onChange={onChange}
                aria-label="记住我">
                <CheckboxIndicator>
                  <CheckboxIcon as={CheckIcon} />
                </CheckboxIndicator>
                <CheckboxLabel>我接受使用条款和隐私政策</CheckboxLabel>
              </Checkbox>
            )}
          />
        </VStack>

        <VStack className="w-full my-7" space="lg">
          <Button className="w-full" onPress={handleSubmit(onSubmit)}>
            <ButtonText className="font-medium">注册</ButtonText>
          </Button>
        </VStack>
        <HStack className="self-center" space="sm">
          <Text size="md">已经有账号了?</Text>
          <Link screen={'SignIn'}>
            <LinkText
              className="font-medium text-primary-700 group-hover/link:text-primary-600 group-hover/pressed:text-primary-700"
              size="md">
              登录
            </LinkText>
          </Link>
        </HStack>
      </VStack>
    </VStack>
  );
};

export const SignUp: React.FC<SignUpProps> = props => {
  return (
    <AuthLayout>
      <SignUpWithLeftBackground {...props} />
    </AuthLayout>
  );
};
