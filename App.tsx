<<<<<<< HEAD
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import MyStack from './src/navigation/navigationTab'
import Navigate from './src/navigation/navi'

=======
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MyStack from './src/navigation/navigation';
>>>>>>> e8435414829e74aeee2305c0d552ed9b1e5d0de5
const App = () => {
  return (
    <NavigationContainer>
<<<<<<< HEAD
        <Navigate/>
=======
      <MyStack />
>>>>>>> e8435414829e74aeee2305c0d552ed9b1e5d0de5
    </NavigationContainer>
  );
};

export default App;
