import {Text, StyleSheet, View, TouchableNativeFeedback} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  icon: string;
  text: string;
  onPress: () => void;
};

export default function OptionsButtons({icon, text, onPress}: Props) {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.container}>
        <Icon name={icon} size={30} color={'black'} />
        <Text style={styles.text}>{text}</Text>
        <Icon
          style={styles.arrow}
          name="chevron-forward-outline"
          size={20}
          color={'black'}
        />
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderBottomWidth: 1.5,
    borderBottomColor: '#DBDADA',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    flex: 1,
    marginLeft: 10,
    color: '#444444',
  },
  arrow: {},
});
