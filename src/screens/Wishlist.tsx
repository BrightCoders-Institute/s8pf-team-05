import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Wishlist = () => {
  return (
    <View>
      <Text style={styles.text}>Wishlist</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        fontWeight: 'bold',
    }
})

export default Wishlist
