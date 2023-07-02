import { Platform, Pressable, PressableProps, Text } from 'react-native';
import React from 'react';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';
import { useTheme } from '@react-navigation/native';
import styles from './styles';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface Props extends PressableProps {
  title: string;
}

const Button = ({ title, onPressIn, onPressOut, ...props }: Props) => {
  const opacity = useSharedValue(1);
  const { colors } = useTheme();

  const _onPressIn: Props['onPressIn'] = (event) => {
    onPressIn?.(event);
    opacity.value = withTiming(0.5, { duration: 100 });
  };

  const _onPressOut: Props['onPressOut'] = (event) => {
    onPressOut?.(event);
    opacity.value = withTiming(1, { duration: 200 });
  };

  return (
    <AnimatedPressable
      android_ripple={{ color: '#00000060', foreground: true }}
      style={[
        styles.container,
        { backgroundColor: colors.primary },
        Platform.OS === 'ios' && { opacity },
      ]}
      {...props}
      onPressIn={_onPressIn}
      onPressOut={_onPressOut}>
      <Text style={[styles.text, { color: colors.text }]}>{title}</Text>
    </AnimatedPressable>
  );
};

export default Button;
