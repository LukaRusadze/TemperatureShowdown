import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { MainStackScreenProps } from '@navigation';
import { useGameState } from '@context';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = MainStackScreenProps<'Game'>;

const GameScreen = ({}: Props) => {
  const gameInstance = useGameState();
  return (
    <SafeAreaView>
      <Text>GameScreen</Text>
    </SafeAreaView>
  );
};

export default GameScreen;

const styles = StyleSheet.create({});
