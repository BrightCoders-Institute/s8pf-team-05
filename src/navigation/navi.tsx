import { View, Text } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import SelectCity from '../screens/SelectCity'
import MyStack from './navigationTab';
import Home from '../screens/Home';



const Navigate = () => {
const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName='SelectCity'
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
                name='Home'
                component={Home}
            />
    </Stack.Navigator>
  )
}

export default Navigate