import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export default function Button({
  style,
  onPress,
}: {
  style?: {};
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Text style={styles.text}>Solicitar Reservación</Text>
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
