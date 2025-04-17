import EncyclopediaScreen from '@/screens/encyclopedia';
import DiseaseDetailScreen from '@/screens/encyclopedia/disease-detail';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export type EncyclopediaStackParamList = {
  EncyclopediaIndex: undefined;
  DiseaseDetail: {diseaseId: number};
};

const Stack = createNativeStackNavigator<EncyclopediaStackParamList>();

const EncyclopediaNavigator = () => (
  <Stack.Navigator initialRouteName="EncyclopediaIndex">
    <Stack.Screen
      name="EncyclopediaIndex"
      component={EncyclopediaScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="DiseaseDetail"
      component={DiseaseDetailScreen}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

export default EncyclopediaNavigator;
