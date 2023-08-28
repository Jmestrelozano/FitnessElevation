import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import App from './App';
import {PersistGate} from 'redux-persist/es/integration/react';
import {persistor, store} from './src/Store/store';
import {Text, View} from 'react-native';
import {StackNavigator} from './src/Navigations/StackNavigator';
import SplashScreen from 'react-native-splash-screen';

const main = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  //persistor.purge();
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StackNavigator />
        </PersistGate>
      </Provider>
    </>
  );
};

export default main;
