import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import HeaderNavigation from '../../navigation/HeaderNavigation';

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <HeaderNavigation whereNav="PropertyDetails" />
        <Text style={styles.title}>Solicitar Confirmación</Text>
      </View>

      {/* Linea */}
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  topContainer: {
    flexDirection: 'row',
  },
  line: {
    marginTop: 10,
    height: 2,
    marginHorizontal: -100,
    backgroundColor: '#CDCDCD',
  },
});
