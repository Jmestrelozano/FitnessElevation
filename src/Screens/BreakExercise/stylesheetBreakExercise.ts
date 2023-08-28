import {StyleSheet} from 'react-native';
import {colorsPrimary} from '../../Globales/globales';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorsPrimary.blue,
  },
  sectionTime: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleTime: {
    color: colorsPrimary.white,
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  time: {
    color: colorsPrimary.white,
    fontSize: 60,
    marginTop: 1,
    fontWeight: 'bold',
  },
  containerNextExercise: {
    height: 120,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: colorsPrimary.white,
  },
});
