import {
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Navigations/StackNavigator';
import { styles } from './stylesheetWorkout';
import { CardWorkout } from '../../Components/Card/CardWorkout/CardWorkout';
import {
  colorsPrimary,
  useAppDispatch,
  useAppSelector,
} from '../../Globales/globales';
import { IconBack } from '../../Components/Icons/IconBack';
import {
  setCategoryExercise,
  setInitialIndexScreen,
} from '../../Store/Slices/fitSlices';
import { storeInterface } from '../../Store/store';

export type Props = NativeStackScreenProps<RootStackParamList, 'Workout'>;

const WorkoutScreen = ({ route, navigation }: Props) => {
  const dispatch = useAppDispatch();

  const { id, image, excersises, name } = route.params;
  const exercisesCompleted = useAppSelector(
    (store: storeInterface) => store.fit.exercisesCompleted[id],
  );
  useEffect(() => {
    dispatch(
      setCategoryExercise({ id, exercises: excersises, nameCategory: name }),
    );
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image style={styles.imageWorkoutHeader} source={{ uri: image }} />

      <IconBack />

      <ScrollView
        contentContainerStyle={{ backgroundColor: colorsPrimary.white }}
        showsVerticalScrollIndicator={false}>
        <CardWorkout index={id} navigateTo={() => { }} exersises={excersises} />
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          if (exercisesCompleted.type === name) {
            dispatch(setInitialIndexScreen(Number(exercisesCompleted.indexTo)));
          }
          navigation.navigate('DetailFit');
        }}
        style={styles.buttonStart}>
        <Text style={styles.buttonStartText}>Start</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default WorkoutScreen;
