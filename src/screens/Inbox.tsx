import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Inbox = () => {
  return (
    <View>
      <Text style={styles.text}>Inbox</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        fontWeight: 'bold',
    }
})

export default Inbox