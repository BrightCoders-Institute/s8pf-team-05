/* eslint-disable */
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
//{/*onPress={() => navigation.goBack()}*/}

const CloseButton = ({onPress}: {onPress: () => void}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.x_container}> 
          <Icon name="close" size={25} color="#444444" style={styles.x_icon}/> 
      </View>
    </TouchableWithoutFeedback>
    
  )
}

const styles = StyleSheet.create({
    x_container:{
        width: 40,
        height: 40,
        margin: 10,
        borderRadius: 50,
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#DBDADA',
    },
    x_icon:{
        textAlign: 'center',
        paddingTop: 6,
    },
});

export default CloseButton