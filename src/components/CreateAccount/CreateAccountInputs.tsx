/* eslint-disable */
import React, { useEffect } from 'react'
import {useState} from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth'
import Icon from 'react-native-vector-icons/Ionicons';

interface CreateAccountInputsProps {
  onValidationChange: (isValid: boolean) => void;
}

const CreateAccountInputs:React.FC<CreateAccountInputsProps> = ({onValidationChange}) => {
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const [isValid, setIsValid] = useState(false);
    const [userInfo, setUserInfo] = useState<FirebaseAuthTypes.User>()

    const [isFocusedName, setIsFocusedName] = useState(false);
    const [isFocusedLastName, setIsFocusedLastName] = useState(false);
    const [isFocusedEmail, setIsFocusedEmail] = useState(false);
    const [isFocusedPass, setIsFocusedPass] = useState(false);
    const [isFocusedRePass, setIsFocusedRePass] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(true);
    const [rePasswordVisible, setRePasswordVisible] = useState(true);

   useEffect(() => {
    const emailPattern = /\S+@\S+\.\S+/;
    if(name && lastname && email && password && rePassword){
      if( password.length >= 6){
        if(password === rePassword){
          if (emailPattern.test(email)) {
            handleRegister ()
            } else {
              console.log('por favor ingresa un correo valido')
            }
          } else {
            console.log('las passwords son incorrectas' )
          }
      }else {
        console.log('la password debe contener al menos 3 caracteres')
      } 
    } else {
      console.log('por favor llena todos los campos')
    }
   }, [name, lastname, email, password, rePassword])

   const handleRegister: () => void = async () => {
    setIsValid(true);
    onValidationChange(true)
    await auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user
      if(user){
        setUserInfo(user)
        console.log(user)
      }
    })
    .catch(err => {
      console.log('no fue posible registrarse', err)
    })
   }

  return (
    <View style={styles.inputs_container}>
      <View style={styles.input_container}>
        <TextInput style={[styles.input_text, isFocusedName && styles.isActive]}
            onChangeText={val => setName(val)}
            value={name}
            maxLength={30}
            placeholder={"Name"}
            placeholderTextColor={'#B4B2B2'}
            onFocus={() => setIsFocusedName(true)}
            onBlur={() => setIsFocusedName(false)}/>
      </View>
      <View style={styles.input_container}>
        <TextInput style={[styles.input_text, isFocusedLastName && styles.isActive]}
            onChangeText={val => setLastname(val)}
            value={lastname}
            maxLength={30}
            placeholder={"Lastname"}
            placeholderTextColor={'#B4B2B2'}
            onFocus={() => setIsFocusedLastName(true)}
            onBlur={() => setIsFocusedLastName(false)}/>
      </View>
      <View style={styles.input_container}>
        <TextInput style={[styles.input_text, isFocusedEmail && styles.isActive]}
            onChangeText={val => setEmail(val)}
            value={email}
            autoCapitalize='none'
            maxLength={60}
            placeholder={"Email"}
            placeholderTextColor={'#B4B2B2'}
            keyboardType='email-address'
            onFocus={() => setIsFocusedEmail(true)}
            onBlur={() => setIsFocusedEmail(false)}/>
      </View>
      <View style={styles.input_container}>
        <TextInput style={[styles.input_text, isFocusedPass && styles.isActive]}
            onChangeText={val => setPassword(val)}
            value={password}
            autoCapitalize='none'
            maxLength={30}
            placeholder={"Password"}
            placeholderTextColor={'#B4B2B2'}
            secureTextEntry={passwordVisible}
            onFocus={() => setIsFocusedPass(true)}
            onBlur={() => setIsFocusedPass(false)}
            />
            <Icon name={passwordVisible ? "eye-off" : "eye"} size={27} color="#A663CC" style={styles.icon} onPress={() => setPasswordVisible(!passwordVisible)}/>
      </View>
      <View style={styles.input_container}>
        <TextInput style={[styles.input_text, isFocusedRePass && styles.isActive]}
            onChangeText={val => setRePassword(val)}
            value={rePassword}
            autoCapitalize='none'
            maxLength={30}
            placeholder={"Confirm your password"}
            placeholderTextColor={'#B4B2B2'}
            secureTextEntry={rePasswordVisible}
            onFocus={() => setIsFocusedRePass(true)}
            onBlur={() => setIsFocusedRePass(false)}
            />
            <Icon name={rePasswordVisible ? "eye-off" : "eye"} size={27} color="#A663CC" style={styles.icon} onPress={() => setRePasswordVisible(!rePasswordVisible)}/>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
    inputs_container: {
      marginTop: 30,
      marginHorizontal: 15,
      marginBottom: 30,
    },
    input_container: {
      justifyContent: 'center',
      alignItems: 'flex-end',
      marginVertical: 10,
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
    isActive: {
      borderWidth: 2,
      borderRadius: 8,
      borderColor: '#444444',
    },
    icon: {
      textAlign: 'center',
      position: 'absolute',
      paddingRight: 12,
    },
})


export default CreateAccountInputs