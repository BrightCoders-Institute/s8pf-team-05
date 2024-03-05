
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Btn_buscar = () => {
    const nav = useNavigation();
  return (
    <TouchableOpacity
    onPress={()=>(
        nav.navigate('Home')
    )}>
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
        borderRadius: 9,

    },
    text:{
        color:'white',
        textAlign:'center',
        fontWeight: 'bold',
        fontSize: 15,
    }
})