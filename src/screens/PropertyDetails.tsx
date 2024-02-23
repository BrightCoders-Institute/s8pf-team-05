import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CarouselComponent from '../components/PropertyDetails/Carousel';
import RatingBox from '../components/PropertyDetails/RatingBox';

const PropertyDetailsScreen: React.FC = () => {
    const propertyImages = ['https://i.pinimg.com/564x/d6/18/18/d618188c4722ca5cc938ee3dde7b09cc.jpg',
                            'https://i.pinimg.com/564x/83/c5/d1/83c5d1d9539c0296a2f7b60789c0a716.jpg',
                            'https://i.pinimg.com/550x/2e/07/e4/2e07e483ecd7b8b25ef720de4df5e0c5.jpg']; 
    const propertyName = 'Casa en Colima';
    const propertyLocation = 'Colima, Colima, México';
    const guests = 4;
    const bedrooms = 2; 
    const beds = 3; 
    const bathrooms = 2; 
    const averageRating = 4.5; // Ejemplo de calificación promedio
    const totalReviews = 10; // Ejemplo de cantidad total de reseñas
    return (
    <ScrollView style={styles.container}>
        <View>
            <CarouselComponent images={propertyImages} />
        </View>
        <View style={styles.propertyInfo}>
            <Text style={styles.propertyName}>{propertyName}</Text>
            <Text style={styles.propertyLocation}>{propertyLocation}</Text>
            <Text style={styles.propertyDetails}>
                Huespedes: {guests} · Habitaciones: {bedrooms} · Camas: {beds} · Baños: {bathrooms}
            </Text>
            <RatingBox averageRating={averageRating} totalReviews={totalReviews} />
        </View>
    </ScrollView>
    
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
  });
  
export default PropertyDetailsScreen;
