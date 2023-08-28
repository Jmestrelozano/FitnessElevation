import {View, Text, SafeAreaView, Image, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import {styles} from './stylesheetHome';
import {ItemsHeader} from '../../Components/Items/ItemHeader/ItemsHeader';
import {allCategoriesExercises} from '../../Services/FitServices/allCategoriesExercises.service';
import {useAppDispatch, useAppSelector} from '../../Globales/globales';
import {storeInterface} from '../../Store/store';
import {CardsFitness} from '../../Components/Card/CardsFitness/CardFitness';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../Navigations/StackNavigator';

export type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({navigation}: Props) => {
  const dispatch = useAppDispatch();

  const {data: fitnessCategories} = useAppSelector(
    (store: storeInterface) => store.fit.categoriesExercises,
  );
  useEffect(() => {
    dispatch(allCategoriesExercises());
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.header}>
        <Text style={styles.titleHeader}>Workouts</Text>

        <View style={styles.containerItemsHeader}>
          <ItemsHeader count={0} title="Workouts" />
          <ItemsHeader count={0} title="Kcal" />
          <ItemsHeader count={0} title="Mins" />
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
      <View style={{marginTop: 70, flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {fitnessCategories.length > 0 ? (
            <CardsFitness
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
    </SafeAreaView>
  );
};

export default HomeScreen;
