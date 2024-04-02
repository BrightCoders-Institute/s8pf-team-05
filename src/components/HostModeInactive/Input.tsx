import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardTypeOptions,
} from 'react-native';

type Props = {
  title: string;
  value?: string;
  placeholder?: string;
  msgError?: string;
  maxLength: number;
  keyBoardType: KeyboardTypeOptions;
  style?: {};
  onChangeText?: (value: string) => void;
};

export default function Input({
  title,
  value,
  placeholder,
  msgError,
  maxLength,
  keyBoardType,
  style,
  onChangeText,
}: Props) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={'#7C7C7C'}
        keyboardType={keyBoardType}
        maxLength={maxLength}
        onChangeText={onChangeText}
        value={value}
      />
      <Text style={styles.msgError}>{msgError}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  input: {
    color: '#000000',
    borderRadius: 12,
    borderColor: '#DBDADA',
    borderWidth: 1.5,
    padding: 10,
  },
  title: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  msgError: {
    color: 'red',
    textAlign: 'center',
    marginTop: 5,
  },
});
