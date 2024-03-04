import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import CarouselComponent from '../components/PropertyDetails/Carousel';
import RatingBox from '../components/PropertyDetails/RatingBox';
import HostInfo from '../components/PropertyDetails/HostInfo';
import PropertyBottomTab from '../components/PropertyDetails/PropertyBottomTab';

const PropertyDetailsScreen: React.FC = ({route}: any) => {
  console.log(route.params);
  const propertyImages = [
    'https://i.pinimg.com/564x/d6/18/18/d618188c4722ca5cc938ee3dde7b09cc.jpg',
    'https://i.pinimg.com/564x/83/c5/d1/83c5d1d9539c0296a2f7b60789c0a716.jpg',
    'https://i.pinimg.com/550x/2e/07/e4/2e07e483ecd7b8b25ef720de4df5e0c5.jpg',
  ];
  const propertyName = 'Casa en Colima';
  const propertyLocation = 'Colima, Colima, México';
  const guests = 4;
  const bedrooms = 2;
  const beds = 3;
  const bathrooms = 2;
  const averageRating = 4.5;
  const totalReviews = 10;
  const hostName = 'Mar';
  const hostImage = require('../images/avatar-tpdne.jpg');
  const propertyDescription =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
  const pricePerNight = '$1000';

  const handleReservePress = () => {
    console.log('Botón de reservar presionado');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <CarouselComponent images={propertyImages} />
        </View>
        <View style={styles.propertyInfo}>
          <Text style={styles.propertyName}>{propertyName}</Text>
          <Text style={styles.propertyLocation}>{propertyLocation}</Text>
          <Text style={styles.propertyDetails}>
            Huespedes: {guests} · Habitaciones: {bedrooms} · Camas: {beds} ·
            Baños: {bathrooms}
          </Text>
          <RatingBox
            averageRating={averageRating}
            totalReviews={totalReviews}
          />
          <HostInfo hostName={hostName} hostImage={hostImage} />
        </View>
        <View style={styles.propertyDescription}>
          <Text style={styles.descriptionTitle}>Descripción:</Text>
          <Text style={styles.descriptionText}>{propertyDescription}</Text>
        </View>
      </ScrollView>
      <View style={styles.bottomTab}>
        <PropertyBottomTab
          pricePerNight={pricePerNight}
          onReservePress={handleReservePress}
        />
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  propertyLocation: {
    fontSize: 16,
    color: 'gray',
  },
  propertyDetails: {
    fontSize: 14,
    marginTop: 5,
  },
  propertyDescription: {
    margin: 20,
    marginBottom: 100,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  descriptionText: {
    fontSize: 14,
  },
  bottomTab: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default PropertyDetailsScreen;
