import { View, Text } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from '../../Screens/Workout/stylesheetWorkout';
import { colorsPrimary } from '../../Globales/globales';
import { useNavigation } from '@react-navigation/native';

export const IconBack = () => {
  const navigate = useNavigation()
  return (
    <Icon
      onPress={() => navigate.goBack()}
      style={styles.iconBack}
      name="arrow-back"
      size={28}
      color={colorsPrimary.white}
    />
  );
};
