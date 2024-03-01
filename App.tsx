import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import Navigation from './src/navigation/NavigationTab';
import Navigation from './src/navigation/Navigation';

const App = () => {
  return (
    <NavigationContainer>
      <Navigation initialRoute="Signin" />
    </NavigationContainer>
  );
};

export default App;
