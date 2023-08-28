import {StyleSheet} from 'react-native';
import {colorsPrimary} from '../../Globales/globales';

export const styles = StyleSheet.create({
  header: {
    padding: 10,
    height: 200,
    width: '100%',
    backgroundColor: colorsPrimary.blue,
  },
  titleHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colorsPrimary.white,
  },
  containerItemsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  imageFit: {
    width: '90%',
    height: 120,
    marginTop: 20,
    borderRadius: 7,
  },
});
