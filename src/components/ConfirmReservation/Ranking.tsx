import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Ranking() {
  return (
    <View style={styles.container}>
      <Icon name="star" color={'#e7b13d'} size={15} />
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
    color: '#444444',
    fontWeight: 'bold',
    paddingLeft: 4,
  },
  textCount: {
    marginLeft: 5,
    color: '#7C7C7C',
  },
});
