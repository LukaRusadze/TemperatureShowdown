import { DefaultTheme, Theme } from '@react-navigation/native';

const LightTheme: Theme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF',
    text: '#000000',
  },
};

export { LightTheme };
