import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Profile = () => {
  return (
    <View>
      <Text style={styles.text}>Profile</Text>
    </View>
  )
}


const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        fontWeight: 'bold',
    }
})


export default Profile