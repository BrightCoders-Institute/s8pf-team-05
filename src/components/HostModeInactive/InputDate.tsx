import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  content?: string;
  msgError?: string;
  style?: {};
  onPress: () => void;
};

export default function InputDate({content, style, msgError, onPress}: Props) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>Date of birth</Text>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.subContainer}>
          <Text style={styles.input}>{content}</Text>
          <Icon name="calendar-outline" size={30} style={styles.icon} />
        </View>
      </TouchableOpacity>
      <Text style={styles.msgError}>{msgError}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  input: {
    color: '#000000',
    borderRadius: 12,
    borderColor: '#DBDADA',
    borderWidth: 1.5,
    padding: 10,
    flex: 1,
  },
  icon: {
    marginHorizontal: 10,
  },
});
