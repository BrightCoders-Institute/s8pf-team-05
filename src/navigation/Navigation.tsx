import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SelectCity from '../screens/SelectCity';
import Signin from '../screens/Signin';
import NavigationTab from './NavigationTab';
import PropertyDetailsScreen from '../screens/PropertyDetails';

// type RootStackParams = {
//   Signin: undefined;
//   SelectCity: undefined;
//   NavigationTab: undefined;
//   PropertyDetails: undefined
//   initialRoute: string;
// };

const Navigation = ({initialRoute}: {initialRoute: string}) => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="NavigationTab" component={NavigationTab} />
      <Stack.Screen name="SelectCity" component={SelectCity} />
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="PropertyDetails" component={PropertyDetailsScreen} />
    </Stack.Navigator>
  );
};

export default Navigation;
