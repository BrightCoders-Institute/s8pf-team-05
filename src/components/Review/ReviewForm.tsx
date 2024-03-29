import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Alert, TouchableOpacity } from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const ReviewForm: React.FC<{ propertyId: string }> = ({ propertyId }) => {
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');
  const [userReview, setUserReview] = useState<any>(null);

  useEffect(() => {
    const currentUser = auth().currentUser;
    const userId = currentUser ? currentUser.uid : '';

    const unsubscribe = firestore()
      .collection('reviews')
      .where('userId', '==', userId)
      .where('propertyId', '==', propertyId)
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
        Alert.alert('Ya has realizado una reseña para esta propiedad.');
        return;
    }

    const currentUser = auth().currentUser;
    const userId = currentUser ? currentUser.uid : '';

      await firestore().collection('reviews').add({
        propertyId,
        userId,
        rating,
        review,
      });
      
      setRating(0);
      setReview('');
    } catch (error) {
      console.error('Error submitting review: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Calificación:</Text>
      <StarRating
        rating={rating}
        onChange={setRating}
        starSize={30}
        starStyle={{ marginRight: 10 }}
        enableHalfStar={false}
        color="#444444"
      />
      <Text style={styles.label}>Reseña:</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={review}
        onChangeText={text => setReview(text)}
        multiline
      />
        <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
            <Text style={styles.submitText}>Enviar</Text>
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
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
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
        fontWeight: 'bold',
        
    },
});

export default ReviewForm;
