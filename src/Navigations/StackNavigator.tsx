import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Excersise} from '../interfaces/InterfacesServices/InterfaceCategories';
import BreakExerciseScreen from '../Screens/BreakExercise/BreakExerciseScreen';
import {DetailsFitScreen} from '../Screens/DetailsFit/DetailsFitScreen';
import HomeScreen from '../Screens/Home/HomeScreen';
import WorkoutScreen from '../Screens/Workout/WorkoutScreen';

export type RootStackParamList = {
  Home: undefined;
  Workout: {id: number; image: string; excersises: Excersise[]; name: string};
  DetailFit: undefined;
  BreakExercise: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Workout" component={WorkoutScreen} />
        <Stack.Screen name="DetailFit" component={DetailsFitScreen} />
        <Stack.Screen name="BreakExercise" component={BreakExerciseScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
