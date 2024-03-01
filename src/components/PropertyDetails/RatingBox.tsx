import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface RatingBoxProps {
  averageRating: number;
  totalReviews: number;
}
const renderStars = (rating: number) => {
    const filledStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;

    const stars = [];
    for (let i = 0; i < filledStars; i++) {
      stars.push(<Icon key={i} name="star" size={16} color="black" />);
    }
    if (halfStar) {
      stars.push(<Icon key="half-star" name="star-half-outline" size={16} color="black" />);
    }
    return stars;
  };

const RatingBox: React.FC<RatingBoxProps> = ({ averageRating, totalReviews }) => {
    return (
        <View style={styles.container}>
          <View style={styles.leftContent}>
            <View style={styles.ratingContainer}>
                <Text style={styles.averageRating}>{averageRating.toFixed(1)}</Text>
                <View style={styles.starsContainer}>{renderStars(averageRating)}</View>
            </View>
            
          </View>
          <View style={styles.verticalLine}></View>
          <View style={styles.rightContent}>
            <Text style={styles.totalReviews}>{totalReviews}</Text>
            <Text style={styles.reviewsText}>Evaluaciones</Text>
          </View>
        </View>
      );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
      },
      leftContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

      },
      rightContent: {
        flex: 1,
        alignItems: 'center',

        justifyContent: 'center',
      },
      ratingContainer: {
        flexDirection: 'column',
        alignItems: 'center',
      },
      starIcon: {
        marginRight: 5,
      },
      averageRating: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
      },
      totalReviews: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
      },
      verticalLine: {
        position: 'absolute',
        height: '100%',
        width: 1,
        backgroundColor: 'gray',
        top: '45%',
        bottom: '50%',
        left: '56%',
        right: '50%',
        marginLeft: -0.5, // Mitad del ancho de la línea para centrarla correctamente
      },
      reviewsText: {
        fontSize: 16,
        color: 'black',
      },
      starsContainer: {
        flexDirection: 'row',
        marginTop: 5,
      },
});

export default RatingBox;
