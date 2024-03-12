import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ReservationCompleted() {
  return (
    <View style={styles.container}>
      <Icon name="checkmark-circle" size={100} color={'#6F2DBD'} />
      <Text style={styles.text}>Reservación realizada exitosamente</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
