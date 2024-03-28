import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SelectList} from 'react-native-dropdown-select-list';
import city from '../../data/city.json';

const SelectLocation = ({selectedCity}: {selectedCity: Function}) => {
  return (
    <View>
      <Text style={styles.title}>In which city do you want to search?</Text>
      <SelectList
        setSelected={selectedCity}
        data={city}
        save="value"
        placeholder="Select a city"
        boxStyles={{borderColor: '#DBDADA'}}
        inputStyles={{color: '#444444'}}
        dropdownStyles={{borderColor: '#DBDADA'}}
        dropdownTextStyles={{color: '#444444'}}
      />
    </View>
  );
};

export default SelectLocation;

const styles = StyleSheet.create({
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 6,
    marginLeft: 5,
  },
});
