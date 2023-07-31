import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React, { useRef } from 'react';
import { MainStackScreenProps } from '@navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCitiesDataRandomizer } from '@hooks';
import { Button } from '@primitives';
import { CityCard } from '@components';
import { useGameState } from '@context';
import { CityCardRef } from '@components/CityCard';

type Props = MainStackScreenProps<'Game'>;

const GameScreen = ({}: Props) => {
  const { cities, isLoading, randomize } = useCitiesDataRandomizer();
  const { currentAnswers } = useGameState();
  const cardRefs = useRef<Array<CityCardRef | null>>([]);

  const onChoose = () => {
    setTimeout(() => {
      cardRefs.current.map((ref, index) => {
        setTimeout(() => {
          ref?.resetAnimations(true);
          if (index === cardRefs.current.length - 1) {
            randomize();
          }
        }, 2000);
      });
    }, 500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {isLoading ? (
          <ActivityIndicator size={'large'} />
        ) : (
          cities.map((city, index) => (
            <CityCard
              key={index}
              {...city}
              ref={(ref) => (cardRefs.current[index] = ref)}
              isCorrect={currentAnswers.includes(city.city)}
              onChoose={onChoose}
            />
          ))
        )}
      </View>
      {/* <Button title={'Randomize'} onPress={onChoose} /> */}
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
