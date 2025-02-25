import {Button, ButtonText} from '@/components/ui/button';
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
import {SignInProps} from '@/routes/types';
import {zodResolver} from '@hookform/resolvers/zod';
import {Link} from '@react-navigation/native';
import {AlertTriangle} from 'lucide-react-native';
import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Keyboard} from 'react-native';
import {z} from 'zod';
import {AuthLayout} from '../layout';
import {loginApi} from '@/api/modules/auth';
import {useAppDispatch} from '@/hooks';
import {setAuthenticated, setToken} from '@/store/modules/authSlice';
import {localGet, localSet} from '@/utils';

// 登录验证Schema，支持用户名或邮箱
const loginSchema = z.object({
  login: z
    .string()
    .min(1, '请输入用户名或邮箱')
    .email()
    .or(z.string().min(1, '请输入用户名')),
  password: z.string().min(1, '请输入密码'),
  rememberme: z.boolean().optional(),
});

type LoginSchemaType = z.infer<typeof loginSchema>;

const LoginWithLeftBackground: React.FC<SignInProps> = ({navigation}) => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: {errors},
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });
  const toast = useToast();
  const [validated, setValidated] = useState({
    emailValid: true,
    passwordValid: true,
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const [login, password] = await Promise.all([
        localGet('login'),
        localGet('password'),
      ]);
      if (login && password) {
        setValue('login', login);
        setValue('password', password);
        setValue('rememberme', true);
      }
    })();
  }, []);

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      // 发送网络请求，使用 loginApi 来进行登录验证
      const response = await loginApi({
        login: data.login,
        password: data.password,
      });

      if (response.code !== 200) throw new Error(response.message);
      const token = response.data?.token;

      if (token) {
        toast.show({
          placement: 'bottom right',
          render: ({id}) => (
            <Toast nativeID={id} variant="solid" action="success">
              <ToastTitle>登录成功！</ToastTitle>
            </Toast>
          ),
        });

        if (data.rememberme) {
          localSet('login', data.login);
          localSet('password', data.password);
        }

        dispatch(setAuthenticated(true)); // 设置用户为已认证
        dispatch(setToken(token)); // 保存 token

        reset(); // 重置表单
      } else {
        // 如果返回的响应没有 token 或出错
        setValidated({
          emailValid: false,
          passwordValid: false,
        });
        toast.show({
          placement: 'bottom right',
          render: ({id}) => (
            <Toast nativeID={id} variant="solid" action="error">
              <ToastTitle>登录失败，请检查您的用户名或密码</ToastTitle>
            </Toast>
          ),
        });
      }
    } catch (error: any) {
      toast.show({
        placement: 'bottom right',
        render: ({id}) => (
          <Toast nativeID={id} variant="solid" action="error">
            <ToastTitle>登录失败，请稍后重试</ToastTitle>
          </Toast>
        ),
      });
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
          <Text>登录后开始使用“病害智能诊断系统”</Text>
        </VStack>
      </VStack>
      <VStack className="w-full">
        <VStack space="xl" className="w-full">
          <FormControl
            isInvalid={!!errors?.login || !validated.emailValid}
            className="w-full">
            <FormControlLabel>
              <FormControlLabelText>用户名或邮箱</FormControlLabelText>
            </FormControlLabel>
            <Controller
              defaultValue=""
              name="login"
              control={control}
              rules={{
                validate: async value => {
                  try {
                    await loginSchema.parseAsync({login: value});
                    return true;
                  } catch (error: any) {
                    return error.message;
                  }
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input>
                  <InputField
                    placeholder="请输入用户名或邮箱"
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
                {errors?.login?.message ||
                  (!validated.emailValid && '未找到该用户名或邮箱')}
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
