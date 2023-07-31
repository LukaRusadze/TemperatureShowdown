import { Dimensions, Pressable, StyleSheet, Text } from 'react-native';
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import Animated, {
  AnimationCallback,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '@react-navigation/native';
import { AnimatedImageBackground } from '@primitives';
import { COLORS } from '@constants';

const { width, height } = Dimensions.get('window');

interface Props extends City {
  isCorrect: boolean;
  onChoose: () => void;
}

export interface CityCardRef {
  flipCard: (callback?: AnimationCallback) => void;
  resetAnimations: AnimationCallback;
}

const CityCard = forwardRef<CityCardRef, Props>(
  ({ city, temperature, image, isCorrect, onChoose }, ref) => {
    const rotateX = useSharedValue(0);
    const opacity = useSharedValue(1);
    const { colors } = useTheme();

    const flipCard = (callback?: AnimationCallback) => {
      rotateX.value = withTiming(180, undefined, callback);
    };

    const resetAnimations: AnimationCallback = (finished) => {
      'worklet';
      if (finished) {
        rotateX.value = withTiming(0, undefined);
      }
    };

    const flashCard: AnimationCallback = (finished) => {
      'worklet';
      if (finished) {
        opacity.value = withRepeat(
          withTiming(0.1, { duration: 250 }),
          3,
          true,
          (isFinished) => {
            if (!isFinished) {
              return;
            }
            opacity.value = withTiming(1, { duration: 250 }, () =>
              runOnJS(onChoose)(),
            );
          },
        );
      }
    };

    useImperativeHandle(ref, () => ({
      flipCard,
      resetAnimations,
    }));

    const onPress = () => flipCard(flashCard);

    const rStyleFront = useAnimatedStyle(
      () => ({
        transform: [{ rotateX: rotateX.value + 'deg' }],
      }),
      [],
    );

    const rStyleBack = useAnimatedStyle(
      () => ({
        transform: [{ rotateX: -180 + rotateX.value + 'deg' }],
      }),
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
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: isCorrect ? COLORS.RIGHT : COLORS.WRONG },
              { opacity },
            ]}
          />
          <Text style={[styles.text]}>{temperature}°C</Text>
        </AnimatedImageBackground>
      </Pressable>
    );
  },
);

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
