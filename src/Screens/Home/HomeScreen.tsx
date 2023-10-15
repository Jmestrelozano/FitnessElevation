import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './stylesheetHome';
import {ItemsHeader} from '../../Components/Items/ItemHeader/ItemsHeader';
import {allCategoriesExercises} from '../../Services/FitServices/allCategoriesExercises.service';
import {
  colorsPrimary,
  useAppDispatch,
  useAppSelector,
} from '../../Globales/globales';
import {storeInterface} from '../../Store/store';
import {CardsFitness} from '../../Components/Card/CardsFitness/CardFitness';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../Navigations/StackNavigator';
import {setCategoryExercise} from '../../Store/Slices/fitSlices';
import {ModalProfile} from '../../Components/Modal/ModalProfile';
import Icon from 'react-native-vector-icons/MaterialIcons';

export type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;
const MET: number = 3.5;
const HomeScreen = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  const [arrIsCompleted, setArrIsCompleted] = useState<boolean[]>([]);
  const [totalMinExercise, setTotalMinExercise] = useState<number>(0);
  const [kcal, setKcal] = useState<number>(0);
  const [isModal, setIsModal] = useState<Boolean>(false);

  const {
    categoriesExercises: {data: fitnessCategories},
    exercisesCompleted,
  } = useAppSelector((store: storeInterface) => store.fit);
  const {userProfile} = useAppSelector(
    (store: storeInterface) => store.profile,
  );

  useEffect(() => {
    dispatch(allCategoriesExercises());
  }, []);

  useEffect(() => {
    setCategoryExercise({id: 0, exercises: [], nameCategory: ''});
  }, []);

  useEffect(() => {
    const completed = fitnessCategories.map(
      (fc, index) =>
        fc.name === exercisesCompleted[index].type &&
        fc.excersises.length === exercisesCompleted[index].completed.length,
    );
    setArrIsCompleted(completed);

    const reduceExercisesCompleted = exercisesCompleted.map(exerciseCompleted =>
      exerciseCompleted.completed.reduce(
        (previousValue, currentValue) =>
          previousValue + currentValue.secExercise,
        0,
      ),
    );

    const totalMinutes = Number(
      reduceExercisesCompleted.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        0,
      ) / 60,
    ).toFixed(2);

    setTotalMinExercise(Number(totalMinutes));
  }, [exercisesCompleted, fitnessCategories]);

  const totalWorkout = arrIsCompleted.filter(isCompleted => isCompleted).length;

  useEffect(() => {
    if (!userProfile.name) {
      setIsModal(true);
    }
  }, []);

  useEffect(() => {
    setKcal(totalMinExercise * MET * Number(userProfile.weight));
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.header}>
        <View
          style={{
            marginVertical: 10,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.titleHeader}>Workouts</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setIsModal(true)}>
            <Icon name="person" color={colorsPrimary.white} size={30} />
          </TouchableOpacity>
        </View>

        <View style={styles.containerItemsHeader}>
          <ItemsHeader count={totalWorkout} title="Workouts" />
          <ItemsHeader count={Number(kcal.toFixed(0))} title="Kcal" />
          <ItemsHeader count={totalMinExercise} title="Mins" />
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            style={styles.imageFit}
            source={{
              uri: 'https://cdn-images.cure.fit/www-curefit-com/image/upload/c_fill,w_842,ar_1.2,q_auto:eco,dpr_2,f_auto,fl_progressive/image/test/sku-card-widget/gold2.png',
            }}
          />
        </View>
      </View>
      <View style={{marginTop: 85, flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {fitnessCategories.length > 0 ? (
            <CardsFitness
              arrCompleted={arrIsCompleted}
              action={(item: any) =>
                navigation.navigate('Workout', {
                  id: item.id,
                  image: item.image,
                  excersises: item.excersises,
                  name: item.name,
                })
              }
              data={fitnessCategories}
            />
          ) : (
            <Text>Cargando</Text>
          )}
        </ScrollView>
      </View>

      {isModal ? (
        <ModalProfile
          isModal={isModal}
          onCloseModal={() => setIsModal(false)}
        />
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
