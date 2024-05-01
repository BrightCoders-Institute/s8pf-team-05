import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StarRating from 'react-native-star-rating-widget';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import CommentBox from '../ConfirmReservation/CommentBox';

const ReviewForm: React.FC<{ propertyId: string }> = ({ propertyId }) => {
  const navigation = useNavigation();
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');
  const [userReview, setUserReview] = useState<any>(null);

  useEffect(() => {
    const currentUser = auth().currentUser;
    const userId = currentUser ? currentUser.uid : '';

    const unsubscribe = firestore()
      .collection('properties')
      .doc(propertyId)
      .collection('reviews')
      .where('userId', '==', userId)
      .onSnapshot(snapshot => {
        if (!snapshot.empty) {
          snapshot.forEach(doc => {
            setUserReview(doc.data());
          });
        } else {
          setUserReview(null);
        }
      });

    return () => unsubscribe();
  }, [propertyId]);

  const handleSubmit = async () => {
    try {
      if (userReview) {
        Alert.alert('You have already made a review for this property.');
        return;
      }

      const currentUser = auth().currentUser;
      const userId = currentUser ? currentUser.uid : '';

      await firestore()
        .collection('properties')
        .doc(propertyId)
        .collection('reviews')
        .add({
          userId,
          rating,
          review,
        });

      setRating(0);
      setReview('');
      navigation.goBack();
    } catch (error) {
      console.error('Error submitting review: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Rate:</Text>
      <StarRating
        rating={rating}
        onChange={setRating}
        starSize={30}
        starStyle={{ marginRight: 10 }}
        enableHalfStar={false}
        color="#e7b13d"
      />
      <CommentBox
        placeholder="Write your review here..."
        onChangeText={(text: string) => setReview(text)}
        onSend={handleSubmit}
      />
      <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
        <Text style={styles.submitText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    width: 350,
  },
  label: {
    color: '#444444',
    fontSize: 16,
    marginBottom: 5,
  },
  submit: {
    backgroundColor: '#6F2DBD',
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
  },
  submitText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

export default ReviewForm;
