import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SystemBars } from 'react-native-bars';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import { StyleSheet } from 'react-native';
import { LightTheme, MainStack } from '@navigation';
import { GameContext } from '@context';
import { Game } from '@utils';

enableScreens(true);

const App = () => {
  return (
    <GameContext.Provider value={new Game()}>
      <GestureHandlerRootView style={styles.container}>
        <SystemBars animated={true} barStyle={'dark-content'} />
        <NavigationContainer theme={LightTheme}>
          <MainStack />
        </NavigationContainer>
      </GestureHandlerRootView>
    </GameContext.Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
