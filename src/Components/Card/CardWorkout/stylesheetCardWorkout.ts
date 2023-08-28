import {StyleSheet} from 'react-native';
import {colorsPrimary} from '../../../Globales/globales';

export const styles = StyleSheet.create({
  card: {margin: 10, flexDirection: 'row', alignItems: 'center'},
  cardImg: {width: 90, height: 90},
  title: {fontSize: 17, fontWeight: 'bold', color: colorsPrimary.black},
  desc: {fontSize: 16, marginTop: 4, color: 'gray'},
});
