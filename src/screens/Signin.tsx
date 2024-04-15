/* eslint-disable */
import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import ContinueButton from '../components/SignIn/ContinueButton';
import CreateAccountButton from '../components/CreateAccount/CreateAccountButton';
import LoginAccounts from '../components/SignIn/LoginAccounts';
import Icon from 'react-native-vector-icons/Ionicons';

type DataUser = {
  HostMode: boolean;
  birthDay: string;
  defaultCity: string;
  description: string;
  lastname: string;
  name: string;
  phoneNumber: string;
  photo: string;
}

const Signin = ({navigation}:any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [validEntries, setValidEntries] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [emailMessage, setEmailMessage] = useState('');

  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);

  const handleLogin: () => void = () => {
    const emailPattern = /\S+@\S+\.\S+/;
      if(email && password){
        setValidEntries(false)
        {emailPattern.test(email) ? setValidEmail(false) : setValidEmail(true)}
        {password.length >= 6 ? setValidPassword(false) : setValidPassword(true)}
        SigninWithFirebase()
        }else {
          setValidEntries(true)
        }
 }
  
  const SigninWithFirebase = async () => {
      if(email && password){
        await auth().signInWithEmailAndPassword(email, password).then(async (userCredential) => {
          const user = userCredential.user
          if(user){
            const infoUser = (await firestore().collection('users').doc(user.uid).get()).data()
            //console.log(infoUser);
            if(infoUser.defaultCity !== ''){
              navigation.replace('Main');
            } else {
              navigation.replace('SelectCity');
            }
            
          }
        }).catch(err => {
          if(err.code === 'auth/email-already-in-use'){
            setValidEmail(true)
            setEmailMessage('Email already in use')
          }
          if(err.code === 'auth/invalid-email' || err.code === 'auth/invalid-credential'){
            setValidEmail(true)
            setEmailMessage('Invalid email')
          }
          console.log(err)
        })
      }
    
  }
  return (
    <View style={styles.first_container}>
      <View style={styles.second_container}>
        <Text style={styles.title}>Welcome to NestQuest</Text>
        <Text style={styles.subtitle}>Please Sign in or Create an Account</Text>
        <View style={styles.inputs_container}>
        <View style={styles.input_container}>
          <TextInput style={[styles.input_text, isFocusedEmail && styles.isActiveEmail]}
              onChangeText={val => setEmail(val)}
              value={email}
              autoCapitalize='none'
              placeholder='Email'
              placeholderTextColor={'#B4B2B2'}
              keyboardType='email-address'
              onFocus={() => setIsFocusedEmail(true)}
              onBlur={() => setIsFocusedEmail(false)}/>
              {validEmail ? <Text style={styles.errorTxt}>{emailMessage}</Text> : <Text style={styles.errorTxt}/>}
        </View>
        <View style={styles.input_container}>
          <TextInput style={[styles.input_text, isFocusedPassword && styles.isActivePassword]}
              onChangeText={val => setPassword(val)}
              value={password}
              autoCapitalize='none'
              placeholder='Password'
              placeholderTextColor={'#B4B2B2'}
              secureTextEntry={passwordVisible}
              onFocus={() => setIsFocusedPassword(true)}
              onBlur={() => setIsFocusedPassword(false)}
              />
              {validPassword ? <Text style={styles.errorTxt}>Invalid password</Text> : <Text style={styles.errorTxt}/>}
              <Icon name={passwordVisible ? "eye-off" : "eye"} size={27} color="#A663CC" style={styles.icon} onPress={() => setPasswordVisible(!passwordVisible)}/>
        </View>
        {validEntries ? <Text style={styles.errorEntriesTxt}>Please enter your email and password</Text> : <Text style={styles.errorTxt}/>}
    </View>
        <ContinueButton
          onPress={handleLogin}
        />
        <CreateAccountButton
          onPress={() => {
            navigation.replace('CreateAccount');
          }}
        />
        <LoginAccounts />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  first_container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 80,
  },
  second_container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  title: {
    fontSize: 29,
    fontWeight: 'bold',
    color: '#444444',
    marginTop: 15,
    marginHorizontal: 10,
  },
  subtitle: {
    fontSize: 15,
    color: '#444444',
    marginHorizontal: 10,
  },
  inputs_container: {
    marginTop: 30,
    marginHorizontal: 15,
  },
  input_container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  input_text: {
    height: 60,
    width: '100%',
    fontSize: 15,
    color: '#000000',
    paddingHorizontal: 20,
    borderWidth: 1.5,
    borderColor: '#DBDADA',
    borderRadius: 8,
  },
  errorTxt: {
    fontSize: 10,
    width: '100%',    
    paddingLeft: 11,
    color: '#CD3939',
    marginBottom: 5,
  },
  errorEntriesTxt: {
    fontSize: 12,
    textAlign: 'center',
    marginLeft: 10,
    color: '#CD3939',
    marginTop: 8,
  },
  isActiveEmail: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#444444',
    margin: 0,
  },
  isActivePassword: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#444444',
  },
  icon: {
    textAlign: 'center',
    position: 'absolute',
    paddingRight: 12,
    marginTop: 17,
}
});

export default Signin;
