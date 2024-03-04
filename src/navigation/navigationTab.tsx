/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Inbox from '../screens/Inbox';
import Profile from '../screens/Profile';
import Trips from '../screens/Trips';
import Wishlist from '../screens/Wishlist';
import Explore from '../screens/Explore';

const NavigationTab = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Explore"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#6F2DBD',
      }}>
      {/* Inbox */}
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="chatbubbles-outline" size={size} color={color} />
          ),
        }}
        name="Inbox"
        component={Inbox}
      />
      {/* Trips */}
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="navigate-outline" size={size} color={color} />
          ),
        }}
        name="Trips"
        component={Trips}
      />
      {/* Explore */}
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="compass-outline" size={size} color={color} />
          ),
        }}
        name="Explore"
        component={Explore}
      />
      {/* Wishlist */}
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="heart-outline" size={size} color={color} />
          ),
        }}
        name="Whislist"
        component={Wishlist}
      />
      {/* Profile */}
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="person-circle-outline" size={size} color={color} />
          ),
        }}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export default NavigationTab;
