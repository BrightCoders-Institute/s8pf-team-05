import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import ReviewForm from '../components/Review/ReviewForm';
import ReviewItem from '../components/Review/ReviewItem';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/AntDesign';

const ReviewScreen: React.FC = ({ route }: any) => {
  const navigation = useNavigation();
  const { property } = route.params;

  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsSnapshot = await firestore()
          .collection('properties')
          .doc(property.id)
          .collection('reviews')
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

  const handleGoBack = () => {
    navigation.goBack();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <View style={styles.button_container}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon name="arrowleft" size={27} color={'black'} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>Leave your review</Text>
          <View style={styles.formContainer}>
            <ReviewForm propertyId={property.id} />
          </View>
          {reviews.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Image source={require('../images/empty-state-reviews.png')} style={styles.emptyImage} />
              <Text style={styles.emptyText}>There are no reviews yet</Text>
            </View>
          ) : (
            <>
              <Text style={styles.reviewsTitle}>Users Reviews</Text>
              <View style={styles.reviewsContainer}>
                {reviews.map((review, index) => (
                  <ReviewItem key={index} review={review} />
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
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    color: '#444444',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  reviewsTitle: {
    fontSize: 20,
    color: '#444444',
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
