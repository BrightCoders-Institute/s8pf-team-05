import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/navigation/Navigation';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [defaultCity, setDefaultCity] = useState(null);

  // Función para verificar si la ciudad está vacía
  async function checkDefaultCity(userId: string) {
    const userInfo = (
      await firestore().collection('users').doc(userId).get()
    ).data();
    setDefaultCity(userInfo?.defaultCity);
    setInitializing(false);
  }

  // Handle user state changes
  function onAuthStateChanged(newUser) {
    setUser(newUser);
    if (newUser) {
      checkDefaultCity(newUser.uid);
    } else {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return null;
  }

  if (!user) {
    return (
      <NavigationContainer>
        <Navigation initialRoute="Signin" />
      </NavigationContainer>
    );
  } else if (defaultCity) {
    // El usuario está autenticado y tiene una ciudad por defecto
    return (
      <NavigationContainer>
        <Navigation initialRoute="Home" />
      </NavigationContainer>
    );
  } else {
    return (
      // El usuario está autenticado pero no tiene una ciudad por defecto
      <NavigationContainer>
        <Navigation initialRoute="SelectCity" />
      </NavigationContainer>
    );
  }
};

export default App;
