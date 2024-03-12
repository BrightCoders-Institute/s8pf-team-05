/* eslint-disable */
import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth'
import ContinueButton from '../components/SignIn/ContinueButton';
import CreateAccountButton from '../components/CreateAccount/CreateAccountButton';
import LoginAccounts from '../components/SignIn/LoginAccounts';
import Icon from 'react-native-vector-icons/Ionicons';

const Signin = ({navigation}: any) => {
  //implementation(platform("com.google.firebase:firebase-bom:32.7.3"))
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const handleLogin = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
        const user = userCredential.user
        if(user){
          navigation.replace('Main');
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <View style={styles.first_container}>
      <View style={styles.second_container}>
        <Text style={styles.title}>Welcome to Eirbianbi</Text>
        <Text style={styles.subtitle}>Please Sign in or Create an Account</Text>
        <View style={styles.inputs_container}>
        <View style={styles.input_container}>
          <TextInput style={[styles.input_textEmail, isFocusedEmail ? styles.isActiveEmail: styles.inActiveEmail,]}
              onChangeText={val => setEmail(val)}
              value={email}
              autoCapitalize='none'
              placeholder='Email'
              placeholderTextColor={'#B4B2B2'}
              keyboardType='email-address'
              onFocus={() => setIsFocusedEmail(true)}
              onBlur={() => setIsFocusedEmail(false)}/>
        </View>
        <View style={styles.input_container}>
          <TextInput style={[styles.input_textPassword, isFocusedPassword ? styles.isActivePassword: styles.inActivePassword,]}
              onChangeText={val => setPassword(val)}
              value={password}
              autoCapitalize='none'
              placeholder='Password'
              placeholderTextColor={'#B4B2B2'}
              secureTextEntry={passwordVisible}
              onFocus={() => setIsFocusedPassword(true)}
              onBlur={() => setIsFocusedPassword(false)}
              />
              <Icon name={passwordVisible ? "eye-off" : "eye"} size={27} color="#A663CC" style={styles.icon} onPress={() => setPasswordVisible(!passwordVisible)}/>
        </View>
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
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  input_textEmail: {
    height: 60,
    width: '100%',
    fontSize: 15,
    color: '#000000',
    paddingHorizontal: 20,
    borderWidth: 1.5,
    borderColor: '#DBDADA',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  input_textPassword: {
    height: 60,
    width: '100%',
    fontSize: 15,
    color: '#000000',
    paddingHorizontal: 20,
    borderWidth: 1.5,
    borderColor: '#DBDADA',
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
},
  isActiveEmail: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#444444',
    margin: 0,
  },
  inActiveEmail:{
    borderBottomWidth: 0,
  },
  isActivePassword: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#444444',
  },
  inActivePassword:{
    borderTopWidth: 0,
  },
  icon: {
    textAlign: 'center',
    position: 'absolute',
    paddingRight: 12,
}
});

export default Signin;
