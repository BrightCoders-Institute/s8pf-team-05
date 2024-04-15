/* eslint-disable */
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

type Props = {
    text: string;
    disabled: boolean;
    onPress: () => void;
};

const SaveButton = ({onPress, disabled}: {onPress: () => void, disabled: boolean}) => {
  return (
    <View>
        <TouchableOpacity style={disabled ? styles.save_btn_disabled : styles.save_btn} onPress={onPress} disabled={disabled}>
            <Text style={styles.save_txt}>Next</Text>
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
    save_btn_disabled: {
        width: 120,
        height: 60,
        margin: 20,
        padding: 20,
        borderRadius: 8,
        backgroundColor: '#8B8B8B',
    },
    save_txt: {
        color: '#FFFFFF',
        fontSize: 15,
        textAlign: 'center',
    },
});

export default SaveButton