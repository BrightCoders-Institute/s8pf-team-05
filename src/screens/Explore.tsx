import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Explore = () => {
  return (
    <View>
      <Text style={styles.text}>Explore</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        fontWeight: 'bold',
    }
})

export default Explore
