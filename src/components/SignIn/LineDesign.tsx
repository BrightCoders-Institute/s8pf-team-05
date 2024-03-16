import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const LineDesign = () => {
  return (
    <View style={styles.line_container}>
            <View style={styles.line_items}></View>
            <Text style={styles.line_txt}>or</Text>
            <View style={styles.line_items}></View>
        </View>
  )
}

export default LineDesign

const styles = StyleSheet.create({
    line_container:{
        flexDirection: 'row',
        marginTop: 25,
        marginBottom: 35,
    },
    line_items: {
        width: 130,
        marginBottom: 8,
        borderBottomWidth: 1.5,
        borderBottomColor: '#DBDADA',
    },
    line_txt: {
        borderBottomWidth: 0,
        textAlign: 'center',
        fontSize: 12,
        color: '#B4B2B2',
        marginHorizontal: 10,
        paddingBottom: 0,
    },
})