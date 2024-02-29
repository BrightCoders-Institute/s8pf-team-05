/* eslint-disable */
import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
//{/*onPress={() => navigation.goBack()}*/}
const CloseButton = () => {
  return (
    <View style={styles.x_container}> 
        <Icon name="close" size={25} color="#747474" style={styles.x_icon}/> 
    </View>
  )
}

const styles = StyleSheet.create({
    x_container:{
        width: 40,
        height: 40,
        margin: 10,
        borderRadius: 50,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#A5A5A5',
    },
    x_icon:{
        textAlign: 'center',
        paddingTop: 6,
    },
});

export default CloseButton