/* eslint-disable */
import React from 'react'
import {useState} from 'react'
import { StyleSheet, Text, View, TextInput} from 'react-native'

const InputPassword = ({placeholder, secure, value,}) => {
    const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.input_container}>
        <TextInput style={[styles.input_text, isFocused ? styles.isActive: styles.inActive,]}
            //onChangeText={setValue}
            //value={value}
            placeholder={placeholder}
            placeholderTextColor={'#7C7C7C'}
            secureTextEntry={secure}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}/>
    </View>
  )
}

const styles = StyleSheet.create({
    input_container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    input_text: {
        height: 60,
        width: '100%',
        fontSize: 15,
        color: '#000000',
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#B4B2B2',
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
    },
    isActive: {
        borderWidth: 2,
        borderRadius: 8,
        borderColor: '#000000',
    },
    inActive:{
        borderTopWidth: 0,
    }
})

export default InputPassword