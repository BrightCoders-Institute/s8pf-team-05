import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CarouselComponent from '../components/PropertyDetails/Carousel';
import RatingBox from '../components/PropertyDetails/RatingBox';
import HostInfo from '../components/PropertyDetails/HostInfo';
import PropertyBottomTab from '../components/PropertyDetails/PropertyBottomTab';
import { useNavigation } from '@react-navigation/native';

const PropertyDetailsScreen: React.FC = ({ route }: any) => {

  const navigation = useNavigation();

  const { property } = route.params;

  const {
    images,
    propertyName,
    location,
    guests,
    bedrooms,
    beds,
    bathrooms,
    averageRating,
    totalReviews,
    hostName,
    hostImage,
    description,
    price,
  } = property;

  const handleReservePress = () => {
    navigation.navigate('ConfirmReservation');
  };

return (
    <View style={styles.container}>
        <ScrollView>
            <View>
                <CarouselComponent images={images} />
            </View>
            <View style={styles.propertyInfo}>
                <Text style={styles.propertyName}>{propertyName}</Text>
                <Text style={styles.propertyLocation}>{location}</Text>
                <Text style={styles.propertyDetails}>
                    Guests: {guests} | Bedrooms: {bedrooms} | Beds: {beds} | Bathrooms: {bathrooms}
                </Text>
                {/* <RatingBox averageRating={averageRating} totalReviews={totalReviews} /> */}
                {/* <HostInfo hostName={hostName} hostImage={hostImage} /> */}
            </View>
            <View style={styles.propertyDescription}>
                <Text style={styles.descriptionTitle}>Description:</Text>
                <Text style={styles.descriptionText}>{description}</Text>
            </View>
        </ScrollView>
        <View style={styles.bottomTab}>
            <PropertyBottomTab pricePerNight={price} onReservePress={handleReservePress} />
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
});

export default PropertyDetailsScreen;
