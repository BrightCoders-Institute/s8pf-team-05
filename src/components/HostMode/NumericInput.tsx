import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

interface NumericInputProps {
  label: string;
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const NumericInput: React.FC<NumericInputProps> = ({ label, value, onIncrease, onDecrease }) => {
  return (
    <View style={styles.inputContainer}>
      <Text>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={value.toString()}
          keyboardType="numeric"
          onChangeText={value => {}}
        />
        <TouchableOpacity style={styles.button} onPress={onIncrease}>
          <Text>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onDecrease}>
          <Text>-</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    flex: 1,
  },
  button: {
    backgroundColor: 'lightgray',
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
  },
});

export default NumericInput;
