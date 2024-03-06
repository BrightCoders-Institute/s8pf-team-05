import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface NumericInputProps {
  label: string;
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const NumericInput: React.FC<NumericInputProps> = ({ label, value, onIncrease, onDecrease }) => {
  return (
    <View>
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputWrapper}>
            
                <TouchableOpacity style={styles.button} onPress={onDecrease}>
                    <Icon name="remove-circle-outline" size={30} color="#A7A7A7" />
                </TouchableOpacity>
                <TextInput
                style={styles.input}
                value={value.toString()}
                keyboardType="numeric"
                onChangeText={value => {}}
                />
                <TouchableOpacity style={styles.button} onPress={onIncrease}>
                    <Icon name="add-circle-outline" size={30} color="#A7A7A7" />
                </TouchableOpacity>
            </View>    
        </View>
        <View style={styles.horizontalLine}>
        </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
    inputContainer: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    input: {
        height: 40,
        paddingHorizontal: 5,
        textAlign: 'center',
        color: '#000000',
    },
    button: {
        backgroundColor: 'transparent',
    },
    label:{
        fontSize: 14,
        color: '#000000',
    },
    horizontalLine: {
        height: 1.5,
        backgroundColor: '#DBDADA',
        marginTop: 3,
    },
});

export default NumericInput;
