import {useAppDispatch} from '@/hooks';
import React from 'react';
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from '../ui/alert-dialog';
import {Button, ButtonText} from '../ui/button';
import {Heading} from '../ui/heading';
import {CloseIcon, Icon} from '../ui/icon';
import {Text} from '../ui/text';
import {Toast, ToastTitle, useToast} from '../ui/toast';
import {logoutApi} from '@/api/modules/user';
import {setAuthenticated, setToken} from '@/store/modules/authSlice';

const LogoutAlertDialog = ({
  openLogoutAlertDialog,
  setOpenLogoutAlertDialog,
}: any) => {
  const dispatch = useAppDispatch();
  const toast = useToast();

  const handleClose = () => {
    setOpenLogoutAlertDialog(false);
  };

  const handleLogout = async () => {
    // 退出登录
    try {
      // const response = await logoutApi();
      // if (response.code !== 200) {
      //   throw new Error(response.message);
      // }
      // 清除用户信息
      dispatch(setAuthenticated(false));
      dispatch(setToken(''));
      toast.show({
        placement: 'top right',
        render: ({id}) => (
          <Toast nativeID={id} action="success">
            <ToastTitle>退出成功！</ToastTitle>
          </Toast>
        ),
      });
      handleClose();
    } catch (e) {
      toast.show({
        placement: 'top right',
        render: ({id}) => (
          <Toast nativeID={id} variant="solid" action="error">
            <ToastTitle>退出失败!</ToastTitle>
          </Toast>
        ),
      });
    }
  };

  return (
    <AlertDialog isOpen={openLogoutAlertDialog} onClose={handleClose}>
      <AlertDialogBackdrop />
      <AlertDialogContent className="p-4">
        <AlertDialogHeader>
          <Heading>退出登陆</Heading>
          <AlertDialogCloseButton>
            <Icon as={CloseIcon} />
          </AlertDialogCloseButton>
        </AlertDialogHeader>
        <AlertDialogBody className="" contentContainerClassName="">
          <Text className="mb-6">您确定要退出登陆吗?</Text>
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button variant="outline" action="secondary" onPress={handleClose}>
            <ButtonText>取消</ButtonText>
          </Button>
          <Button action="negative" onPress={handleLogout}>
            <ButtonText className="text-white">退出</ButtonText>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutAlertDialog;
