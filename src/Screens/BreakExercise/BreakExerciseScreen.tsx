import {
  View,
  Text,
  SafeAreaView,
  Image,
  Pressable,
  BackHandler,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './stylesheetBreakExercise';
import {IconBack} from '../../Components/Icons/IconBack';
import {
  colorsPrimary,
  useAppDispatch,
  useAppSelector,
} from '../../Globales/globales';
import {storeInterface} from '../../Store/store';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../Navigations/StackNavigator';
import {setInitialIndexScreen} from '../../Store/Slices/fitSlices';
export type Props = NativeStackScreenProps<RootStackParamList, 'BreakExercise'>;
const BreakExerciseScreen = ({navigation, route}: Props) => {
  const {initialIndexScreen, categoryExercise} = useAppSelector(
    (store: storeInterface) => store.fit,
  );
  const dispatch = useAppDispatch();
  const [mins, setMinutes] = useState(0);
  const [secs, setSeconds] = useState(30);
  const [isPaused, setIsPaused] = useState(false);
  const {name, sets} = categoryExercise.exercises[initialIndexScreen];

  const sampleInterval = setInterval(() => {
    if (secs > 0 && !isPaused) {
      setSeconds(secs - 1);
    }
    if (secs === 0 && !isPaused) {
      if (mins === 0) {
        clearInterval(sampleInterval);
      } else {
        setMinutes(mins - 1);
        setSeconds(59);
      }
      return;
    }
  }, 4000);

  useEffect(() => {
    sampleInterval;
    return () => {
      clearInterval(sampleInterval);
    };
  });
  const backAction = () => {
    setIsPaused(true);
    Alert.alert('Salir', 'Estas seguro de salir?', [
      {
        text: 'Cancelar',
        onPress: () => setIsPaused(false),
        style: 'cancel',
      },
      {
        text: 'Salir',
        onPress: () => {
          navigation.popToTop();
          dispatch(setInitialIndexScreen(0));
        },
      },
    ]);
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <IconBack />
        <View style={styles.sectionTime}>
          <Text style={styles.titleTime}>Descanso</Text>
          <Text style={styles.time}>
            {mins < 10 ? `0${mins}` : mins}:{secs < 10 ? `0${secs}` : secs}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: 200,
              marginTop: 3,
            }}>
            <Pressable
              onPress={() => {
                setSeconds(secs + 20);
                if (secs + 20 > 60) {
                  setSeconds(0);
                  setMinutes(mins + 1);
                }
              }}
              style={{
                borderRadius: 20,
                backgroundColor: 'rgba(255,255,255,0.3)',
                width: 90,
                height: 35,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontWeight: 'bold', color: 'white'}}>+20s</Text>
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate('DetailFit')}
              style={{
                borderRadius: 20,
                backgroundColor: 'white',
                width: 90,
                height: 35,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontWeight: 'bold', color: colorsPrimary.blue}}>
                Omitir
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      <View style={styles.containerNextExercise}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <Text style={{color: 'black'}}>
            Proximo{' '}
            <Text>
              {initialIndexScreen + 1}/{categoryExercise.exercises.length}
            </Text>
          </Text>
          <Text style={{color: 'black'}}>{name}</Text>
          <Text style={{color: 'black'}}>x{sets}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BreakExerciseScreen;
