import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import ReviewForm from '../components/Review/ReviewForm'; 
import ReviewItem from '../components/Review/ReviewItem'; 
import { useNavigation, useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import  Icon  from 'react-native-vector-icons/AntDesign'

const ReviewScreen: React.FC = ({ route }: any) => {
  const navigation = useNavigation();
  const { property } = route.params;

  const [reviews, setReviews] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsSnapshot = await firestore()
          .collection('reviews')
          .where('propertyId', '==', property.id)
          .get();
        
        const fetchedReviews = reviewsSnapshot.docs.map(doc => doc.data());
        setReviews(fetchedReviews);
        setLoading(false); // Mark loading as false once reviews are fetched
      } catch (error) {
        console.error('Error fetching reviews: ', error);
        setLoading(false); // Mark loading as false in case of error
      }
    };

    fetchReviews();
  }, [property.id]);

  // Renderizar la imagen y el mensaje si no hay reviews
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <View style={styles.button_container}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon name ='arrowleft' size={27} color={'black'}/>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>Deja tu reseña</Text>
          <View style={styles.formContainer}>
            <ReviewForm propertyId={property.id} />
          </View>
          {reviews.length === 0 ? ( // Verificar si no hay reviews
            <View style={styles.emptyContainer}>
              
              <Image source={require('../images/empty-state-reviews.png')} style={styles.emptyImage} />
              <Text style={styles.emptyText}>Aun no hay ninguna review</Text>
            </View>
          ) : (
            <>
              <Text style={styles.reviewsTitle}>Reseñas de usuarios</Text>
              <View style={styles.reviewsContainer}>
                {reviews.map(review => (
                  <ReviewItem key={review.id} review={review} />
                ))}
              </View>
            </>
          )}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  button_container: {
    width: '100%',
    marginTop: 20,
    marginLeft: 20,
  },
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
  },
});

export default ReviewScreen;
