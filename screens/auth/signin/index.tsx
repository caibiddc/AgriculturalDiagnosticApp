import {Button, ButtonIcon, ButtonText} from '@/components/ui/button';
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from '@/components/ui/checkbox';
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import {Heading} from '@/components/ui/heading';
import {HStack} from '@/components/ui/hstack';
import {
  ArrowLeftIcon,
  CheckIcon,
  EyeIcon,
  EyeOffIcon,
  Icon,
} from '@/components/ui/icon';
import {Input, InputField, InputIcon, InputSlot} from '@/components/ui/input';
import {LinkText} from '@/components/ui/link';
import {Pressable} from '@/components/ui/pressable';
import {Text} from '@/components/ui/text';
import {Toast, ToastTitle, useToast} from '@/components/ui/toast';
import {VStack} from '@/components/ui/vstack';
import {zodResolver} from '@hookform/resolvers/zod';
import {AlertTriangle} from 'lucide-react-native';
import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Keyboard} from 'react-native';
import {z} from 'zod';
import {AuthLayout} from '../layout';
import {SignInProps} from '@/routes/types';
import {Link} from '@react-navigation/native';

const USERS = [
  {
    email: 'gabrial@gmail.com',
    password: 'Gabrial@123',
  },
  {
    email: 'tom@gmail.com',
    password: 'Tom@123',
  },
  {
    email: 'thomas@gmail.com',
    password: 'Thomas@1234',
  },
];

const loginSchema = z.object({
  email: z.string().min(1, '请输入邮箱').email(),
  password: z.string().min(1, '请输入密码'),
  rememberme: z.boolean().optional(),
});

type LoginSchemaType = z.infer<typeof loginSchema>;

const LoginWithLeftBackground: React.FC<SignInProps> = ({navigation}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });
  const toast = useToast();
  const [validated, setValidated] = useState({
    emailValid: true,
    passwordValid: true,
  });

  const onSubmit = (data: LoginSchemaType) => {
    const user = USERS.find(element => element.email === data.email);
    if (user) {
      if (user.password !== data.password)
        setValidated({emailValid: true, passwordValid: false});
      else {
        setValidated({emailValid: true, passwordValid: true});
        toast.show({
          placement: 'bottom right',
          render: ({id}) => {
            return (
              <Toast nativeID={id} variant="solid" action="success">
                <ToastTitle>登录成功！</ToastTitle>
              </Toast>
            );
          },
        });
        reset();
      }
    } else {
      setValidated({emailValid: false, passwordValid: true});
    }
  };
  const [showPassword, setShowPassword] = useState(false);

  const handleState = () => {
    setShowPassword(showState => {
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
            className="md:hidden text-background-800"
            size="xl"
          />
        </Pressable>
        <VStack>
          <Heading className="md:text-center" size="3xl">
            登录
          </Heading>
          <Text>登录后开始使用 智能诊断系统</Text>
        </VStack>
      </VStack>
      <VStack className="w-full">
        <VStack space="xl" className="w-full">
          <FormControl
            isInvalid={!!errors?.email || !validated.emailValid}
            className="w-full">
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
                    await loginSchema.parseAsync({email: value});
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
                {errors?.email?.message ||
                  (!validated.emailValid && '未找到该邮箱')}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
          {/* 密码字段 */}
          <FormControl
            isInvalid={!!errors.password || !validated.passwordValid}
            className="w-full">
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
                    await loginSchema.parseAsync({password: value});
                    return true;
                  } catch (error: any) {
                    return error.message;
                  }
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input>
                  <InputField
                    type={showPassword ? 'text' : 'password'}
                    placeholder="请输入密码"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onSubmitEditing={handleKeyPress}
                    returnKeyType="done"
                  />
                  <InputSlot onPress={handleState} className="pr-3">
                    <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                  </InputSlot>
                </Input>
              )}
            />
            <FormControlError>
              <FormControlErrorIcon as={AlertTriangle} />
              <FormControlErrorText>
                {errors?.password?.message ||
                  (!validated.passwordValid && '密码错误')}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
          <HStack className="w-full justify-between ">
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
                  <CheckboxLabel>记住我</CheckboxLabel>
                </Checkbox>
              )}
            />
            <Link screen="ForgotPassword">
              <LinkText className="font-medium text-sm text-primary-700 group-hover/link:text-primary-600">
                忘记密码?
              </LinkText>
            </Link>
          </HStack>
        </VStack>
        <VStack className="w-full my-7 " space="lg">
          <Button className="w-full" onPress={handleSubmit(onSubmit)}>
            <ButtonText className="font-medium">登录</ButtonText>
          </Button>
        </VStack>
        <HStack className="self-center" space="sm">
          <Text size="md">没有账户?</Text>
          <Link screen="SignUp">
            <LinkText
              className="font-medium text-primary-700 group-hover/link:text-primary-600  group-hover/pressed:text-primary-700"
              size="md">
              注册
            </LinkText>
          </Link>
        </HStack>
      </VStack>
    </VStack>
  );
};

LoginWithLeftBackground.displayName = 'LoginWithLeftBackground';

const SignIn: React.FC<SignInProps> = props => {
  return (
    <AuthLayout>
      <LoginWithLeftBackground {...props} />
    </AuthLayout>
  );
};

SignIn.displayName = 'SignIn';
export default SignIn;
