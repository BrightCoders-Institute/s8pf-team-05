
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import LineDesign from './LineDesign';

const LoginAccounts = () => {
  return (
    <View style={styles.container}>
        <LineDesign/>
        <TouchableOpacity>
            <View style={styles.login_btn}>
                <Icon name="mail-outline" size={27} color="#A663CC" style={styles.icon}/>
                <Text style={styles.text}>Continue with email</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity>
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
        borderWidth: 1,
        borderColor: '#B4B2B2',
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