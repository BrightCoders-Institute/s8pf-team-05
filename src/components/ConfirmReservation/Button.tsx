import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export default function Button({
  text,
  style,
  onPress,
}: {
  text: string;
  style?: {};
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#6F2DBD',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 30,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});
