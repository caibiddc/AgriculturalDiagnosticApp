import {useAppSelector} from '@/hooks';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';
import CreatePassword from '@/screens/auth/create-password';

// 根 Stack 参数类型
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  CreatePassword: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainStackNavigator = () => {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

  return (
    <Stack.Navigator initialRouteName={isAuthenticated ? 'Main' : 'Auth'}>
      {isAuthenticated ? (
        <>
          <Stack.Screen
            name="Main"
            component={TabNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CreatePassword"
            component={CreatePassword}
            options={{headerShown: false}}
          />
        </>
      ) : (
        <Stack.Screen
          name="Auth"
          component={AuthNavigator}
          options={{headerShown: false}}
        />
      )}
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
