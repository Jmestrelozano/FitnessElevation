import { View, Text, Pressable, Image } from 'react-native';
import React from 'react';
import { ICategoriesExercises } from '../../../interfaces/InterfacesServices/InterfaceCategories';
import { styles } from './stylesheetCardFit';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colorsPrimary } from '../../../Globales/globales';
interface props {
  data: ICategoriesExercises[];
  action: any;
  arrCompleted: boolean[]
}

export const CardsFitness = ({ data, action, arrCompleted }: props) => {
  return (
    <>
      {data.map((item, index) => {
        return (
          <Pressable
            onPress={() => action(item)}
            style={styles.card}
            key={item.id}>
            <Image style={styles.cardImage} source={{ uri: item.image }} />
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Icon style={{ ...styles.cardIcon, color: arrCompleted[index] ? 'yellow' : colorsPrimary.white }} name="bolt" size={30} />
          </Pressable>
        );
      })}
    </>
  );
};
