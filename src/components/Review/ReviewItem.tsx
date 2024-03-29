import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import firestore from '@react-native-firebase/firestore';

const ReviewItem: React.FC<{ review: { rating: number; review: string; userId: string } }> = ({ review }) => {
  const [userInfo, setUserInfo] = useState<{ name: string; profileImage: string | null }>({
    name: '',
    profileImage: null,
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userDoc = await firestore().collection('users').doc(review.userId).get();
        const userData = userDoc.data();

        if (userData) {
          const { name, profileImage } = userData;
          setUserInfo({ name, profileImage });
        }
      } catch (error) {
        console.error('Error fetching user info: ', error);
      }
    };

    fetchUserInfo();
  }, [review.userId]);

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        {userInfo.profileImage && <Image source={{ uri: userInfo.profileImage }} style={styles.avatar} />}
        <Text style={styles.userName}>{userInfo.name}</Text>
      </View>
      <StarRatingDisplay 
      rating={review.rating} 
      starSize={20} 
      color="#444444"
      starStyle={{ marginHorizontal: 0 }} />
      <Text>{review.review}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  userName: {
    fontWeight: 'bold',
  },
});

export default ReviewItem;
