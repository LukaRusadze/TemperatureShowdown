import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { MainStackScreenProps } from '@navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCitiesDataRandomizer } from '@hooks';
import { Button } from '@primitives';

type Props = MainStackScreenProps<'Game'>;

const GameScreen = ({}: Props) => {
  const { cities, isLoading, randomize } = useCitiesDataRandomizer();

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <View>
          {cities.map((city, index) => (
            <View key={index}>
              <Text>{city.city}</Text>
              <Text>{city.temperature}</Text>
            </View>
          ))}
        </View>
      )}
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
});
