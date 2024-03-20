import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

type Props = {
  title: string;
  placeholder: string;
  style?: {};
  onChangeText?: (value: string) => void;
};

export default function Input({
  title,
  placeholder,
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
        keyboardType="phone-pad"
        maxLength={15}
        onChangeText={onChangeText}
      />
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
    flex: 1,
  },
  title: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
