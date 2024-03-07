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
    <TouchableOpacity
    onPress={() => navigate.navigate(whereNav)}>
              <Icon name ='arrowleft' size={20} color={'black'}/>
    </TouchableOpacity>
  )
}

export default HeaderNavigation

const styles = StyleSheet.create({})