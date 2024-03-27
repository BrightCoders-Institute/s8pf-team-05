/* eslint-disable */
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

interface SaveButtonProps {
    saveNumbers: () => void;
}

const SaveButton: React.FC<SaveButtonProps> = ({saveNumbers}) => {
  return (
    <View>
        <TouchableOpacity style={styles.save_btn} onPress={saveNumbers}>
            <Text style={styles.save_txt}>Save</Text>
        </TouchableOpacity>
    </View>
  )
}



const styles = StyleSheet.create({
    save_btn: {
        width: 120,
        height: 60,
        margin: 20,
        padding: 20,
        borderRadius: 8,
        backgroundColor: '#6F2DBD',
    },
    save_txt: {
        color: '#FFFFFF',
        fontSize: 15,
        textAlign: 'center',
    },
});

export default SaveButton