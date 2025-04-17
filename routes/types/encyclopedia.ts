import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {EncyclopediaStackParamList} from '../module/EncyclopediaNavigator';

export type EncyclopediaScreenProps = NativeStackScreenProps<
  EncyclopediaStackParamList,
  'EncyclopediaIndex'
>;

export type DiseaseDetailScreenProps = NativeStackScreenProps<
  EncyclopediaStackParamList,
  'DiseaseDetail'
>;
