import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation, StackActions} from '@react-navigation/native';

export default function ReservationCompleted() {
  const navigation = useNavigation();

  setTimeout(() => {
    navigation.dispatch(StackActions.replace('Main'));
  }, 1500);

  return (
    <View style={styles.container}>
      <Icon name="checkmark-circle" size={100} color={'#6F2DBD'} />
      <Text style={styles.text}>Reservation made successfully!!</Text>
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
