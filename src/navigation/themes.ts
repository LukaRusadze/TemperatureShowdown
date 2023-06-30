import { DefaultTheme, Theme } from '@react-navigation/native';

const LightTheme: Theme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: '#F14558',
    background: '#FFC2C5',
    text: '#000000',
  },
};

export { LightTheme };
