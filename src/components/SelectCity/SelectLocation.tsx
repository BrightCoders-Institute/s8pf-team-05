import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SelectList } from 'react-native-dropdown-select-list';
import city from '../../data/city.json';

const SelectLocation = ({ title, selectedCity, defaultValue }: { title: string, selectedCity: Function, defaultValue: string}) => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <SelectList
        setSelected={selectedCity}
        data={city}
        save="value"
        placeholder={defaultValue}
        boxStyles={{ borderColor: '#DBDADA' }}
        inputStyles={{ color: '#444444' }}
        dropdownStyles={{ borderColor: '#DBDADA' }}
        dropdownTextStyles={{ color: '#444444' }}
      />
    </View>
  );
};

export default SelectLocation;

const styles = StyleSheet.create({
  title: {
    fontSize: 17,
    color: '#444444',
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 6,
    marginLeft: 5,
  },
});
