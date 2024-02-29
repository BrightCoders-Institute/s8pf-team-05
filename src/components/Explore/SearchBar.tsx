import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const goToSelectCity = () => {
    console.log('go to select city');
};

const SearchBar: React.FC = () => {
    return (
        <View style={styles.searchContainer}>
            <TouchableOpacity onPress={goToSelectCity} style={styles.searchButton}>
            <Icon name="search" size={20} />
            <Text style={styles.buttonText}>Where you going?</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    searchContainer: {
        marginHorizontal: 35,
        marginTop: 20,
      },
      searchButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white', 
        padding: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'lightgrey', 
        shadowColor: 'black', 
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        elevation: 4, 
      },
      buttonText: {
        marginLeft: 10,
        fontSize: 18,
      },
})

export default SearchBar;