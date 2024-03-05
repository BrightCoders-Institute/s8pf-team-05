/* eslint-disable */
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CardWish from '../components/whislistComponents/CardWish'

const Wishlist = () => {
  return (
    <View style ={ styles.container}>
      <Text style={styles.header}>Whislist</Text>
      <View style ={ styles.containerCards}>
        <CardWish/>
        <CardWish/>
        <CardWish/>
        <CardWish/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
    containerCards: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop:20
    },
    header:{
        fontSize:40,
        fontWeight:'bold',
        color: '#444444',
    }
})

export default Wishlist
