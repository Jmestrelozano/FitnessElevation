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
    id: number;
    exercises: Excersise[];
    nameCategory: string;
  };
  initialIndexScreen: number;
  exercisesCompleted: {
    type: string;
    indexTo: number | null;
    completed: { id: null | string; status: string }[];
  }[];
}

export enum ETypeExercise {
  FULL_BODY = 'FULL BODY',
  ABS_BEGINNER = 'ABS BEGINNER',
  ARM_BEGINNER = 'ARM BEGINNER',
  CHEST_BEGINNER = 'CHEST BEGINNER'
}

export type TTypeExercise = 'FULL BODY' | 'ABS BEGINNER' | 'ARM BEGINNER' | 'CHEST BEGINNER'