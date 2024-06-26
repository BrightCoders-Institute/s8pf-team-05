import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface InfoPersonalProps {
  name: string;
  value: string;
  action: string;
  onPress: () => void;
}

const InfoPersonal = ({name, value, action, onPress}: InfoPersonalProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.text_container}>
        <Text style={styles.text_name}>{name}</Text>
        <Text style={styles.text_value}>{value}</Text>
      </View>
      <Text style={styles.text_accion} onPress={onPress}>
        {action}
      </Text>
    </View>
  );
};

export default InfoPersonal;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    marginTop: 20,
  },
  text_accion: {
    fontWeight: 'bold',
    color: '#444444',
    textDecorationLine: 'underline',
    textAlignVertical: 'center',
  },
  text_name: {
    fontWeight: 'bold',
    color: '#444444',
  },
  text_container:{
    marginBottom: 25
  },
  text_value: {
    color: '#7C7C7C',
  }
})
