import {logoutApi} from '@/api/modules/user';
import {Button, ButtonText} from '@/components/ui/button';
import {Heading} from '@/components/ui/heading';
import {SafeAreaView} from '@/components/ui/safe-area-view';
import {Toast, ToastTitle, useToast} from '@/components/ui/toast';
import {useAppDispatch} from '@/hooks';
import {HomeScreenProps} from '@/routes/types';
import {setAuthenticated, setToken} from '@/store/modules/authSlice';
import React from 'react';

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const toast = useToast();

  const logout = async () => {
    // 退出登录
    try {
      const response = await logoutApi();
      if (response.code !== 200) {
        throw new Error(response.message);
      }
      // 清除用户信息
      dispatch(setAuthenticated(false));
      dispatch(setToken(''));
      toast.show({
        placement: 'bottom right',
        render: ({id}) => (
          <Toast nativeID={id} action="success">
            <ToastTitle>退出成功！</ToastTitle>
          </Toast>
        ),
      });
    } catch (e) {
      toast.show({
        placement: 'bottom right',
        render: ({id}) => (
          <Toast nativeID={id} variant="solid" action="error">
            <ToastTitle>退出失败!</ToastTitle>
          </Toast>
        ),
      });
    }
  };
  return (
    <SafeAreaView>
      <Heading size="2xl">Main</Heading>
      <Button
        onPress={() => {
          logout();
        }}>
        <ButtonText className="font-medium">退出登陆</ButtonText>
      </Button>
    </SafeAreaView>
  );
};

export default HomeScreen;
