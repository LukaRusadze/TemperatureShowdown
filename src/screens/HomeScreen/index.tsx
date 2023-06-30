import { StyleSheet } from 'react-native';
import React from 'react';
import { MainStackScreenProps } from '@navigation';
import { Button } from '@primitives';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGameState } from '@context';

type Props = MainStackScreenProps<'Home'>;

const HomeScreen = ({}: Props) => {
  const gameInstance = useGameState();

  const handleGameStart = (difficulty: GameDifficultyLevel) => () => {
    gameInstance.chooseDifficulty(difficulty);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button title={'Easy'} onPress={handleGameStart('Easy')} />
      <Button title={'Medium'} onPress={handleGameStart('Medium')} />
      <Button title={'Hard'} onPress={handleGameStart('Hard')} />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
