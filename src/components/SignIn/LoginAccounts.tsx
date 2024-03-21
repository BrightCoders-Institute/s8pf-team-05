/* eslint-disable */
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React,{useState, useEffect} from 'react'
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import LineDesign from './LineDesign';

const signinWithGoogle = async () => {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const user = await auth().signInWithCredential(googleCredential);
    console.log(user)
} 
GoogleSignin.configure({
    webClientId: '950063643166-imhvslitr5ti6q900i4sqqmgg8oe4gat.apps.googleusercontent.com',
  });

const LoginAccounts = () => {
    const navigation = useNavigation();
    const [user, setUser] = useState<FirebaseAuthTypes.User|null >(null);
    const handleGoogleSignIn = async () => {
        try {
            await signinWithGoogle();
            setUser(auth().currentUser);
            navigation.navigate('Main')
        } catch (error) {
            console.log(error)
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
        <TouchableOpacity onPress={() => {}}>
            <View style={styles.login_btn}>
                <Icon name="logo-facebook" size={27} color="#A663CC" style={styles.icon}/>
                <Text style={styles.text}>Continue with Facebook</Text>
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