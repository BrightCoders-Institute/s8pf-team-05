import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import SelectLocation from '../components/SelectCity/SelectLocation';
import CarouselComponent from '../components/SelectCity/Carousel';
import Btn_buscar from '../components/SelectCity/Btn_buscar';
export default function SelectCity() {
  
  return (

    <View>
      <CarouselComponent/>
      <View style={styles.container}>
        <Text style={styles.title_Text}>Encuentra lugares para hospedarte</Text>
        <Text style={styles.description_Text}>Una cabaña , un departamento o un castillo, todo lo que busques lo encontraras aqui</Text>
        <SelectLocation/>
        <Btn_buscar/>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    margin:15,
    marginTop:0
  },
  title_Text:{
    fontSize:40,
    fontWeight:'bold',
    
  },
  description_Text:{
    fontSize:15,
    marginTop: 15,
    marginBottom: 30
    
  }
})