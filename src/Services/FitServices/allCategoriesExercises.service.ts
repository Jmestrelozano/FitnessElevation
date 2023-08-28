import {Dispatch} from '@reduxjs/toolkit';
import {
  allCategoriesExercises as allCategories,
  errAllCategoriesExercises,
  loadAllCategoriesExercises,
} from '../../Store/Slices/fitSlices';
import urlFit from '../data/fitness.json';

export const allCategoriesExercises = () => async (dispatch: Dispatch) => {
  dispatch(loadAllCategoriesExercises());
  try {
    const result = urlFit;
    dispatch(allCategories(result));
  } catch (error) {
    dispatch(errAllCategoriesExercises(error));
    throw error;
  }
};
