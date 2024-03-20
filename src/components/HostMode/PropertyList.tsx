/* eslint-disable */
import {View, Text, StyleSheet, Image, Alert, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';

type Props = {
  name: string;
  id: string;
  location: string;
  details: string;
  image?: string;
};



export default function PropertyList({id, name, location, details, image}: Props) {
  const navigation = useNavigation();
  const [isActiveOptions, setIsActiveOptions] = useState(false);

  const showOptions: () => void = () => {
    setIsActiveOptions(!isActiveOptions)
  };

  const editProperty: () => void = () => {navigation.navigate('HostModeScreen');}
  const deleteProperty: () => void = () => {
    //firestore().collection('properties').delete().then(() => {Alert.alert('Propiedad eliminada')})
    console.log(id)}//por el momento el boton de Delete, solo manda a consola el id de la propiedad.

  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={{
          uri: image,
        }}
      />

      <View style={styles.propertyContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.location}>{location}</Text>
        <Text numberOfLines={1} style={styles.details}>{details}</Text>
      </View>
      <View>
        <TouchableOpacity onPress={showOptions}>
          <Icon name="dots-three-vertical" size={27} color="#444444" style={styles.icon}/>
        </TouchableOpacity>
      </View>
    {isActiveOptions && 
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionEdit} onPress={editProperty}>
          <Text style={styles.optionsTitle}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionDelete} onPress={deleteProperty}>
          <Text style={styles.optionsTitle}>Delete</Text>
        </TouchableOpacity>
      </View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 7,
    paddingBottom: 8,
    borderBottomWidth: 1.5,
    borderColor: '#DBDADA',
  },
  propertyContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  name: {
    color: '#444444',
    fontSize: 15,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 12,
    color: '#7C7C7C',
  },
  details: {
    fontSize: 11,
    color: '#7C7C7C',
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 15,
  },
  icon: {
    marginTop: 20,
  },
  optionsContainer: {
    position: 'absolute',
    justifyContent: 'space-between',
    width: 110,
    height: 70,
    marginLeft: 225,
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: '#EFEFEF',
    borderWidth: 1,
    borderColor: '#A4A4A4',
    elevation: 2,
  },
  optionEdit: {
    borderBottomWidth: 1,
    borderColor: '#A4A4A4',
    paddingLeft: 5,
    paddingTop: 5,
    paddingBottom: 5,
    textAlign: 'center',
    //borderWidth: 1,

  },
  optionDelete: {
    paddingLeft: 5,
    paddingBottom: 5,
    //borderWidth: 1,

  },
  optionsTitle: {
    fontSize: 16,
    color: '#444444',
    alignItems: 'center',
   // borderWidth: 1,

  }
});
