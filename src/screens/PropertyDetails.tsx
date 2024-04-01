import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CarouselComponent from '../components/PropertyDetails/Carousel';
import RatingBox from '../components/PropertyDetails/RatingBox';
import HostInfo from '../components/PropertyDetails/HostInfo';
import PropertyBottomTab from '../components/PropertyDetails/PropertyBottomTab';
import { useNavigation, useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const PropertyDetailsScreen: React.FC = ({ route }: any) => {
  const navigation = useNavigation();
  const {property} = route.params;

  const [hostInfo, setHostInfo] = useState<{ name: string, lastname: string, profileImage: string | null }>({
    name: '',
    lastname: '',
    profileImage: null,
  });

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

    fetchHostInfo();
  }, [property.hostId]);

  const handleReservePress = () => {
    navigation.navigate('ConfirmReservation');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <CarouselComponent images={property.images} />
        </View>
        <View style={styles.propertyInfo}>
          <Text style={styles.propertyName}>{property.propertyName}</Text>
          <Text style={styles.propertyLocation}>{property.location}</Text>
          <Text style={styles.propertyDetails}>
            Guests: {property.guests} | Bedrooms: {property.bedrooms} | Beds: {property.beds} | Bathrooms: {property.bathrooms}
          </Text>
          {/*<RatingBox averageRating={property.averageRating} totalReviews={property.totalReviews} />*/}
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
});

export default PropertyDetailsScreen;
