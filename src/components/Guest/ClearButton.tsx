/* eslint-disable */
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

interface ClearButtonProps {
    clearNumbers: () => void;
}

const ClearButton: React.FC<ClearButtonProps> = ({ clearNumbers }) => {
  return (
    <View>
        <TouchableOpacity style={styles.clear_btn} onPress={clearNumbers}>
            <Text style={styles.clear_txt}>Clear</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    clear_btn: {
        width: 120,
        height: 60,
        margin: 20,
        paddingVertical: 15,
    },
    
    clear_txt: {
        color: '#4D4D4D',
        fontSize: 18,
        textDecorationLine: 'underline',
        fontWeight: '500',
    },
});

export default ClearButton