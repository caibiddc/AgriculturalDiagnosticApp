import {logoutApi} from '@/api/modules/user';
import LogoutAlertDialog from '@/components/dialog/LogoutAlertDialog';
import {Button, ButtonText} from '@/components/ui/button';
import {Heading} from '@/components/ui/heading';
import {Toast, ToastTitle, useToast} from '@/components/ui/toast';
import {useAppDispatch} from '@/hooks';
import {ProfileScreenProps} from '@/routes/types';
import {setAuthenticated, setToken} from '@/store/modules/authSlice';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';

const ProfileScreen: React.FC<ProfileScreenProps> = () => {
  const [openLogoutAlertDialog, setOpenLogoutAlertDialog] = useState(false);

  return (
    <SafeAreaView>
      <Heading size="2xl">Main</Heading>
      <Button
        onPress={() => {
          setOpenLogoutAlertDialog(true);
        }}>
        <ButtonText className="font-medium">退出登陆</ButtonText>
      </Button>
      <LogoutAlertDialog
        openLogoutAlertDialog={openLogoutAlertDialog}
        setOpenLogoutAlertDialog={setOpenLogoutAlertDialog}
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;
