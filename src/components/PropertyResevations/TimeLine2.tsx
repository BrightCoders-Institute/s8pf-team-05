import {View, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

export default function TimeLine2() {
  return (
    <View style={styles.container}>
      <Icon name="ellipse" color={'black'} size={15} />
      <View style={styles.line} />
      <Icon name="ellipse" color={'black'} size={15} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 18,
  },
  line: {
    width: 20,
    height: 2,
    backgroundColor: 'black',
  },
});