import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Ranking() {
  return (
    <View style={styles.container}>
      <Icon name="star" color={'black'} />
      <Text style={styles.text}>4.92</Text>
      <Text style={styles.textCount}>(63)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
  },
  textCount: {
    marginLeft: 5,
    color: '#ADADAD',
  },
});
