import EncyclopediaScreen from '@/screens/encyclopedia';
import HomeScreen from '@/screens/home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigatorScreenParams} from '@react-navigation/native';
import {IconMap, IconSelectedMap} from '../config/icons';
import ProfileNavigator, {ProfileParamList} from './ProfileNavigator';

export type BottomTabParamList = {
  Home: undefined;
  Encyclopedia: undefined;
  Profile: NavigatorScreenParams<ProfileParamList>;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        const icon = focused
          ? IconSelectedMap[route.name as keyof typeof IconSelectedMap]
          : IconMap[route.name as keyof typeof IconMap];
        return <icon.type size={size} color={color} />;
      },
    })}>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{title: '首页', headerShown: false}}
    />
    <Tab.Screen
      name="Encyclopedia"
      component={EncyclopediaScreen}
      options={{title: '病害百科', headerShown: false}}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileNavigator}
      options={{title: '个人信息', headerShown: false}}
    />
  </Tab.Navigator>
);

export default TabNavigator;
