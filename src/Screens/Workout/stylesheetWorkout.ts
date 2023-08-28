import {StyleSheet} from 'react-native';
import {colorsPrimary, dimensions} from '../../Globales/globales';

const {wp, hp} = dimensions;
export const styles = StyleSheet.create({
  imageWorkoutHeader: {
    width: wp('100%'),
    height: hp(25),
  },
  iconBack: {
    position: 'absolute',
    top: 20,
    left: 10,
  },
  buttonStart: {
    padding: wp(4),
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: hp(2),
    borderRadius: wp(2),
    width: wp(60),
    backgroundColor: colorsPrimary.blue,
  },
  buttonStartText: {
    textAlign: 'center',
    color: colorsPrimary.white,
    fontSize: 15,
    fontWeight: '600',
  },
});
