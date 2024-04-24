/* eslint-disable */
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React,{useState, useEffect} from 'react'
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import LineDesign from './LineDesign';

const LoginAccounts = () => {
    const navigation = useNavigation();

    const newUser = {
        name: '',
        lastname: '',
        phoneNumber: '',
        birthday: '',
        description: '',
        profileImage: '',
        HostMode: false,
        defaultCity: '',
      };

      const handleGoogleSignIn = async () => {
        try {
            await signinWithGoogle();
            navigation.navigate('Main')
        } catch (error) {
            console.log(error)
        }
    }
    const signinWithGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            const { idToken, user } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            await auth().signInWithCredential(googleCredential);
            const currentUser = auth().currentUser;
            if(currentUser){
                onSend(currentUser.uid, {...newUser, name: user.givenName, lastname:user.familyName, profileImage:user.photo})
            }
        } catch (error) {
            console.log(error)
        }
    } 
    GoogleSignin.configure({
        webClientId: '950063643166-imhvslitr5ti6q900i4sqqmgg8oe4gat.apps.googleusercontent.com',
      });

    const onSend = async (uid: string, objUser:any) => {
        try {
            await firestore().collection('users').doc(uid).set(objUser)
        } catch (error) {
            console.error('Error sending user data to Firestore: ', error);
        }
      }
  return (
    <View style={styles.container}>
        <LineDesign/>
        <TouchableOpacity onPress={() => handleGoogleSignIn()}>
            <View style={styles.login_btn}>
                <Icon name="logo-google" size={27} color="#A663CC" style={styles.icon}/>
                <Text style={styles.text}>Continue with Google</Text>
            </View>
        </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        marginVertical: 15,
        marginHorizontal: 22,
    },
    login_btn: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: 310,
        height: 45,
        borderWidth: 1.5,
        borderColor: '#DBDADA',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginVertical: 10,
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#444444',
        marginLeft: 35,
    },
    icon: {
        height: 30,
        marginLeft: 7,
    },
})


export default LoginAccounts