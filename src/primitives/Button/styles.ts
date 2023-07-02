import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width * 0.5,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    overflow: 'hidden',
  },
  text: {
    fontSize: 24,
  },
});

export default styles;
