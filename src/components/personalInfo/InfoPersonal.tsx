import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface InfoPersonalProps{
  name:string
  value:string
  action:string
}

const InfoPersonal = ({name,value,action}:InfoPersonalProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.text_container}>
        <Text style={styles.text_name}>{name}</Text>
        <Text>{value}</Text>
      </View>
      <Text style ={styles.text_accion}> {action}</Text>
    </View>
  )
}

export default InfoPersonal

const styles = StyleSheet.create({
  container:{
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth:1,
    borderColor:'gray',
    marginBottom: 20,
    marginTop: 20,

  },
  text_accion:{
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textAlignVertical: 'center',
  },
  text_name:{
    fontWeight: 'bold',
    
  },
  text_container:{
    marginBottom: 25
  }
})