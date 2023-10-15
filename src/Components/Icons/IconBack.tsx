
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from '../../Screens/Workout/stylesheetWorkout';
import { colorsPrimary } from '../../Globales/globales';


interface IIconBack {
  onPress: () => void
}

export const IconBack = ({ onPress }: IIconBack) => {

  return (
    <Icon
      onPress={onPress}
      style={styles.iconBack}
      name="arrow-back"
      size={28}
      color={colorsPrimary.white}
    />
  );
};
