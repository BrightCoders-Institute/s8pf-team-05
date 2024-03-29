/* eslint-disable */
import {StyleSheet, Text, View, Image} from 'react-native';
import React, { useEffect, useState } from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import OptionsButtons from '../components/ProfileScreenComponents/OptionsButtons';



const Profile = ({navigation}: any) => {
  const [nameUser, setNameUser] = useState('');
  const [lastnameUser, setLastnameUser] = useState('');
  const [photoUser, setPhotoUser] = useState('');
  const [isHost, setIsHost] = useState<boolean>();

  useEffect(() => {
    async function getDataUser() {
      const infoUser = (await firestore().collection('users').doc(auth().currentUser?.uid).get()).data()
      setNameUser(infoUser?.name);
      setLastnameUser(infoUser?.lastname);
      setPhotoUser(infoUser?.profileImage);
      setIsHost(infoUser?.HostMode);
    }
    getDataUser()
  }, []);


  const handleLogOut = async () => {
    try {
      await auth().signOut().then(navigation.replace('Signin'))
      const isSignedIn = await GoogleSignin.isSignedIn();
      if(isSignedIn){
        await GoogleSignin.revokeAccess().then(navigation.replace('Signin'))
      } 
    }catch (error) {
      console.log(error)
    }
  }

  console.log(isHost);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.card}>
        <Image
          style={styles.img}
          source={photoUser === '' ? require('../source/defaultUserImage.jpg') : {uri: photoUser}}
        />
        <View style={styles.userInformationContainer}>
          <Text style={styles.nameUser}>{nameUser} {lastnameUser}</Text>
          <Text style={styles.rolUser}>Huesped</Text>
        </View>
      </View>

      {/* line */}
      <View style={styles.line} />

      <Text style={styles.subTitle}>Settings</Text>
      <OptionsButtons
        icon="person-circle-outline"
        text="Personal Information"
        onPress={() => {
          navigation.navigate('PersonalInformation'); //Cambiar a screen Personal Information
        }}
      />
      <OptionsButtons
        icon="diamond-outline"
        text="Host mode"
        onPress={() => {
          isHost ? navigation.navigate('HostModeScreen') : navigation.navigate('HostModeInactive'); //Cambiar a screen Host mode.
        }}
      />

      <View style={styles.logoutContainer}>
        <Text style={styles.logout} onPress={handleLogOut}>
          Log out
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  card: {
    marginTop: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 25,
    paddingVertical: 20,
    paddingHorizontal: 30,
    elevation: 1.5,
  },
  userInformationContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  logoutContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  title: {
    color: '#444444',
    fontSize: 40,
    fontWeight: 'bold',
  },
  subTitle: {
    color: 'black',
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  logout: {
    color: 'black',
    fontSize: 18,
    fontWeight: '800',
    borderBottomWidth: 2,
  },
  nameUser: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  rolUser: {
    color: '#444444',
    fontSize: 15,
    textAlign: 'center',
  },
  line: {
    width: '100%',
    height: 2,
    backgroundColor: '#DBDADA',
    marginVertical: 30,
  },
});

export default Profile;
