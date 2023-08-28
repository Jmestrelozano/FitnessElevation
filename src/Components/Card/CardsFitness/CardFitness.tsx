import {View, Text, Pressable, Image} from 'react-native';
import React from 'react';
import {ICategoriesExercises} from '../../../interfaces/InterfacesServices/InterfaceCategories';
import {styles} from './stylesheetCardFit';
import Icon from 'react-native-vector-icons/MaterialIcons';
interface props {
  data: ICategoriesExercises[];
  action: any;
}

export const CardsFitness = ({data, action}: props) => {
  return (
    <>
      {data.map(item => {
        return (
          <Pressable
            onPress={() => action(item)}
            style={styles.card}
            key={item.id}>
            <Image style={styles.cardImage} source={{uri: item.image}} />
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Icon style={styles.cardIcon} name="bolt" size={30} />
          </Pressable>
        );
      })}
    </>
  );
};
