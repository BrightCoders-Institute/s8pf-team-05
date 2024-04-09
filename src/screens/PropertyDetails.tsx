import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import CarouselComponent from '../components/PropertyDetails/Carousel';
import RatingBox from '../components/PropertyDetails/RatingBox';
import HostInfo from '../components/PropertyDetails/HostInfo';
import PropertyBottomTab from '../components/PropertyDetails/PropertyBottomTab';
import { useNavigation, useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import LikesDetails from '../components/likes/LikesDetails';
import auth from '@react-native-firebase/auth'


const PropertyDetailsScreen: React.FC = ({ route }: any) => {
  const navigation = useNavigation();
  const {property} = route.params;

  const [hostInfo, setHostInfo] = useState<{ name: string, lastname: string, profileImage: string | null }>({
    name: '',
    lastname: '',
    profileImage: null,
  });

  const [averageRating, setAverageRating] = useState<number>(0);
  const [totalReviews, setTotalReviews] = useState<number>(0);

  useEffect(() => {
    const fetchHostInfo = async () => {
      try {
        const hostId = property.hostId;

        if (hostId) {
          const userDoc = await firestore().collection('users').doc(hostId).get();
          
          const userData = userDoc.data();

          if (userData) {
            const { name, lastname, profileImage } = userData;
            setHostInfo({ name, lastname, profileImage });
          }
        }
      } catch (error) {
        console.error('Error fetching host info: ', error);
      }
    };

    const fetchReviews = async () => {
      try {
        const reviewsSnapshot = await firestore().collection('reviews').where('propertyId', '==', property.id).get();
        let totalRating = 0;
        let totalReviewsCount = 0;

        reviewsSnapshot.forEach(doc => {
          const reviewData = doc.data();
          totalRating += reviewData.rating;
          totalReviewsCount++;
        });

        const avgRating = totalReviewsCount > 0 ? totalRating / totalReviewsCount : 0;
        setAverageRating(avgRating);
        setTotalReviews(totalReviewsCount);
      } catch (error) {
        console.error('Error fetching reviews: ', error);
      }
    };

    fetchHostInfo();
    fetchReviews();
  }, [property.hostId, property.id]);

  const handleReservePress = () => {
    navigation.navigate('ConfirmReservation');
  };

  const handleRatingPress = () => {
    navigation.navigate('ReviewScreen', { property });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <CarouselComponent images={property.images} />
        </View>
        <View style={styles.propertyInfo}>
          <View style={styles.heart}>
          <Text style={styles.propertyName}>{property.propertyName}</Text>
            <LikesDetails  idProperty={property.id}/>
          </View>
          <Text style={styles.propertyLocation}>{property.propertyAdress}, {property.city}</Text>
          <Text style={styles.propertyDetails}>
            Guests: {property.guests} · Bedrooms: {property.bedrooms} · Beds: {property.beds} · Bathrooms: {property.bathrooms}
          </Text>
          <TouchableOpacity onPress={handleRatingPress}>
            <RatingBox averageRating={averageRating} totalReviews={totalReviews} />
          </TouchableOpacity>
          <HostInfo hostName={`${hostInfo.name} ${hostInfo.lastname}`} hostImage={hostInfo.profileImage} />
        </View>
        <View style={styles.propertyDescription}>
          <Text style={styles.descriptionTitle}>Description:</Text>
          <Text style={styles.descriptionText}>{property.description}</Text>
        </View>
      </ScrollView>
      <View style={styles.bottomTab}>
        <PropertyBottomTab pricePerNight={property.price} onReservePress={handleReservePress} />
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  propertyInfo: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  propertyName: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#444444',
  },
  propertyLocation: {
    fontSize: 15,
    color: 'gray',
  },
  propertyDetails: {
    fontSize: 14,
    marginTop: 5,
    color: '#7C7C7C',
    fontWeight: '600',
  },
  propertyDescription: {
    margin: 20,
    marginBottom: 100,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 5,
    color: '#444444',
  },
  descriptionText: {
    fontSize: 13,
    color: '#7C7C7C',
  },
  bottomTab: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  heart:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default PropertyDetailsScreen;
