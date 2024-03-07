import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import SelectLocation from '../components/SelectCity/SelectLocation';
import CarouselComponent from '../components/SelectCity/Carousel';
import Btn_buscar from '../components/SelectCity/Btn_buscar';
import HeaderNavigation from '../navigation/HeaderNavigation';
import { useNavigation } from '@react-navigation/native';
export default function SelectCity() {
  
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <CarouselComponent/>
      <View style={styles.containerInfo}>
        <Text style={styles.title_Text}>Find places to stay</Text>
        <Text style={styles.description_Text}>A cabin, an apartment or a castle, everything you are looking for will be found here.</Text>
        <SelectLocation/>
        <Btn_buscar whereNav='Profile'/>
        <TouchableOpacity
    onPress={() => navigation.navigate('Profile')}>
        <View >
            <Text >Buscar</Text>
        </View>
    </TouchableOpacity>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:40,
    paddingBottom: 30,
    backgroundColor: '#F3F3F3',
  },
  containerInfo:{
    margin:20,
    marginTop: 20,
    padding: 5,
  },
  title_Text:{
    fontSize:40,
    fontWeight:'bold',
    color: '#444444',
    lineHeight: 40,
  },
  description_Text:{
    fontSize:15,
    marginTop: 15,
    marginBottom: 30,
    paddingRight:15,
    color: '#7C7C7C',
  }
})