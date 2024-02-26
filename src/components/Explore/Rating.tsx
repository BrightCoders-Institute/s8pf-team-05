import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface RatingProps {
    rating: number;
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
    return (
        <View style={styles.ratingContainer}>
            <Icon name="star" size={14} color="black" />
            <Text style={styles.ratingText}>{rating}</Text>
            
        </View>
    )
}

const styles = StyleSheet.create({
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 5,
        
    },
    ratingText: {
        marginLeft: 5,
        fontSize: 16,
        fontWeight: 'bold',
    },
})

export default Rating;
