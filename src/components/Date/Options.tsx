/* eslint-disable */
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Options = () => {
  return (
    <View style={styles.options_container}>
        <View style={styles.option_container}>
            <Text style={styles.option_txt}>Choose dates</Text>
        </View>
        <View style={styles.option_container}>
            <Text style={styles.option_txt}>I'm flexible</Text>
        </View>
    </View>
  )
}

export default Options

const styles = StyleSheet.create({options_container: {
    flexDirection: 'row',
    marginHorizontal: 12,
    borderRadius: 19,
    borderWidth: 3,
    borderColor: '#EBEBEB',
    backgroundColor: '#EBEBEB',
},
option_container: {
    flex: 2,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    backgroundColor: '#FFFFFF',
    elevation: 5,
},
option_txt: {
    color: '#1E1E1E',
    paddingVertical: 7,
    paddingHorizontal: 20,
    textAlign: 'center',
    fontWeight: '500',
},})