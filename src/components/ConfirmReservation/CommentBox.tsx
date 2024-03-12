import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

export default function CommentBox() {
  return (
    <View style={styles.commentBox}>
      <TextInput
        placeholder="Escribe aquí tu comentario..."
        placeholderTextColor={'#8D8D8D'}
        multiline={true}
        numberOfLines={5}
        textAlignVertical="top"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  commentBox: {
    borderColor: '#B7B7B7',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    height: 120,
    justifyContent: 'center',
  },
});
