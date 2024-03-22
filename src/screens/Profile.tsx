/* eslint-disable */
import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth'
import OptionsButtons from '../components/ProfileScreenComponents/OptionsButtons';



const Profile = ({navigation}: any) => {

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


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.card}>
        <Image
          style={styles.img}
          source={{
            uri: 'https://i.pinimg.com/236x/35/f6/71/35f6716adc65383508eca7cfda5b5594.jpg',
          }}
        />
        <View style={styles.userInformationContainer}>
          <Text style={styles.nameUser}>Jhon</Text>
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
          navigation.navigate('HostModeInactive'); //Cambiar a screen Host mode.
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
