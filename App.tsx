
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import MyStack from './src/navigation/navigationTab'
import Navigate from './src/navigation/navi'

const App = () => {
  return (
    <NavigationContainer>
        <Navigate/>
      <MyStack />
    </NavigationContainer>
  );
};

export default App;
