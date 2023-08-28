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
import {IFitSlice} from '../interfaces/InterfacesSlices/InterfaceFit.slice';
import {fitSlices} from './Slices/fitSlices';
import AsyncStorage, {
  AsyncStorageStatic,
} from '@react-native-async-storage/async-storage';

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
  blacklist: ['fit'],
  timeout: null,
};
const userPersistConfig: IPersist = {
  key: 'fit',
  storage: AsyncStorage,
  timeout: null,
  whitelist: ['exercisesCompleted'],
  blacklist: [''],
};

const rootReducer = combineReducers({
  fit: persistReducer(userPersistConfig, fitSlices.reducer),
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
