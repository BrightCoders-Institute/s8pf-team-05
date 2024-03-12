import React from 'react';
import {StyleSheet, TextInput, KeyboardAvoidingView} from 'react-native';

export default function CommentBox() {
  return (
    <KeyboardAvoidingView style={styles.container}>
      <TextInput
        placeholder="Escribe aquí tu comentario..."
        style={styles.text}
        placeholderTextColor={'#8D8D8D'}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: '#B7B7B7',
    borderWidth: 1,
    height: 120,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  text: {
    color: '#8D8D8D',
  },
});
