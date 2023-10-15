import {
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../Navigations/StackNavigator';
import {styles} from './stylesheetWorkout';
import {CardWorkout} from '../../Components/Card/CardWorkout/CardWorkout';
import {
  colorsPrimary,
  useAppDispatch,
  useAppSelector,
} from '../../Globales/globales';
import {IconBack} from '../../Components/Icons/IconBack';
import {
  setCategoryExercise,
  setInitialIndexScreen,
  setResetExercise,
} from '../../Store/Slices/fitSlices';
import {storeInterface} from '../../Store/store';
import {useNavigation} from '@react-navigation/native';
import {TTypeExercise} from '../../interfaces';

export type Props = NativeStackScreenProps<RootStackParamList, 'Workout'>;

const WorkoutScreen = ({route, navigation}: Props) => {
  const navigate = useNavigation();
  const dispatch = useAppDispatch();

  const {id, image, excersises, name} = route.params;
  const {
    exercisesCompleted,
    categoryExercise: {exercises},
  } = useAppSelector((store: storeInterface) => store.fit);

  const isCompletedExercises: boolean =
    exercisesCompleted[id].indexTo === exercises.length &&
    exercisesCompleted[id].completed.length === excersises.length;

  useEffect(() => {
    dispatch(
      setCategoryExercise({id, exercises: excersises, nameCategory: name}),
    );
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Image style={styles.imageWorkoutHeader} source={{uri: image}} />

      <IconBack onPress={() => navigate.goBack()} />

      <ScrollView
        alwaysBounceVertical
        contentContainerStyle={{backgroundColor: colorsPrimary.white}}
        showsVerticalScrollIndicator={false}>
        <CardWorkout index={id} navigateTo={() => {}} exersises={excersises} />
      </ScrollView>

      {isCompletedExercises ? (
        <TouchableOpacity
          onPress={() => {
            dispatch(
              setResetExercise({
                type: exercisesCompleted[id].type as TTypeExercise,
              }),
            );
          }}
          style={styles.buttonStart}>
          <Text style={styles.buttonStartText}>Restart</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            if (exercisesCompleted[id].type === name) {
              dispatch(
                setInitialIndexScreen(Number(exercisesCompleted[id].indexTo)),
              );
            }
            navigation.navigate('DetailFit');
          }}
          style={styles.buttonStart}>
          <Text style={styles.buttonStartText}>Start</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default WorkoutScreen;
