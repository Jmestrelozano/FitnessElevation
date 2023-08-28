import {StyleSheet} from 'react-native';
import {colorsPrimary, dimensions} from '../../Globales/globales';

const {wp, hp} = dimensions;
export const styles = StyleSheet.create({
  cardImage: {width: '100%', height: 270},
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
  col_1: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    height: 270,
  },
  col_2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    paddingHorizontal: 45,
    height: 60,
    alignItems: 'center',
  },
  textNavigation: {color: 'black', textAlign: 'center', fontSize: 18},
  buttonNavigation: {
    width: 100,
    height: 30,
    justifyContent: 'center',
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  cardTitle: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: hp(5),
    fontSize: 30,
    fontWeight: 'bold',
    color: colorsPrimary.black,
  },
  button: {
    backgroundColor: colorsPrimary.blue,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: hp(3),
    borderRadius: wp(3),
    padding: wp(3),
    width: wp(45),
  },
  textButton: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: colorsPrimary.white,
  },
});
