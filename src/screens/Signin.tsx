import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Signin = () => {
  return (
    <View>
      <Text style={styles.text}>Signin</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        fontWeight: 'bold',
    }
})

export default Signin
