import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import  Icon  from 'react-native-vector-icons/AntDesign'

const Profilepicture = () => {
  return (
    <View style={styles.conatiner}>
      <Image style={styles.img}source={{uri:'https://www.shutterstock.com/image-photo/middle-age-latin-man-wearing-260nw-2191637135.jpg'}}/>
      <Icon style={styles.icon}name='pluscircle' size={40} color={'#B298DC'}/>
    </View>
  )
}

export default Profilepicture

const styles = StyleSheet.create({
  conatiner:{
    width: 150,
    height: 150,
    marginBottom: 40
  },
  img:{
    width: 150,
    height: 150,
    borderRadius: 100
  },
  icon:{
    position: 'absolute',
    top: '80%',
    left: '70%'
  }
})