/* eslint-disable */
import { StyleSheet, Text, View, TouchableOpacity, GestureResponderEvent } from 'react-native'
import React from 'react'

const ConfirmCreateAccountButton = ({
    onPress,
  }: {
    onPress: (event: GestureResponderEvent) => void;
  }) => {
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={onPress}>
            <View style={styles.createBtn}>
                <Text style={styles.txt}>Create Account</Text>
            </View>
        </TouchableOpacity>
    </View>
  )
}

export default ConfirmCreateAccountButton

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 5,
        marginHorizontal: 30,
    },
    createBtn: {
        alignItems: 'center',
        width: 320,
        height: 45,
        //borderWidth: 1,
        backgroundColor: '#6F2DBD',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    txt: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '600',
        textAlign: 'center',
    },
})