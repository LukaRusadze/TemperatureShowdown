import React from 'react';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';

import { StackParamList } from '@navigation';
import { HomeScreen } from '@screens';

const Stack = createStackNavigator<StackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name={'Home'} component={HomeScreen} />
    </Stack.Navigator>
  );
};

const screenOptions: StackNavigationOptions = {
  headerShown: false,
};

export default MainStack;
export type TypedStackNavigator = typeof Stack;
