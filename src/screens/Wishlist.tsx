import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CardWish from '../components/whislistComponents/CardWish'

const Wishlist = () => {
  return (
    <>
      <Text style={styles.header}>Whislist</Text>
      <View style ={ styles.container}>
        <CardWish/>
        <CardWish/>
        <CardWish/>
        <CardWish/>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        margin: 40,
        marginTop:20
    },
    header:{
        fontSize:40,
        fontWeight:'bold',
        marginLeft:40,
        marginTop:20
    }
})

export default Wishlist
