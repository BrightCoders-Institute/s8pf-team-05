import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Profilepicture from '../components/personalInfo/Profilepicture';
import InfoPersonal from '../components/personalInfo/InfoPersonal';
import Icon from 'react-native-vector-icons/AntDesign';
import HeaderNavigation from '../navigation/HeaderNavigation';

const PersonalInformation = () => {
  return (
    <View style={styles.container}>
      <HeaderNavigation whereNav="Profile" />
      <Text style={styles.text}>Personal information</Text>
      <View style={styles.profile}>
        <Profilepicture />
      </View>
      <InfoPersonal
        name="Nombre legal"
        value="Juancho Perez Debian Soto"
        action="Editar"
      />
      <InfoPersonal
        name="Numero telefonico"
        value="+52 *** *** 1290"
        action="Editar"
      />
      <InfoPersonal
        name="Direeccion"
        value="No proporcionada"
        action="Agregar"
      />
    </View>
  );
};

export default PersonalInformation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    fontSize: 30,
    marginBottom: 20,
    color: '#444444',
  },
  profile: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
