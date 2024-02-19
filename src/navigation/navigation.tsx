import { View, Text } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../screens/Home'
import Inbox from '../screens/Inbox';
import Profile from '../screens/Profile';
import Trips from '../screens/Trips';
import Wishlist from '../screens/Wishlist';

const MyStack = () => {
const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
    initialRouteName='Home'
    screenOptions={{headerShown: false}}>
        <Stack.Screen
            name='Home'
            component={Home}
        />
        <Stack.Screen
            name='Inbox'
            component={Inbox}
        />
        <Stack.Screen
            name='Profile'
            component={Profile}
        />
        <Stack.Screen
            name='Trips'
            component={Trips}
        />
        <Stack.Screen
            name='Whislist'
            component={Wishlist}
        />
    </Stack.Navigator>
  )
}

export default MyStack