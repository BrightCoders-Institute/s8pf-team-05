/* eslint-disable */
import React from 'react'
import {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import InputUser  from './InputUser';
import InputPassword  from './InputPassword';

const SigninInputs = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
  return (
    <View style={styles.inputs_container}>
            <InputUser placeholder={"Phone number or email"} secure={false} value={setUser} />
            <InputPassword placeholder={"Password"} secure={true} value={setPassword} />
        </View>
  )
}


const styles = StyleSheet.create({
    inputs_container: {
        marginTop: 30,
        marginHorizontal: 15,
    },
})


export default SigninInputs