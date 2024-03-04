
import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const FavoriteButton: React.FC = () => {
    return (
        <View style={styles.favoriteButtonContainer}>
            <TouchableOpacity style={styles.favoriteButton}>
                <Icon name="heart" size={24} color="rgba(68, 68, 68, 0.6)"/>
            </TouchableOpacity>
        </View>
    )
} 

const styles = StyleSheet.create({
    favoriteButtonContainer: {
        position: 'absolute',
        top: 20, 
        right: 0, 
    },
    favoriteButton: {
        padding: 5,
    },
})

export default FavoriteButton;
