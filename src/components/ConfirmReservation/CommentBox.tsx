import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

type Props = {
  title?: string;
  placeholder: string;
  onChangeText?: (value: string) => void;
};

export default function CommentBox({title, placeholder, onChangeText}: Props) {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={styles.commentBox}
        placeholder={placeholder}
        placeholderTextColor={'#8D8D8D'}
        multiline={true}
        numberOfLines={5}
        textAlignVertical="top"
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  commentBox: {
    borderColor: '#B7B7B7',
    color: 'black',
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
});
