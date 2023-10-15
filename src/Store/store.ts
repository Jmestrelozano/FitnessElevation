import {
  AnyAction,
  combineReducers,
  configureStore,
  MiddlewareArray,
  StoreEnhancer,
  ThunkMiddleware,
} from '@reduxjs/toolkit';
import {CurriedGetDefaultMiddleware} from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import AsyncStorage, {
  AsyncStorageStatic,
} from '@react-native-async-storage/async-storage';
import {fitSlices} from './Slices/fitSlices';
import {profileSlices} from './Slices/profileSlices';
import {IFitSlice, IProfileSlice} from '../interfaces';

interface IPersist {
  key: string;
  storage: AsyncStorageStatic;
  timeout: any;
  whitelist?: string[];
  blacklist?: string[];
}
const rootPersistConfig: IPersist = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['fit', 'profile'],
  timeout: null,
};
const fitPersistConfig: IPersist = {
  key: 'fit',
  storage: AsyncStorage,
  timeout: null,
  whitelist: ['exercisesCompleted', 'referenceExerciseId'],
  blacklist: [''],
};

const profilePersistConfig: IPersist = {
  key: 'profile',
  storage: AsyncStorage,
  timeout: null,
  whitelist: ['userProfile'],
  blacklist: [''],
};

const rootReducer = combineReducers({
  fit: persistReducer(fitPersistConfig, fitSlices.reducer),
  profile: persistReducer(profilePersistConfig, profileSlices.reducer),
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware: CurriedGetDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export interface storeInterface {
  fit: IFitSlice;
  profile: IProfileSlice;
}
// export const store = configureStore<
//   storeInterface,
//   AnyAction,
//   MiddlewareArray<[ThunkMiddleware<any, AnyAction, undefined>]>,
//   [StoreEnhancer<{}, {}>]
// >({
//   reducer: {fit: fitSlices.reducer},
//   middleware: (getDefaultMiddleware: CurriedGetDefaultMiddleware) =>
//     getDefaultMiddleware({
//       immutableCheck: false,
//       serializableCheck: false,
//     }),
// });

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
