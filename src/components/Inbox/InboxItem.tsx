/* eslint-disable */
import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const InboxItem = ({image}) => {
  return (
    <View>
        <View style={styles.container}>
            <View style={styles.containerImage}>
                <Image style={styles.image} source={{uri: image}}/>
            </View>
            <View style={styles.containerInfo}>
                <Text style={styles.user} numberOfLines={1}>Arturo - Casa Manzanillo, 2 habitaciones, Cerca del cerro de Armeria</Text>
                <Text style={styles.message} numberOfLines={1}>Hola que tal! para confirmar la reservacion de la casa de manzanillo bla bla</Text>
                <Text style={styles.date} numberOfLines={1}>22 - 24 de febrero de 2024</Text>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        borderBottomWidth: 1,
        borderColor: '#B4B2B2',
        marginTop: 22,
        paddingBottom: 10,
    },
    containerImage: {
        justifyContent: 'center',
        borderRadius: 50,
    },
    image: {
        height: 70,
        width: 70,
        borderRadius: 50,
    },
    containerInfo: {
        justifyContent: 'space-between',
        marginLeft: 10,
        width: 280,
        paddingVertical: 2,
    },
    user: {
        fontSize: 12,
        color: '#7C7C7C',
    },
    message: {
        fontSize: 15,
        color: '#444444',
        fontWeight: '400',
    },
    date: {
        fontSize: 11,
        color: '#7C7C7C',
    },
})

export default InboxItem
