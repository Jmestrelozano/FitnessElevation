import {Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootStackParamList} from '../../Navigations/StackNavigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  setExercisesCompleted,
  setInitialIndexScreen,
} from '../../Store/Slices/fitSlices';
import {storeInterface} from '../../Store/store';

import {
  dimensions,
  useAppDispatch,
  useAppSelector,
} from '../../Globales/globales';

import {styles} from './stylesheetDetailsFit';

export type Props = NativeStackScreenProps<RootStackParamList, 'DetailFit'>;

export const DetailsFitScreen = ({route, navigation}: Props) => {
  const dispatch = useAppDispatch();
  const {
    initialIndexScreen,
    categoryExercise: {exercises, nameCategory, id: idCompletedExercise},
    exercisesCompleted,
  } = useAppSelector((store: storeInterface) => store.fit);

  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [secExercise, setSecExercise] = useState<number>(0);
  const {name, image, sets, id} = exercises[initialIndexScreen];

  const {hp} = dimensions;

  useEffect(() => {
    const isFinished = exercises.length - 1 === initialIndexScreen;

    if (isFinished) {
      setIsCompleted(isFinished);
      return;
    }

    setIsCompleted(false);
  }, [initialIndexScreen]);

  const isDuplicate = exercisesCompleted[idCompletedExercise].completed.some(
    item => item.id === id && item.status === 'filled',
  );

  const onCompletedExercise = (isReplace?: boolean): void => {
    if (!isDuplicate) {
      dispatch(
        setExercisesCompleted({
          index: initialIndexScreen + 1,
          type: nameCategory,
          data: {id, status: 'filled', secExercise},
        }),
      );

      if (isReplace) {
        navigation.replace('Home');
        return;
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSecExercise(prevSec => prevSec + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <FastImage
        style={styles.cardImage}
        source={{
          uri: image,
          priority: FastImage.priority.normal,
          cache: FastImage.cacheControl.immutable,
        }}
        resizeMode={FastImage.resizeMode.stretch}
      />
      <View style={styles.container}>
        <View style={styles.col_1}>
          <Text style={styles.cardTitle}>{name}</Text>
          <Text style={{...styles.cardTitle, marginTop: hp(2), fontSize: 25}}>
            x{sets}
          </Text>

          {isCompleted ? (
            <TouchableOpacity
              onPress={() => {
                onCompletedExercise(true);
                navigation.replace('Home');
              }}
              style={styles.button}>
              <Text style={styles.textButton}>Complete</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                onCompletedExercise();
                dispatch(setInitialIndexScreen(initialIndexScreen + 1));
                navigation.replace('BreakExercise');
              }}
              style={styles.button}>
              <Text style={styles.textButton}>Next</Text>
            </TouchableOpacity>
          )}
        </View>

        {initialIndexScreen > 0 && (
          <View style={styles.col_2}>
            <TouchableOpacity
              onPress={() => {
                dispatch(setInitialIndexScreen(initialIndexScreen - 1));
                navigation.replace('DetailFit');
              }}
              style={styles.buttonNavigation}>
              <Text style={styles.textNavigation}>Previous</Text>
              <Icon name="skip-previous" color="grey" size={30} />
            </TouchableOpacity>

            {!isCompleted ? (
              <>
                <Text style={{color: 'grey', alignSelf: 'center'}}>|</Text>
                <TouchableOpacity
                  onPress={() => {
                    onCompletedExercise();

                    dispatch(setInitialIndexScreen(initialIndexScreen + 1));
                    navigation.replace('BreakExercise');
                  }}
                  style={styles.buttonNavigation}>
                  <Text style={styles.textNavigation}>Skip</Text>
                  <Icon name="skip-next" color="grey" size={30} />
                </TouchableOpacity>
              </>
            ) : (
              <></>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
