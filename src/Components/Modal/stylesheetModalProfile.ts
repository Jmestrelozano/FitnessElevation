import {StyleSheet} from 'react-native';
import {colorsPrimary} from '../../Globales';

export const styles = StyleSheet.create({
  portal: {
    zIndex: 1,
    position: 'absolute',
    backgroundColor: colorsPrimary.black,
    opacity: 0.7,
    height: '100%',
    width: '100%',
  },
  modalContainer: {flex: 1, justifyContent: 'center'},
  modalLayout: {
    margin: 20,
    backgroundColor: colorsPrimary.white,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalView: {display: 'flex', flexDirection: 'column', width: '100%'},
  containerIcon: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  titleModal: {
    fontWeight: 'bold',
    fontSize: 20,
    color: colorsPrimary.black,
    marginBottom: 15,
  },
  containerTextInput: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    height: 45,
    borderColor: colorsPrimary.blue,
    marginBottom: 10,
  },
  buttonSave: {
    marginTop: 25,
    borderRadius: 15,
    width: '100%',
    backgroundColor: colorsPrimary.blue,
    paddingHorizontal: 10,
    paddingVertical: 13,
  },
  textButtonSave: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: colorsPrimary.white,
    fontSize: 15,
  },
});
