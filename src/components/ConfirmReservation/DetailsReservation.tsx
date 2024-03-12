import React from 'react';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {View, Text} from 'react-native';

type Props = {
  title: string;
  info: string;
  btnEditar: () => void;
};

export default function DetailsReservation({title, info, btnEditar}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.info}>{info}</Text>
      </View>
      <TouchableWithoutFeedback onPress={btnEditar}>
        <View style={styles.btnContainer}>
          <Text style={styles.btnText}>Editar</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 5,
    marginVertical: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: 'black',
    fontSize: 15,
    fontWeight: '500',
  },
  info: {
    color: 'black',
    fontSize: 15,
  },
  btnContainer: {
    justifyContent: 'center',
  },
  btnText: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
});
