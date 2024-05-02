import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchBar = ({onPress}: {onPress: () => void}) => {
  return (
    <View style={styles.searchContainer}>
      <TouchableOpacity onPress={onPress} style={styles.searchButton}>
        <View style={styles.btnContainer}>
          <Icon name="search" size={30} color={'black'} style={styles.icon}/>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Where you going?</Text>
            <Text>Anywhere · Any week</Text>
          </View>
        </View>
        
        
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
    searchContainer: {
        marginHorizontal: 20,
        marginTop: 20,
      },
      searchButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white', 
        padding: 15,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'lightgrey', 
        shadowColor: 'black', 
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        elevation: 4, 
      },
      btnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      textContainer: {
        flex: 1,
        marginLeft: 10,
      },
      title: {
        fontSize: 15,
        color: 'black',
        fontWeight: '700',
      },
      icon: {
        fontWeight: 'bold',
      },
})

export default SearchBar;
