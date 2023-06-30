import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';

declare module '@navigation' {
  type StackParamList = {
    Home: undefined;
    Game: undefined;
  };

  type MainStackScreenProps<T extends keyof StackParamList> = StackScreenProps<
    StackParamList,
    T
  >;

  type MainStackNavigationProp<T extends keyof StackParamList> =
    StackNavigationProp<StackParamList, T>;

  type MainStackRouteProp<T extends keyof StackParamList> = RouteProp<
    StackParamList,
    T
  >;
}
