import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '@react-navigation/native';
import { AnimatedImageBackground } from '@primitives';

const { width, height } = Dimensions.get('window');

interface Props extends City {}

const CityCard = ({ city, temperature, image }: Props) => {
  const rotateX = useSharedValue(0);
  const { colors } = useTheme();

  const onPress = () => {
    rotateX.value = withTiming(180, undefined, (isFinished) => {
      if (isFinished) {
        rotateX.value = withDelay(1000, withTiming(0));
      }
    });
  };

  const rStyleFront = useAnimatedStyle(
    () => ({ transform: [{ rotateX: rotateX.value + 'deg' }] }),
    [],
  );

  const rStyleBack = useAnimatedStyle(
    () => ({ transform: [{ rotateX: -180 + rotateX.value + 'deg' }] }),
    [],
  );

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          { backgroundColor: colors.primary },
          rStyleFront,
        ]}>
        <Text style={[styles.text, { color: colors.text }]}>{city}</Text>
      </Animated.View>
      <AnimatedImageBackground
        source={{ uri: image }}
        style={[
          styles.content,
          { backgroundColor: colors.primary },
          rStyleBack,
        ]}>
        <Text style={[styles.text]}>{temperature}°C</Text>
      </AnimatedImageBackground>
    </Pressable>
  );
};

export default CityCard;

const styles = StyleSheet.create({
  container: {
    width: width * 0.8,
    height: height * 0.15,
    borderRadius: 12,
  },
  content: {
    ...StyleSheet.absoluteFillObject,
    backfaceVisibility: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    overflow: 'hidden',
  },
  text: {
    color: 'white',
    fontSize: 24,
  },
});
