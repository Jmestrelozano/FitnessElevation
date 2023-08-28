import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import HomeScreen from './src/Screens/Home/HomeScreen';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <HomeScreen />
    </View>
  );
};

export default App;
