import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { MainStackScreenProps } from '@navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCitiesDataRandomizer } from '@hooks';
import { Button } from '@primitives';
import { CityCard } from '@components';

type Props = MainStackScreenProps<'Game'>;

const GameScreen = ({}: Props) => {
  const { cities, isLoading, randomize } = useCitiesDataRandomizer();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {isLoading ? (
          <ActivityIndicator size={'large'} />
        ) : (
          cities.map((city, index) => <CityCard key={index} {...city} />)
        )}
      </View>
      <Button title={'Randomize'} onPress={randomize} />
    </SafeAreaView>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
