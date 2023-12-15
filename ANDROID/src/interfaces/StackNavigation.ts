import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

type TRootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Room: undefined;
  Game: undefined;
  Result: undefined;
};

export type TStackNavigation = NativeStackNavigationProp<TRootStackParamList>;
