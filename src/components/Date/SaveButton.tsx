/* eslint-disable */
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const SaveButton = () => {
  return (
    <View>
        <TouchableOpacity style={styles.save_btn}>
            <Text style={styles.save_txt}>Save</Text>
        </TouchableOpacity>
    </View>
  )
}



const styles = StyleSheet.create({
    save_btn: {
        width: 120,
        height: 60,
        margin: 20,
        padding: 20,
        borderRadius: 8,
        backgroundColor: '#222222',
    },
    save_txt: {
        color: '#FFFFFF',
        fontSize: 15,
        textAlign: 'center',
    },
});

export default SaveButton