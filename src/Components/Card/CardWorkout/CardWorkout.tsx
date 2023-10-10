import { Pressable, Text, View } from 'react-native';
import React from 'react';
import { Excersise } from '../../../interfaces/InterfacesServices/InterfaceCategories';
import { styles } from './stylesheetCardWorkout';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAppSelector } from '../../../Globales/globales';
import { storeInterface } from '../../../Store/store';
import FastImage from 'react-native-fast-image';

interface Props {
  exersises: Excersise[];
  navigateTo: (index: number) => void;
  index: number;
}
export const CardWorkout = ({ exersises, navigateTo, index }: Props) => {
  const exercisesCompleted = useAppSelector(
    (store: storeInterface) => store.fit.exercisesCompleted[index],
  );

  return (
    <>
      {exersises.map(({ id, image, name, sets }, index) => {
        return (
          <Pressable
            onPress={() => navigateTo(index)}
            style={styles.card}
            key={id}>

            <FastImage style={styles.cardImg}
              source={{ uri: image, priority: FastImage.priority.normal, cache: FastImage.cacheControl.immutable }}
              resizeMode={FastImage.resizeMode.contain}
              onProgress={e => console.log(e.nativeEvent.loaded / e.nativeEvent.total)}
            />

            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                flex: 1,
                alignItems: 'center',
              }}>
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.title}>{name}</Text>

                <Text style={styles.desc}>x {sets}</Text>
              </View>

              <Icon
                name="check-circle"
                size={30}
                color={
                  exercisesCompleted.completed.some(item => item.id === id)
                    ? '#00CC99'
                    : '#dae0f2'
                }
              />
            </View>
          </Pressable>
        );
      })}
    </>
  );
};
//#00CC99
//#dae0f2
