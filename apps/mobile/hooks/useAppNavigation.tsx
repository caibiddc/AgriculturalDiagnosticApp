import {RootStackParamList} from '@/routes/types';
import {NavigationProp, useNavigation} from '@react-navigation/native';

export const useAppNavigation = useNavigation<
  NavigationProp<RootStackParamList>
>;
