import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ReviewForm from '../components/Review/ReviewForm'; // Importa el componente de formulario de reseña
import ReviewItem from '../components/Review/ReviewItem'; // Importa el componente de ítem de reseña
import { useNavigation, useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const ReviewScreen: React.FC = ({ route }: any) => {
  const navigation = useNavigation();
  const { property } = route.params;

  // Fetch reviews for the property from Firestore
  const [reviews, setReviews] = React.useState<any[]>([]);
  React.useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsSnapshot = await firestore()
          .collection('reviews')
          .where('propertyId', '==', property.id)
          .get();
        
        const fetchedReviews = reviewsSnapshot.docs.map(doc => doc.data());
        setReviews(fetchedReviews);
      } catch (error) {
        console.error('Error fetching reviews: ', error);
      }
    };

    fetchReviews();
  }, [property.id]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Deja tu reseña</Text>
        <View style={styles.formContainer}>
          <ReviewForm propertyId={property.id} />
        </View>
        <Text style={styles.reviewsTitle}>Reseñas de usuarios</Text>
        <View style={styles.reviewsContainer}>
          {reviews.map(review => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  reviewsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  formContainer: {
    alignItems: 'center', 
    marginBottom: 20,
  },
  reviewsContainer: {
    marginTop: 1,
    marginHorizontal: 20,
  },
});

export default ReviewScreen;
