
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface RatingProps {
    rating: number;
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
    return (
        <View style={styles.ratingContainer}>
            <Icon name="star" size={15} color="#e7b13d" />
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
        fontSize: 15,
        fontWeight: 'bold',
        color: '#444444',
    },
})

export default Rating;
