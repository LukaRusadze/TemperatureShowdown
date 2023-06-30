import React from 'react';
import {
  StackNavigationOptions,
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import { StackParamList } from '@navigation';
import { GameScreen, HomeScreen } from '@screens';

const Stack = createStackNavigator<StackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name={'Home'} component={HomeScreen} />
      <Stack.Screen name={'Game'} component={GameScreen} />
    </Stack.Navigator>
  );
};

const screenOptions: StackNavigationOptions = {
  ...TransitionPresets.SlideFromRightIOS,
  headerShown: false,
};

export default MainStack;
export type TypedStackNavigator = typeof Stack;
