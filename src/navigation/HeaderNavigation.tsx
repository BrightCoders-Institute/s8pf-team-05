import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import  Icon  from 'react-native-vector-icons/AntDesign'
interface headerProps{
    whereNav:string
}
const HeaderNavigation = ({whereNav}: headerProps) => {
     const navigate = useNavigation()
  return (
    <View style={styles.button_container}>
      <TouchableOpacity onPress={() => navigate.navigate(whereNav)}>
        <Icon name ='arrowleft' size={27} color={'black'}/>
      </TouchableOpacity>
    </View>
  )
}

export default HeaderNavigation

const styles = StyleSheet.create({
  button_container: {
    width: '100%',
    marginTop: 20,
    marginLeft: 20,
  },
})