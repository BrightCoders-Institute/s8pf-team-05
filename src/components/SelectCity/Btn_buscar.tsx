
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
interface btProps{
    whereNav: string
}
const Btn_buscar = ({whereNav}:btProps ) => {
    const navigation = useNavigation();
  return (
    <TouchableOpacity
    onPress={() => navigation.navigate(whereNav)}>
        <View style={styles.btn}>
            <Text style={styles.text}>Search</Text>
        </View>
    </TouchableOpacity>
  )
}
export default Btn_buscar

const styles = StyleSheet.create({
    btn:{
        backgroundColor:'#6F2DBD',
        padding: 12,
        borderRadius: 10,

    },
    text:{
        color:'white',
        textAlign:'center',
        fontWeight: '600',
        fontSize: 15,
    }
})