import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

interface btProps {
  onPress: () => void;
  disabled: boolean;
}

const Btn_buscar = ({onPress, disabled}: btProps) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View style={disabled ? styles.btnDisabled : styles.btn}>
        <Text style={styles.text}>Search</Text>
      </View>
    </TouchableOpacity>
  );
};
export default Btn_buscar;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#6F2DBD',
    padding: 12,
    borderRadius: 10,
    marginTop: 50,
  },
  btnDisabled: {
    backgroundColor: '#8B8B8B',
    padding: 12,
    borderRadius: 10,
    marginTop: 50,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 15,
  },
});
