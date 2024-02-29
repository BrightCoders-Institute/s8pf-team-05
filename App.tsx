import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import MyStack from './src/navigation/navigation'
//import DateSelect from './src/screens/DateSelect'
const App = () => {
  return (

    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})