import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {typeStatus} from '../../Globales/globales';
import {
  Excersise,
  ICategoriesExercises,
} from '../../interfaces/InterfacesServices/InterfaceCategories';
import {IFitSlice} from '../../interfaces/InterfacesSlices/InterfaceFit.slice';

const initialState: IFitSlice = {
  categoriesExercises: {
    status: typeStatus.NONE,
    data: [],
    err: {
      msg: '',
    },
  },
  categoryExercise: {id: null, exercises: [], nameCategory: ''},
  initialIndexScreen: 0,
  exercisesCompleted: [
    {
      type: 'FULL BODY',
      indexTo: null,
      completed: [
        {
          id: null,
          status: 'Unfilled',
        },
      ],
    },
    {
      type: 'ABS BEGINNER',
      indexTo: null,
      completed: [
        {
          id: null,
          status: 'Unfilled',
        },
      ],
    },
    {
      type: 'ARM BEGINNER',
      indexTo: null,
      completed: [
        {
          id: null,
          status: 'Unfilled',
        },
      ],
    },
    {
      type: 'CHEST BEGINNER',
      indexTo: null,
      completed: [
        {
          id: null,
          status: 'Unfilled',
        },
      ],
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
        data: {id: string; status: string};
      }>,
    ) => {
      state.exercisesCompleted.map(d => {
        if (d.type === action.payload.type) {
          d.indexTo = action.payload.index;
          if (d.completed[0].id === null) {
            d.completed = [action.payload.data];
          } else {
            d.completed.push(action.payload.data);
          }
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
} = fitSlices.actions;

export default fitSlices.reducer;
