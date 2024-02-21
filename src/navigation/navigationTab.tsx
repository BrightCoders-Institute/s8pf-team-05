import { View, Text } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import Home from '../screens/Home'
import Inbox from '../screens/Inbox';
import Profile from '../screens/Profile';
import Trips from '../screens/Trips';
import Wishlist from '../screens/Wishlist';


const MyStack = () => {
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

  return (
    
    <Tab.Navigator
    initialRouteName='Home'
    screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#6F2DBD'
        }}>

        {/* Inbox */}
        <Tab.Screen
            options={{
                tabBarIcon: ({ color , size }) => (
                    <Icon name="chatbubbles-outline" size={size} color={color} />
                    ),
            }}
            name='Inbox'
            component={Inbox}
        />
        {/* Trips */}
        <Tab.Screen
            options={{
                tabBarIcon: ({ color, size }) => (
                    <Icon name="navigate-outline" size={size} color={color} />
                    ),
                }}
            name='Trips'
            component={Trips}
        />
        {/* Explore */}
        <Tab.Screen
            options={{
                tabBarIcon: ({ color, size }) => (
                    <Icon name="compass-outline" size={size} color={color} />
                    ),
                }}
            name='Explore'
            component={Home}
        />
        {/* Wishlist */}
        <Tab.Screen
            options={{
                tabBarIcon: ({ color, size }) => (
                    <Icon name="heart-outline" size={size} color={color} />
                    ),
                }}
            name='Whislist'
            component={Wishlist}
        />
        {/* Profile */}
            <Tab.Screen
                options={{
                    tabBarIcon: ({ color, size }) => (
                    <Icon name="person-circle-outline" size={size} color={color} />
                    ),
                }}
                name='Profile'
                component={Profile}
            />
    </Tab.Navigator>
  )
}

export default MyStack