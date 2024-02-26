import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CardWish = () => {
  return (
    <>
        <View style={styles.container}>
            <View style={styles.img_container}>
                <Image style={styles.img}source={{uri: 'https://hips.hearstapps.com/hmg-prod/images/casa-de-madera-de-diseno-moderno21-645b7b443ba61.jpg'}}/>
            </View>
            <View style={styles.text}>
                <Text style={{fontWeight:'bold'}}>Casa</Text>
                <Text>Guardados: 2</Text>
            </View>

        </View>
    </>
  )
}

export default CardWish

const styles = StyleSheet.create({
    container:{
        width:'46%',
        height:200,
    },
    img:{
        width:'100%',
        height:'100%',
        backgroundColor: 'white',
        borderRadius: 15,
    },
    img_container:{
        width:'100%',
        height:'80%',
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOpacity: 0.4,
        borderRadius: 15,
        elevation: 15,
        padding:3
    },
    text:{
        marginLeft:10
    }

})