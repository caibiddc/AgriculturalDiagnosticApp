import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {EncyclopediaStackParamList} from '../module/EncyclopediaNavigator';

export type EncyclopediaScreenProps = NativeStackScreenProps<
  EncyclopediaStackParamList,
  'Encyclopedia'
>;

export type DiseaseDetailScreenProps = NativeStackScreenProps<
  EncyclopediaStackParamList,
  'DiseaseDetail'
>;
