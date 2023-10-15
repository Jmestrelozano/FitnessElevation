import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  Excersise,
  ICategoriesExercises,
} from '../../interfaces/InterfacesServices/InterfaceCategories';
import {
  ETypeExercise,
  IFitSlice,
  TTypeExercise,
  typeStatus,
} from '../../interfaces';

const initialState: IFitSlice = {
  categoriesExercises: {
    status: typeStatus.NONE,
    data: [],
    err: {
      msg: '',
    },
  },
  categoryExercise: {id: 0, exercises: [], nameCategory: ''},
  initialIndexScreen: 0,
  exercisesCompleted: [
    {
      type: ETypeExercise.FULL_BODY,
      indexTo: null,
      completed: [],
    },
    {
      type: ETypeExercise.ABS_BEGINNER,
      indexTo: null,
      completed: [],
    },
    {
      type: ETypeExercise.ARM_BEGINNER,
      indexTo: null,
      completed: [],
    },
    {
      type: ETypeExercise.CHEST_BEGINNER,
      indexTo: null,
      completed: [],
    },
  ],
};

export const fitSlices = createSlice({
  name: 'fitSlice',
  initialState: initialState,
  reducers: {
    loadAllCategoriesExercises: state => {
      state.categoriesExercises.status = typeStatus.LOADING;
    },
    allCategoriesExercises: (
      state,
      action: PayloadAction<ICategoriesExercises[]>,
    ) => {
      state.categoriesExercises.data = action.payload;
      state.categoriesExercises.status = typeStatus.SUCCESS;
    },
    errAllCategoriesExercises: (state, action) => {
      state.categoriesExercises.err.msg = action.payload;
      state.categoriesExercises.status = typeStatus.FAILURE;
    },
    setCategoryExercise: (
      state,
      action: PayloadAction<{
        id: number;
        exercises: Excersise[];
        nameCategory: string;
      }>,
    ) => {
      state.categoryExercise = action.payload;
    },

    setInitialIndexScreen: (state, action: PayloadAction<number>) => {
      state.initialIndexScreen = action.payload;
    },
    setExercisesCompleted: (
      state,
      action: PayloadAction<{
        type: string;
        index: number;
        data: {id: string; status: string; secExercise: number};
      }>,
    ) => {
      state.exercisesCompleted.map(d => {
        if (d.type === action.payload.type) {
          d.indexTo = action.payload.index;

          // Verifica si action.payload.data no está ya en el arreglo 'completed'
          const isNotDuplicate = d.completed.every(
            item => item !== action.payload.data,
          );

          if (isNotDuplicate) {
            if (d.completed.length === 0) {
              d.completed = [action.payload.data];
            } else {
              d.completed.push(action.payload.data);
            }
          }
        }
      });
    },
    setResetExercise: (
      state,
      action: PayloadAction<{
        type: TTypeExercise;
      }>,
    ) => {
      state.initialIndexScreen = 0;
      state.exercisesCompleted.map(exercise => {
        if (action.payload.type === exercise.type) {
          exercise.indexTo = 0;
          exercise.completed = [];
        }
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  loadAllCategoriesExercises,
  allCategoriesExercises,
  errAllCategoriesExercises,
  setCategoryExercise,
  setInitialIndexScreen,
  setExercisesCompleted,
  setResetExercise,
} = fitSlices.actions;

export default fitSlices.reducer;
