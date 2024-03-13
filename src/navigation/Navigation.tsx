import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Signin from '../screens/Signin';
import NavigationTab from './navigationTab';
import PropertyDetailsScreen from '../screens/PropertyDetails';
import PersonalInformation from '../screens/PersonalInformation';
import HostModeScreen from '../screens/HostMode';
import ConfirmReservation from '../screens/ConfirmReservation';
import CreateAccount from '../screens/CreateAccount';
import DateSelect from '../screens/DateSelect';
import SelectCity from '../screens/SelectCity';
import ReservationCompleted from '../screens/ReservationCompleted';

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
      <Stack.Screen name="Main" component={NavigationTab} />

      <Stack.Screen name="SelectCity" component={SelectCity} />

      <Stack.Screen name="Signin" component={Signin} />

      <Stack.Screen name="PropertyDetails" component={PropertyDetailsScreen} />
      <Stack.Screen 
      name="CreateAccount" 
      component={CreateAccount} />

      <Stack.Screen 
        name="PropertyDetails" 
        component={PropertyDetailsScreen} />

      <Stack.Screen
        name="PersonalInformation"
        component={PersonalInformation}
      />

      <Stack.Screen name="HostModeScreen" component={HostModeScreen} />

      <Stack.Screen name="DateSelect" component={DateSelect} />

      <Stack.Screen name="ConfirmReservation" component={ConfirmReservation} />

      <Stack.Screen
        name="ReservationCompleted"
        component={ReservationCompleted}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
