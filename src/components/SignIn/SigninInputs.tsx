/* eslint-disable */
import React from 'react'
import {useState} from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'


interface SigninProps {
  email: string;
  password: string;
  onChangeText: (email: string, password: string) => void;
}

const SigninInputs : React.FC<SigninProps> = ({email, password, onChangeText}) => {
    

    const onChangeTextEmail = (email:string) => {
      console.log(email)
    };
    const onChangeTextPassword = () => {
      console.log(password)
    }

  return (
    
  )
}


const styles = StyleSheet.create({
  
},
})


export default SigninInputs