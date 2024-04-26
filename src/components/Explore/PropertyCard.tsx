
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import FavoriteButton from './FavoriteButton';
import firestore from '@react-native-firebase/firestore';
import Rating from './Rating';
import Carousel from 'react-native-snap-carousel';
import Moment from 'moment'

interface PropertyCardProps {
  property: {
    images: string[];
    city: string;
    rating: number;
    propertyName: string;
    price: string;
  };
  onPress: () => void;
}

const renderItem = ({item}: {item: string}) => (
  <View style={styles.slide}>
    <Image style={styles.image} source={{uri: item}} />
  </View>
);

const PropertyCard: React.FC<PropertyCardProps> = ({property, onPress}) => {

  //console.log(property.images)
  const [averageRating, setAverageRating] = useState<number>(0);

  useEffect(() => {

    const fetchReviews = async () => {
      try {
        const reviewsSnapshot = await firestore()
          .collection('properties')
          .doc(property.id)
          .collection('reviews')
          .get();
        let totalRating = 0;
        let totalReviewsCount = 0;

        reviewsSnapshot.forEach(doc => {
          const reviewData = doc.data();
          totalRating += reviewData.rating;
          totalReviewsCount++;
        });

        const avgRating =
        totalReviewsCount > 0 ? totalRating / totalReviewsCount : 0;
        setAverageRating(avgRating);
      } catch (error) {
        console.error('Error fetching reviews: ', error);
      }
    };
    fetchReviews();
  }, [property.id]);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.propertyCard}>
        <View style={styles.carouselCont}>
          <Carousel
            data={property.images}
            renderItem={renderItem}
            sliderWidth={300}
            itemWidth={300}
          />
        </View>

        {/* <FavoriteButton /> */}

        <View style={styles.propertyInfo}>
          <View style={styles.propertyHeader}>
            <Text style={styles.propertyLocation}>{property.city}</Text>
            <Rating averageRating={averageRating} />
          </View>
          <Text style={styles.propertyDescription}>{property.propertyName}</Text>

          <Text style={styles.propertyPrice}>${property.price} night</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
    favoriteButtonContainer: {
        position: 'absolute',
        top: 10, 
        right: 30, 
    },
    propertyCard: {
        flex: 1,
        alignContent: 'center',
        marginTop: 20,
        marginHorizontal: 35,
    },
    carouselCont: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    propertyInfo: {
        marginTop: 10,
        width: 290,
        alignSelf: 'center',
    },
    propertyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    propertyLocation: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#444444',
    },
    propertyDescription: {
        fontSize: 13,
        marginTop: 5,
        color: '#7C7C7C',
    },
    propertyDateAvailable: {
        fontSize: 13,
        color: '#7C7C7C',
    },
    propertyPrice: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#444444',
    },
    slide: {
        width: 300,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'lightgrey',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
});

export default PropertyCard;
