import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import SelectLocation from '../components/SelectCity/SelectLocation';
import CarouselComponent from '../components/SelectCity/Carousel';
import Btn_buscar from '../components/SelectCity/Btn_buscar';
import {useNavigation, StackActions} from '@react-navigation/native';
import HeaderNavigation from '../navigation/HeaderNavigation';

export default function SelectCity() {
  const [selectedCity, setSelectedCity] = useState<string>();
  const [disabledBtn, setDisabledBtn] = useState(true);
  const navigation = useNavigation();

  if (selectedCity !== undefined && disabledBtn) {
    setDisabledBtn(false);
  }

  function handleSelectedCity() {
    firestore()
      .collection('users')
      .doc(auth().currentUser?.uid)
      .update({
        defaultCity: selectedCity,
      })
      .then(() => navigation.dispatch(StackActions.replace('Main')));
  }

  return (
    <>
      <HeaderNavigation whereNav="Main" />
      <View style={styles.container}>
        <CarouselComponent />
        <View style={styles.containerInfo}>
          <Text style={styles.title_Text}>Find places to stay</Text>
          <Text style={styles.description_Text}>
            A cabin, an apartment or a castle, everything you are looking for will
            be found here.
          </Text>
          <SelectLocation
            title='In which city do you want to search?'
            selectedCity={val => {
              setSelectedCity(val);
            }}
            />
          <Btn_buscar onPress={handleSelectedCity} disabled={disabledBtn} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingBottom: 30,
    backgroundColor: '#F3F3F3',
  },
  containerInfo: {
    margin: 20,
    marginTop: 20,
    padding: 5,
  },
  title_Text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#444444',
    lineHeight: 40,
  },
  description_Text: {
    textAlign: 'center',
    fontSize: 15,
    marginTop: 10,
    marginBottom: 30,
    paddingRight: 15,
    color: '#7C7C7C',
  },
});
