
import React from 'react'
import {useState} from 'react'
import { StyleSheet, Text, View, TextInput} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

const InputPassword = ({placeholder, secure, value,}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(true)
  return (
    <View style={styles.input_container}>
        <TextInput style={[styles.input_text, isFocused ? styles.isActive: styles.inActive,]}
            //onChangeText={setValue}
            //value={value}
            placeholder={placeholder}
            placeholderTextColor={'#7C7C7C'}
            secureTextEntry={passwordVisible}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            />
            <Icon name={passwordVisible ? "eye-off" : "eye"} size={27} color="#A663CC" style={styles.icon} onPress={() => setPasswordVisible(!passwordVisible)}/>
    </View>
  )
}

const styles = StyleSheet.create({
    input_container: {
        justifyContent: 'center',
        alignItems: 'flex-end',
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
    },
    icon: {
        textAlign: 'center',
        position: 'absolute',
        paddingRight: 12,
    },
})

export default InputPassword