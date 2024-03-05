/* eslint-disable */
import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CardWish = () => {
  return (
    <View>
        <View style={styles.container}>
            <View style={styles.img_container}>
                <Image style={styles.img}source={{uri: 'https://hips.hearstapps.com/hmg-prod/images/casa-de-madera-de-diseno-moderno21-645b7b443ba61.jpg'}}/>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>Casa</Text>
                <Text style={styles.cardDescription}>Guardados: 2</Text>
            </View>

        </View>
    </View>
  )
}

export default CardWish

const styles = StyleSheet.create({
    container:{
        width:170,
        height:200,
        marginBottom:10,
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
        borderRadius: 15,
        elevation: 8,
        padding:2
    },
    textContainer:{
        marginLeft:10,
    },
    cardTitle:{
        fontSize: 15,
        color: '#444444',
        fontWeight:'bold'
    },
    cardDescription: {
        fontSize: 12,
        color: '#7C7C7C',
    }

})