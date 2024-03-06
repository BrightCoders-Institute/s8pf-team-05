import { View, Text } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import SelectCity from '../screens/SelectCity';
import MyStack from './navigationTab';
import Home from '../screens/Home';
import Signin from '../screens/Signin';




const Navigate = () => {
const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName='Signin'

        screenOptions={{
            headerShown: false,
            }}
    >
            <Stack.Screen
                name='MyStack'
                component={MyStack}
            />
            <Stack.Screen
                name='SelectCity'
                component={SelectCity}
            />
            <Stack.Screen
                name='Signin'
                component={Signin}
            /> 
    </Stack.Navigator>
  )
}

export default Navigate