
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

const Button = () => {
  return (
    <View style={styles.container}>
        <TouchableOpacity>
            <View style={styles.signinBtn}>
                <Text style={styles.txt}>Continue</Text>
            </View>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 5,
        marginHorizontal: 30,
    },
    signinBtn: {
        alignItems: 'center',
        width: 310,
        height: 45,
        backgroundColor: '#6F2DBD',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    txt: {
        color: 'white',
        fontSize: 15,
    },
})

export default Button