import {StyleSheet} from 'react-native';
import {colorsPrimary} from '../../../Globales/globales';

export const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardImage: {
    width: '85%',
    borderRadius: 8,
    height: 140,
    resizeMode: 'contain',
  },
  cardTitle: {
    position: 'absolute',
    color: colorsPrimary.white,
    fontSize: 16,
    fontWeight: 'bold',
    left: 45,
    top: 15,
  },
  cardIcon: {
    position: 'absolute',
    color: colorsPrimary.white,
    bottom: 15,
    left: 35,
  },
});
