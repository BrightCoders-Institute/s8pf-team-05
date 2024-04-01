import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

type Props = {
  title?: string;
  placeholder: string;
  msgError?: string;
  style?: {};
  onChangeText?: (value: string) => void;
};

export default function CommentBox({title, placeholder, msgError, style, onChangeText}: Props) {
  return (
    <View>
      <Text style={[styles.title, style]}>{title}</Text>
      <TextInput
        style={styles.commentBox}
        placeholder={placeholder}
        placeholderTextColor={'#8D8D8D'}
        multiline={true}
        numberOfLines={5}
        textAlignVertical="top"
        onChangeText={onChangeText}
      />
      <Text style={styles.msgError}>{msgError}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  commentBox: {
    borderColor: '#B7B7B7',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    height: 120,
    justifyContent: 'center',
  },
  title: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  msgError: {
    color: 'red',
    textAlign: 'center',
    marginTop: 5,
  },
});
