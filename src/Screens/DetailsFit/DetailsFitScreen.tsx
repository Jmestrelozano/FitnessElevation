import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootStackParamList} from '../../Navigations/StackNavigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {styles} from './stylesheetDetailsFit';
import {
  dimensions,
  useAppDispatch,
  useAppSelector,
} from '../../Globales/globales';
import {
  setExercisesCompleted,
  setInitialIndexScreen,
} from '../../Store/Slices/fitSlices';
import {storeInterface} from '../../Store/store';
import Icon from 'react-native-vector-icons/MaterialIcons';

export type Props = NativeStackScreenProps<RootStackParamList, 'DetailFit'>;

export const DetailsFitScreen = ({route, navigation}: Props) => {
  const dispatch = useAppDispatch();
  const {
    initialIndexScreen,
    categoryExercise: {exercises, nameCategory},
  } = useAppSelector((store: storeInterface) => store.fit);

  const {name, image, sets, id} = exercises[initialIndexScreen];
  const {wp, hp} = dimensions;

  return (
    <SafeAreaView style={{flex: 1}}>
      <Image
        resizeMethod="scale"
        style={styles.cardImage}
        source={{uri: image}}
      />
      <View style={styles.container}>
        <View style={styles.col_1}>
          <Text style={styles.cardTitle}>{name}</Text>
          <Text style={{...styles.cardTitle, marginTop: hp(2), fontSize: 25}}>
            x{sets}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.replace('BreakExercise');
              dispatch(
                setExercisesCompleted({
                  index: initialIndexScreen + 1,
                  type: nameCategory,
                  data: {id, status: 'filled'},
                }),
              );
              dispatch(setInitialIndexScreen(initialIndexScreen + 1));
            }}
            style={styles.button}>
            <Text style={styles.textButton}>Start</Text>
          </TouchableOpacity>
        </View>

        {initialIndexScreen > 0 && (
          <View style={styles.col_2}>
            <TouchableOpacity
              onPress={() => {
                navigation.replace('DetailFit');
                dispatch(setInitialIndexScreen(initialIndexScreen - 1));
              }}
              style={styles.buttonNavigation}>
              <Text style={styles.textNavigation}>Anterior</Text>
              <Icon name="skip-previous" color="grey" size={30} />
            </TouchableOpacity>
            <Text style={{color: 'grey', alignSelf: 'center'}}>|</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.replace('BreakExercise');
                dispatch(setInitialIndexScreen(initialIndexScreen + 1));
              }}
              style={styles.buttonNavigation}>
              <Text style={styles.textNavigation}>Omitir</Text>
              <Icon name="skip-next" color="grey" size={30} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
