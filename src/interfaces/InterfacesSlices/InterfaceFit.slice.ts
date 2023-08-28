import {
  Excersise,
  ICategoriesExercises,
} from '../InterfacesServices/InterfaceCategories';

export interface IFitSlice {
  categoriesExercises: {
    status: string;
    data: ICategoriesExercises[];
    err: {
      msg: '';
    };
  };
  categoryExercise: {
    id: null | number;
    exercises: Excersise[];
    nameCategory: string;
  };
  initialIndexScreen: number;
  exercisesCompleted: {
    type: string;
    indexTo: number | null;
    completed: {id: null | string; status: string}[];
  }[];
}
